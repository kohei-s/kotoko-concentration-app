package de.neuefische.koheis.backend.converter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GooConfig {

    @Value("${goo.api.id}")
    private String apiId;

    public String getId() {
        return apiId;
    }

}
