package de.neuefische.koheis.backend.translation;

import com.deepl.api.Translator;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Component
public class DeepLConfig {

    @Value("${deepl.api.key}")
    private String apiKey;

    public String getKey() {
        return apiKey;
    }

    @Bean
    public Translator getTranslator() {
        String authKey = getKey();
        return new Translator(authKey);
    }
}
