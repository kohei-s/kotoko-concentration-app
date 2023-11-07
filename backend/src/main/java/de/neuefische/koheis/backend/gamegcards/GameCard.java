package de.neuefische.koheis.backend.gamegcards;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("cards")
public class GameCard {
    @Id
    private String id;

    @NotBlank
    private String title;
    private String reading;

    @NotBlank
    private String cardSetName;

    private String authorId;
}
