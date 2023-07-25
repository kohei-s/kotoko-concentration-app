package de.neuefische.koheis.backend.playingcards;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class PlayingCardsServiceTest {

    PlayingCards playingCards = mock(PlayingCards.class);
    PlayingCardsService playingCardsService = new PlayingCardsService();

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
        Mockito.when(playingCards.getPlayingCards("large"))
                .thenReturn(expected);
        List<String> actual = playingCardsService.getPlayingCards("large");

        //THEN
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void checkMatchOfSelectedPlayingCardsWithTwoCardsWithSameNumber_thenTrue() {
        //GIVEN
        String card1 = "heart12";
        String card2 = "spade12";

        //WHEN
        Boolean expected = true;
        Mockito.when(playingCards.checkMatchOfSelectedPlayingCards(card1, card2))
                .thenReturn(expected);
        Boolean actual = playingCardsService.checkMatchOfSelectedPlayingCards(card1, card2);

        //THEN
        assertEquals(expected, actual);
    }

}
