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
                        "heart13", "heart7", "club6", "club10", "heart2", "diamond3", "heart6", "diamond10",
                        "club13", "club5", "spade3", "heart11", "spade13", "spade9", "heart12", "spade12", "spade10",
                        "club11", "diamond4", "diamond2", "club1", "spade4", "spade5", "spade8", "heart3", "heart9",
                        "spade7", "spade2", "spade1", "diamond13", "diamond11", "heart10", "spade6", "diamond9", "diamond5",
                        "club2", "club4", "club3", "diamond8", "spade11", "club9", "heart5", "diamond1", "diamond7",
                        "diamond6", "club12", "heart8", "diamond12", "heart4", "club8", "club7", "heart1"
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
                        "heart13", "heart7", "heart2",  "heart6", "spade12",
                        "spade3", "heart11", "spade13", "spade9", "heart12", "spade10",
                        "spade4", "spade5", "spade8", "heart3", "heart9", "spade7",
                        "spade2", "spade1", "heart10", "spade6",  "spade11", "heart5",
                        "heart8", "heart4", "heart1"
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
                        "heart1", "heart2", "heart3", "heart4", "heart5", "heart6",
                        "spade1", "spade2", "spade3", "spade4", "spade5", "spade6"
                )
        );

        //WHEN
        Mockito.when(playingCardsRepository.getPlayingCards("small"))
                .thenReturn(expected);
        List<String> actual = playingCardsService.getPlayingCards("small");

        //THEN
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void checkMatchOfSelectedPlayingCardsWithTwoCardsWithSameNumber_thenTrue() {
        //GIVEN
        List<String> twoCards = new ArrayList<>(List.of("heart12", "spade12"));

        //WHEN
        Boolean expected = true;
        Mockito.when(playingCardsRepository.checkMatchOfSelectedPlayingCards(twoCards))
                .thenReturn(expected);
        Boolean actual = playingCardsService.checkMatchOfSelectedPlayingCards(twoCards);

        //THEN
        assertEquals(expected, actual);
    }

}
