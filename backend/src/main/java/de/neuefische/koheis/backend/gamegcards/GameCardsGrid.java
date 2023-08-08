package de.neuefische.koheis.backend.gamegcards;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameCardsGrid {

    @Id
    private String boardId;
    private GameCard[][] cardsGrid;
    private boolean[][] isMatched;
}
