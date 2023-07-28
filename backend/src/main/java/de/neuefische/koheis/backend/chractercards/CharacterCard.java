package de.neuefische.koheis.backend.chractercards;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("cards")
public record CharacterCard (
    @Id
    String id,
    String character
){}
