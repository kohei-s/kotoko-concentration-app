package de.neuefische.koheis.backend.gamegcards;

import de.neuefische.koheis.backend.idservice.IdService;
import de.neuefische.koheis.backend.security.MongoUserService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class GameCardsGridServiceTest {

    GameCardsRepository gameCardsRepository = mock(GameCardsRepository.class);
    IdService idService = mock(IdService.class);
    MongoUserService mongoUserService =  mock(MongoUserService.class);
    SecurityContext securityContext = mock(SecurityContext.class);
    Authentication authentication = mock(Authentication.class);
    GameCardsService gameCardsService = new GameCardsService(gameCardsRepository, idService, mongoUserService);

    GameCard gameCard1 = new GameCard("01", "♥1", "playing-cards", "testId");
    GameCard gameCard2 = new GameCard("02", "♥2", "playing-cards", "testId");
    GameCard gameCard3 = new GameCard("03", "♥3", "playing-cards", "testId");
    GameCard gameCard4 = new GameCard("04", "♥4", "playing-cards", "testId");
    GameCard gameCard5 = new GameCard("05", "♥5", "playing-cards", "testId");
    GameCard gameCard6 = new GameCard("06", "♥6", "playing-cards", "testId");
    GameCard gameCard7 = new GameCard("07", "♥7", "playing-cards", "testId");
    GameCard gameCard8 = new GameCard("08", "♥8", "playing-cards", "testId");
    GameCard gameCard9 = new GameCard("09", "♥9", "playing-cards", "testId");
    GameCard gameCard10 = new GameCard("10", "♥10", "1playing-cards", "testId");
    GameCard gameCard11 = new GameCard("11", "♥11", "1playing-cards", "testId");
    GameCard gameCard12 = new GameCard("12", "♥12", "playing-cards", "testId");

    @Test
    void getAllMyGameCards_thenReturnListOfAllGameCards() {
        //Given
        List<GameCard> allMyGameCards = List.of(
                gameCard1, gameCard2, gameCard3,
                gameCard4, gameCard5, gameCard6,
                gameCard7, gameCard8, gameCard9,
                gameCard10, gameCard11, gameCard12);

        //WHEN
        Mockito.when(idService.createRandomId())
                .thenReturn("012");
        Mockito.when(authentication.getName())
                .thenReturn("testName");
        Mockito.when(securityContext.getAuthentication())
                .thenReturn(authentication);
        Mockito.when(mongoUserService.findUserIdByUsername("testName"))
                .thenReturn("testId");
        SecurityContextHolder.setContext(securityContext);
        Mockito.when(gameCardsRepository.findAllByAuthorId("testId"))
                .thenReturn(allMyGameCards);
        List<GameCard> expected = List.of(
                gameCard1, gameCard2, gameCard3,
                gameCard4, gameCard5, gameCard6,
                gameCard7, gameCard8, gameCard9,
                gameCard10, gameCard11, gameCard12);
        List<GameCard> actual = gameCardsService.getAllMyGameCards();

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void getExistingGameCardWithId_thenReturnGameCardWithId() {
        //GIVEN
        GameCard expected = new GameCard("012", "test", "testSet", "testId");
        Mockito.when(gameCardsRepository.findById("012"))
                .thenReturn(Optional.of(expected));

        //WHEN
        GameCard actual = gameCardsService.getGameCardById("012");

        //THEN
        verify(gameCardsRepository).findById("012");
        Assertions.assertThat(actual)
                .isEqualTo(expected);
    }

    @Test
    void getNotExistingGameCardWithId_thenThrowException() {
        //GIVEN
        String id = "012";

        //WHEN
        Mockito.when(gameCardsRepository.existsById(id))
                .thenReturn(false);

        //THEN
        assertThrows(NoSuchElementException.class, () -> gameCardsService.getGameCardById(id));
    }


    @Test
    void generateGameBoardSmallSize_thenReturnTwoDimensionalArrayOfTwelveGameCards() {
        //Given
        String id = "012";
        List<GameCard> allMyGameCards = List.of(
                gameCard1, gameCard2, gameCard3,
                gameCard4, gameCard5, gameCard6,
                gameCard7, gameCard8, gameCard9,
                gameCard10, gameCard11, gameCard12);

        //WHEN
        Mockito.when(idService.createRandomId())
                .thenReturn(id);
        Mockito.when(authentication.getName())
                .thenReturn("testName");
        Mockito.when(securityContext.getAuthentication())
                .thenReturn(authentication);
        Mockito.when(mongoUserService.findUserIdByUsername("testName"))
                .thenReturn("testId");
        SecurityContextHolder.setContext(securityContext);
        Mockito.when(gameCardsRepository.findAllByAuthorId("testId"))
                .thenReturn(allMyGameCards);
        int expectedRow = 3;
        int expectedColumn = 3;
        GameCard[][] actual = gameCardsService.generateGameBoard("small", allMyGameCards);

        //THEN
        assertEquals(expectedRow, actual.length);
        assertEquals(expectedColumn, actual[0].length);
    }

   @Test
    void whenGameCardAdded_thenReturnGameCard() {
        //GIVEN
        GameCardWithoutAuthorId gameCard = new GameCardWithoutAuthorId("testTitle", "testSet3");
        GameCard gameCardAdded = new GameCard("012", "testTitle", "testSet3", "testId");
        GameCard expected = new GameCard("012", "testTitle", "testSet3", "testId");

        //WHEN
        Mockito.when(gameCardsRepository.insert(gameCardAdded))
                .thenReturn(gameCardAdded);
        Mockito.when(idService.createRandomId())
                .thenReturn("012");
        Mockito.when(authentication.getName())
                .thenReturn("testName");
        Mockito.when(securityContext.getAuthentication())
                .thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        Mockito.when(mongoUserService.findUserIdByUsername("testName"))
                .thenReturn("testId");
        GameCard actual = gameCardsService.addGameCard(gameCard);

        //THEN
        verify(gameCardsRepository).insert(gameCardAdded);
        verify(idService).createRandomId();
        Assertions.assertThat(actual)
                .isEqualTo(expected);
    }

    @Test
    void whenUpdateExistingGameCard_thenReturnGameCard() {
        //GIVEN
        GameCardWithoutId gameCardWithoutId = new GameCardWithoutId("test", "testSet", "testId");
        String id = "012";

        //WHEN
        when(gameCardsRepository.save(new GameCard(id, gameCardWithoutId.getTitle(), gameCardWithoutId.getCardSetName(), gameCardWithoutId.getAuthorId())))
                .thenReturn(new GameCard("012", "test", "testSet", "testId"));
        when(gameCardsRepository.existsById(id))
                .thenReturn(true);
        GameCard actual = gameCardsService.updateGameCard(gameCardWithoutId, "012");

        //THEN
        GameCard expected = new GameCard("012", "test", "testSet", "testId");
        verify(gameCardsRepository).save(expected);
        Assertions.assertThat(actual)
                .isEqualTo(expected);
    }

    @Test
    void whenUpdateWithNotExistingId_thenThrowException() {
        //GIVEN
        String notExistingId = "012";
        GameCardWithoutId gameCardWithoutId = new GameCardWithoutId("test", "testSet", "testId");

        //WHEN
        Mockito.when(gameCardsRepository.existsById("012"))
                .thenReturn(false);

        //THEN
        assertThrows(NoSuchElementException.class, () -> gameCardsService.updateGameCard(gameCardWithoutId, "012"));
        verify(gameCardsRepository).existsById(notExistingId);
        verify(gameCardsRepository, never()).save(any());
    }

    @Test
    void whenDeleteExistingGameCard_thenDeleteGameCard() {
        //GIVEN
        String id = "012";

        //WHEN
        Mockito.when(gameCardsRepository.existsById(id))
                .thenReturn(true);
        doNothing().when(gameCardsRepository).deleteById(id);
        gameCardsService.deleteGameCard(id);

        //THEN
        verify(gameCardsRepository).existsById(id);
        verify(gameCardsRepository).deleteById(id);
    }

    @Test
    void whenDeleteNotExistingGameCard_thenThrowException() {
        //GIVEN
        String id = "012";

        //WHEN
        when(gameCardsRepository.existsById(id))
                .thenReturn(false);

        //THEN
        assertThrows(NoSuchElementException.class, () -> gameCardsService.deleteGameCard(id));
        verify(gameCardsRepository).existsById(id);
        verify(gameCardsRepository, never()).deleteById(id);
    }

    @Test
    void whenLargeGamSize_thenReturnIntegerArrayWithFourAndFour() {
        //WHEN
        int[] expected = {4, 4};
        int[] actual = gameCardsService.setIndexOfRowAndColumn("large");

        //THEN
        Assertions.assertThat(actual)
                .isEqualTo(expected);
    }

    @Test
    void whenGenerateGameBoardWithMediumGameSize_thenReturnPairValueOfSix() {
        //WHEN
        int expected = 6 * 2;
        List<GameCard> cards = List.of(
                gameCard1, gameCard2, gameCard3,
                gameCard4, gameCard5, gameCard6,
                gameCard7, gameCard8, gameCard9,
                gameCard10, gameCard11, gameCard12);
        GameCard[][] gameGrid = gameCardsService.generateGameBoard("medium", cards);
        int actual = (gameGrid[0].length) * (gameGrid.length);

        //THEN
        Assertions.assertThat(actual)
                .isEqualTo(expected);
    }

}
