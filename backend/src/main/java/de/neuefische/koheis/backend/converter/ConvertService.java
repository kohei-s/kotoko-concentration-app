package de.neuefische.koheis.backend.converter;

import de.neuefische.koheis.backend.translation.Translation;
import io.netty.resolver.DefaultAddressResolverGroup;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.util.Objects;

@Service
public class ConvertService {

    private final GooConfig gooConfig;
    private final WebClient webClient;
    private final KanaConverter kanaConverter;

    public ConvertService(GooConfig gooConfig, @Value("${goo.api.url}") String url, KanaConverter kanaConverter) {
        this.gooConfig = gooConfig;
        this.kanaConverter = kanaConverter;
        this.webClient = WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(
                        HttpClient.create()
                                .resolver(DefaultAddressResolverGroup.INSTANCE)
                ))
                .baseUrl(url)
                .build();
    }

    public GooRequest getGooRequest(String original, String kanaType) {
        String appId = gooConfig.getId();
        return new GooRequest(appId, original, kanaType);
    }

    public String convertKanjiToKana(GooRequest gooRequest) {
        ResponseEntity<GooResponse> responseEntity = webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(gooRequest)
                .retrieve()
                .toEntity(GooResponse.class)
                .retry(3)
                .block();

        assert responseEntity != null;

        return Objects.requireNonNull(responseEntity.getBody()).converted();
    }

    public String convertKanaToAlphabet(String kana) {
        if (kana.matches("^[\\u3040-\\u309F]+$")) {
            return kanaConverter.convertHiraganaToAlphabet(kana);
        } else if (kana.matches("^[\\u30A0-\\u30FF]+$")) {
            return kanaConverter.convertKatakanaToAlphabet(kana);
        } else {
            return "Invalid input. Input must be hiragana or katakana!";
        }
    }

    public Conversion convertTranslationToConversion(Translation translation) {
        String translated = translation.getJapanese();
        if (translated != null) {
            if (translated.matches("^[\\u4E00-\\u9FFF]+$")) {
                String kana = convertKanjiToKana(getGooRequest(translated, "hiragana"));
                String alphabet = convertKanaToAlphabet(kana);
                return new Conversion(translated, kana, alphabet);
            } else if ((translated.matches("^[\\u3040-\\u309F]+$")) || (translation.getJapanese().matches("^[\\u30A0-\\u30FF]+$"))) {
                String alphabet = convertKanaToAlphabet(translated);
                return new Conversion("", translated, alphabet);
            } else {
                return new Conversion("", "", "");
            }
        } else {
            return new Conversion("could not be translated", "", "");
        }
    }

}
