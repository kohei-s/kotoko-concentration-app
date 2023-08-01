package de.neuefische.koheis.backend.kanacards;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class KanaCardsServiceTest {

    KanaCardsRepository kanaCardsRepository = mock(KanaCardsRepository.class);
    KanaCardsService kanaCardsService = new KanaCardsService(kanaCardsRepository);

    @Test
    void getThreeByThreeKanaCardGrid_thenReturnTwoDimensionalArrayOfNineKanaCards() {
        //GIVEN
        KanaCard kanaCard1 = new KanaCard("あ", "a");
        KanaCard kanaCard2 = new KanaCard("い", "i");
        KanaCard kanaCard3 = new KanaCard("う", "u");
        KanaCard kanaCard4 = new KanaCard("え", "e");
        KanaCard kanaCard5 = new KanaCard("あ", "a");
        KanaCard kanaCard6 = new KanaCard("い", "i");
        KanaCard kanaCard7 = new KanaCard("う", "u");
        KanaCard kanaCard8 = new KanaCard("え", "e");
        KanaCard kanaCard9 = new KanaCard("empty", "empty");
        KanaCardsGrid expected = new KanaCardsGrid(new KanaCard[][]{
                {kanaCard1, kanaCard2, kanaCard3},
                {kanaCard4, kanaCard5, kanaCard6},
                {kanaCard7, kanaCard8, kanaCard9}});

        //WHEN
        Mockito.when(kanaCardsRepository.getNineByNineKanaCardsGrid())
                .thenReturn(expected);
        KanaCardsGrid actual = kanaCardsService.getNineByNineKanaCardsGrid();

        //THEN
        assertEquals(expected, actual);
    }

}
