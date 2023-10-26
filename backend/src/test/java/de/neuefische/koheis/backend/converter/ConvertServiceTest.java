package de.neuefische.koheis.backend.converter;

import de.neuefische.koheis.backend.translation.Translation;
import okhttp3.mockwebserver.MockWebServer;
import okhttp3.mockwebserver.MockResponse;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import java.io.IOException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ConvertServiceTest {

    static GooConfig gooConfig = mock(GooConfig.class);
    static KanaConverter kanaConverter = mock(KanaConverter.class);
    static ConvertService convertService;
    private static MockWebServer mockWebServer;

    @BeforeAll
    static void beforeAll() throws Exception {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
        convertService = new ConvertService(gooConfig, mockWebServer.url("/").toString(), kanaConverter);
    }

    @Test
    void expectGooRequest_whenGetGooRequestCalled() {
        //GIVEN
        String original = "動物";
        String kanaType = "hiragana";
        String appId = "test";
        GooRequest expected = new GooRequest(appId, original, kanaType);

        //WHEN
        when(gooConfig.getId()).thenReturn(appId);
        GooRequest actual = convertService.getGooRequest(original, kanaType);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void expectString_whenConvertKanjiToKanaCalled() {
        //GIVEN
        String original = "動物";
        String kanaType = "hiragana";
        String appId = "test";
        GooRequest gooRequest = new GooRequest(appId, original, kanaType);
        String expected = "どうぶつ";

        //WHEN
        mockWebServer.enqueue(new MockResponse()
                .setHeader("Content-Type", "application/json")
                .setBody("""
                        {"converted": "どうぶつ"}
                        """));
        when(gooConfig.getId()).thenReturn(appId);
        String actual = convertService.convertKanjiToKana(gooRequest);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void expectAlphabet_whenConvertKanaToAlphabetWithHiraganaCalled() {
        //GIVEN
        String kana = "どうぶつ";
        String expected = "doubutsu";

        //WHEN
        when(kanaConverter.convertHiraganaToAlphabet(kana)).thenReturn("doubutsu");
        String actual = convertService.convertKanaToAlphabet(kana);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void expectAlphabet_whenConvertKanaToAlphabetWithKatakanaCalled() {
        //GIVEN
        String kana = "ドウブツ";
        String expected = "doubutsu";

        //WHEN
        when(kanaConverter.convertKatakanaToAlphabet(kana)).thenReturn("doubutsu");
        String actual = convertService.convertKanaToAlphabet(kana);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void expectErrorMessage_whenConvertKanaToAlphabetWithKanjiCalled() {
        //GIVEN
        String kana = "動物";
        String expected = "Invalid input. Input must be hiragana or katakana!";

        //WHEN
        String actual = convertService.convertKanaToAlphabet(kana);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void expectConversion_whenConvertTranslationToConversionCalled() {
        //GIVEN
        String kana = "どうぶつ";
        String appId = "test";
        Translation translation = new Translation("animal", "動物");
        Conversion expected = new Conversion("動物", "どうぶつ", "doubutsu");

        //WHEN
        mockWebServer.enqueue(new MockResponse()
                .setHeader("Content-Type", "application/json")
                .setBody("""
                        {"converted": "どうぶつ"}
                        """));
        when(gooConfig.getId()).thenReturn(appId);
        when(kanaConverter.convertHiraganaToAlphabet(kana)).thenReturn("doubutsu");
        Conversion actual = convertService.convertTranslationToConversion(translation);

        //THEN
        assertEquals(expected, actual);
    }

    @AfterAll
    static void afterAll() throws IOException {
        mockWebServer.shutdown();
    }

}
