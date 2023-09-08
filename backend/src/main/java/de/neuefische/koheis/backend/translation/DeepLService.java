package de.neuefische.koheis.backend.translation;

import com.deepl.api.DeepLException;
import com.deepl.api.DocumentTranslationException;
import com.deepl.api.TextResult;
import com.deepl.api.Translator;
import org.springframework.stereotype.Service;

@Service
public class DeepLService {
    Translator translator;
    private final DeepLConfig deepLConfig;

    public DeepLService(DeepLConfig deepLConfig) {
        this.deepLConfig = deepLConfig;
    }

    public Translation getJapaneseTranslation(String text, String language) throws Exception {
        String authKey = deepLConfig.getKey();
        translator = new Translator(authKey);
        TextResult result = translator.translateText(text, language, "jp");

        if (result != null) {
            return new Translation(text, result.toString());
        } else {
            throw new DeepLException("An error occurs during translation!");
        }
    }

}
