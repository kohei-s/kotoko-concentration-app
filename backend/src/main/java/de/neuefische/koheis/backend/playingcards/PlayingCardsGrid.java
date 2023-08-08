package de.neuefische.koheis.backend.playingcards;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("playingCardGrid")
public class PlayingCardsGrid {

    @Id
    private String id;
    private PlayingCard[][] cardsGrid;
    private boolean[][] isMatched;
}
