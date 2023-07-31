package de.neuefische.koheis.backend.idservice;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class IdService {
    public String createRandomId(){
        return UUID.randomUUID().toString();
    }
}
