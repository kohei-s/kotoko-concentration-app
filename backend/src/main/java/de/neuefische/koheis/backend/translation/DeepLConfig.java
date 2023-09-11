package de.neuefische.koheis.backend.translation;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Component
public class DeepLConfig {

    @Value("${deepl.api.key}")
    private String apiKey;

    public String getKey() {
        return apiKey;
    }
}
