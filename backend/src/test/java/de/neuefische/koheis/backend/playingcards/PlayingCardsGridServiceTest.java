package de.neuefische.koheis.backend.playingcards;

import de.neuefische.koheis.backend.idservice.IdService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class PlayingCardsGridServiceTest {

    PlayingCardsRepository playingCardsRepository = mock(PlayingCardsRepository.class);
    IdService idService = mock(IdService.class);
    PlayingCardsService playingCardsService = new PlayingCardsService(playingCardsRepository, idService);

    @Test
    void getPlayingCardsWithMediumParameter_thenReturnTwoDimensionalArrayOfTwentyEightCards() {
        //GIVEN
        String id = "012";
        boolean [][] isMatched = new boolean[4][7];
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 7; j++) {
                isMatched[i][j] = false;
            }
        }
        PlayingCard playingCard1 = new PlayingCard("♥", "1");
        PlayingCard playingCard2 = new PlayingCard("♥", "2");
        PlayingCard playingCard3 = new PlayingCard("♥", "3");
        PlayingCard playingCard4 = new PlayingCard("♥", "4");
        PlayingCard playingCard5 = new PlayingCard("♥", "5");
        PlayingCard playingCard6 = new PlayingCard("♥", "6");
        PlayingCard playingCard7 = new PlayingCard("♥", "7");
        PlayingCard playingCard8 = new PlayingCard("♥", "8");
        PlayingCard playingCard9 = new PlayingCard("♥", "9");
        PlayingCard playingCard10 = new PlayingCard("♥", "10");
        PlayingCard playingCard11 = new PlayingCard("♥", "11");
        PlayingCard playingCard12 = new PlayingCard("♥", "12");
        PlayingCard playingCard13 = new PlayingCard("♥", "13");
        PlayingCard playingCard14 = new PlayingCard("♠", "1");
        PlayingCard playingCard15 = new PlayingCard("♠", "2");
        PlayingCard playingCard16 = new PlayingCard("♠", "3");
        PlayingCard playingCard17 = new PlayingCard("♠", "4");
        PlayingCard playingCard18 = new PlayingCard("♠", "5");
        PlayingCard playingCard19 = new PlayingCard("♠", "6");
        PlayingCard playingCard20 = new PlayingCard("♠", "7");
        PlayingCard playingCard21 = new PlayingCard("♠", "8");
        PlayingCard playingCard22 = new PlayingCard("♠", "9");
        PlayingCard playingCard23 = new PlayingCard("♠", "10");
        PlayingCard playingCard24 = new PlayingCard("♠", "11");
        PlayingCard playingCard25 = new PlayingCard("♠", "12");
        PlayingCard playingCard26 = new PlayingCard("♠", "13");
        PlayingCard playingCard27 = new PlayingCard("empty", "empty");
        PlayingCard playingCard28 = new PlayingCard("empty", "empty");
        PlayingCard[][] playingCards = new PlayingCard[][]{
                {playingCard1, playingCard2, playingCard3, playingCard4},
                {playingCard5, playingCard6, playingCard7, playingCard8},
                {playingCard9, playingCard10, playingCard11, playingCard12},
                {playingCard13, playingCard14, playingCard15, playingCard16},
                {playingCard17, playingCard18, playingCard19, playingCard20},
                {playingCard21, playingCard22, playingCard23, playingCard24},
                {playingCard25, playingCard26, playingCard27, playingCard28}
        };

        //WHEN
        Mockito.when(playingCardsRepository.getPlayingCardsGrid("medium"))
                .thenReturn(playingCards);
        Mockito.when(idService.createRandomId())
                .thenReturn(id);
        PlayingCardsGrid expected = new PlayingCardsGrid(id, playingCards, isMatched);
        PlayingCardsGrid actual = playingCardsService.getPlayingCardsGrid("medium");

        //THEN
        assertEquals(expected, actual);
    }

}
