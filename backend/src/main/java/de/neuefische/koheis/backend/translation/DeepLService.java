package de.neuefische.koheis.backend.translation;

import com.deepl.api.DeepLException;
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

    public String getKey() {
        return deepLConfig.getKey();
    }

    public Translation getJapaneseTranslation(String text, String language) throws DeepLException, InterruptedException {
        String authKey = deepLConfig.getKey();
        translator = new Translator(authKey);
        TextResult result = translator.translateText(text, language, "JA");

        if (result != null) {
            return new Translation(text, result.getText());
        } else {
            throw new DeepLException("An error occurs during translation!");
        }
    }

}
