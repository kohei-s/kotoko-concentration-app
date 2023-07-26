package de.neuefische.koheis.backend.chractercards;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("cards")
public class CharacterCard {
    @Id
    private String id;
    private String character;
}
