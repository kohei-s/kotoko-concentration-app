package de.neuefische.koheis.backend.chractercards;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document("cards")
public class CharacterCard {
    @Id
    private String id;
    private String character;
}
