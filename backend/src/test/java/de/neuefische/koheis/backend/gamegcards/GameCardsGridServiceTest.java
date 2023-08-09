package de.neuefische.koheis.backend.gamegcards;

import de.neuefische.koheis.backend.idservice.IdService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class GameCardsGridServiceTest {

    GameCardsRepository gameCardsRepository = mock(GameCardsRepository.class);
    IdService idService = mock(IdService.class);
    GameCardsService gameCardsService = new GameCardsService(gameCardsRepository, idService);

    @Test
    void generateGameBoardSmallSize_thenReturnTwoDimensionalArrayOfTwelveGameCards() {
        //Given
        String id = "012";

        GameCard gameCard1 = new GameCard("♥1", "playing-cards");
        GameCard gameCard2 = new GameCard("♥2", "playing-cards");
        GameCard gameCard3 = new GameCard("♥3", "playing-cards");
        GameCard gameCard4 = new GameCard("♥4", "playing-cards");
        GameCard gameCard5 = new GameCard("♥5", "playing-cards");
        GameCard gameCard6 = new GameCard("♥6", "playing-cards");
        GameCard gameCard7 = new GameCard("♥7", "playing-cards");
        GameCard gameCard8 = new GameCard("♥8", "playing-cards");
        GameCard gameCard9 = new GameCard("♥9", "playing-cards");
        GameCard gameCard10 = new GameCard("♥10", "1playing-cards");
        GameCard gameCard11 = new GameCard("♥11", "1playing-cards");
        GameCard gameCard12 = new GameCard("♥12", "playing-cards");
        List<GameCard> allGameCards = List.of(
                gameCard1, gameCard2, gameCard3,
                gameCard4, gameCard5, gameCard6,
                gameCard7, gameCard8, gameCard9,
                gameCard10, gameCard11, gameCard12);

        //WHEN
        Mockito.when(gameCardsRepository.findAll())
                .thenReturn(allGameCards);
        Mockito.when(idService.createRandomId())
                .thenReturn(id);
        int expectedRow = 3;
        int expectedColumn = 4;
        GameCard[][] actual = gameCardsService.generateGameBoard("small", allGameCards);

        //THEN
        assertEquals(expectedRow, actual.length);
        assertEquals(expectedColumn, actual[0].length);
    }

}
