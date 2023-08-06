package de.neuefische.koheis.backend.playingcards;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class PlayingCardsServiceTest {

    PlayingCardsRepository playingCardsRepository = mock(PlayingCardsRepository.class);
    PlayingCardsService playingCardsService = new PlayingCardsService(playingCardsRepository);

    @Test
    void getPlayingCardsWithLargeParameter_thenReturnListOfFiftyTwoCards() {
        //GIVEN
        List<String> expected = new ArrayList<>(
                List.of(
                        "♥13", "♥7", "♣6", "♣10", "♥2", "♦3", "♥6", "♦10",
                        "♣13", "♣5", "♠3", "♥11", "♠13", "♠9", "♥12", "♠12", "♠10",
                        "♣11", "♦4", "♦2", "♣1", "♠4", "♠5", "♠8", "♥3", "♥9",
                        "♠7", "♠2", "♠1", "♦13", "♦11", "♥10", "♠6", "♦9", "♦5",
                        "♣2", "♣4", "♣3", "♦8", "♠11", "♣9", "♥5", "♦1", "♦7",
                        "♦6", "♣12", "♥8", "♦12", "♥4", "♣8", "♣7", "♥1"
                )
        );

        //WHEN
        Mockito.when(playingCardsRepository.getPlayingCards("large"))
                .thenReturn(expected);
        List<String> actual = playingCardsService.getPlayingCards("large");

        //THEN
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void getPlayingCardsWithMediumParameter_thenReturnListOfTwentySixCards() {
        //GIVEN
        List<String> expected = new ArrayList<>(
                List.of(
                        "♥13", "♥7", "♥2",  "♥6", "♠12",
                        "♠3", "♥11", "♠13", "♠9", "♥12", "♠10",
                        "♠4", "♠5", "♠8", "♥3", "♥9", "♠7",
                        "♠2", "♠1", "♥10", "♠6",  "♠11", "♥5",
                        "♥8", "♥4", "♥1"
                )
        );

        //WHEN
        Mockito.when(playingCardsRepository.getPlayingCards("medium"))
                .thenReturn(expected);
        List<String> actual = playingCardsService.getPlayingCards("medium");

        //THEN
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void getPlayingCardsWithSmallParameter_thenReturnListOfTwelveCards() {
        //GIVEN
        List<String> expected = new ArrayList<>(
                List.of(
                        "♥1", "♥2", "♥3", "♥4", "♥5", "♥6",
                        "♠1", "♠2", "♠3", "♠4", "♠5", "♠6"
                )
        );

        //WHEN
        Mockito.when(playingCardsRepository.getPlayingCards("small"))
                .thenReturn(expected);
        List<String> actual = playingCardsService.getPlayingCards("small");

        //THEN
        assertEquals(expected.size(), actual.size());
    }

}
