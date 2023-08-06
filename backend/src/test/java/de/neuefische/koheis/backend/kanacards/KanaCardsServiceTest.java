package de.neuefische.koheis.backend.kanacards;

import de.neuefische.koheis.backend.idservice.IdService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class KanaCardsServiceTest {

    KanaCardsRepository kanaCardsRepository = mock(KanaCardsRepository.class);
    IdService idService = mock(IdService.class);
    KanaCardsService kanaCardsService = new KanaCardsService(kanaCardsRepository, idService);

    @Test
    void getThreeByThreeHiraganaCardGrid_thenReturnTwoDimensionalArrayOfNineHiraganaCards() {
        //GIVEN
        String id = "012";
        boolean[][] isMatched = {
                {false, false, false},
                {false, false, false},
                {false, false, false}
        };
        KanaCard kanaCard1 = new KanaCard("あ", "a");
        KanaCard kanaCard2 = new KanaCard("い", "i");
        KanaCard kanaCard3 = new KanaCard("う", "u");
        KanaCard kanaCard4 = new KanaCard("え", "e");
        KanaCard kanaCard5 = new KanaCard("あ", "a");
        KanaCard kanaCard6 = new KanaCard("い", "i");
        KanaCard kanaCard7 = new KanaCard("う", "u");
        KanaCard kanaCard8 = new KanaCard("え", "e");
        KanaCard kanaCard9 = new KanaCard("empty", "empty");
        KanaCard[][] kanaCards = new KanaCard[][]{
                {kanaCard1, kanaCard2, kanaCard3},
                {kanaCard4, kanaCard5, kanaCard6},
                {kanaCard7, kanaCard8, kanaCard9}};

        //WHEN
        Mockito.when(kanaCardsRepository.getNineByNineKanaCardsGrid("hiragana"))
                .thenReturn(kanaCards);
        Mockito.when(idService.createRandomId())
                .thenReturn(id);
        KanaCardsGrid expected = new KanaCardsGrid(id, kanaCards, isMatched);
        KanaCardsGrid actual = kanaCardsService.getNineByNineKanaCardsGrid("hiragana");

        //THEN
        assertEquals(expected, actual);
    }
    @Test
    void getThreeByThreeKatakanaCardGrid_thenReturnTwoDimensionalArrayOfNineKatakanaCards() {
        //GIVEN
        String id = "012";
        boolean[][] isMatched = {
                {false, false, false},
                {false, false, false},
                {false, false, false}
        };
        KanaCard kanaCard1 = new KanaCard("ア", "a");
        KanaCard kanaCard2 = new KanaCard("イ", "i");
        KanaCard kanaCard3 = new KanaCard("ウ", "u");
        KanaCard kanaCard4 = new KanaCard("エ", "e");
        KanaCard kanaCard5 = new KanaCard("ア", "a");
        KanaCard kanaCard6 = new KanaCard("イ", "i");
        KanaCard kanaCard7 = new KanaCard("ウ", "u");
        KanaCard kanaCard8 = new KanaCard("エ", "e");
        KanaCard kanaCard9 = new KanaCard("empty", "empty");
        KanaCard[][] kanaCards = new KanaCard[][]{
                {kanaCard1, kanaCard2, kanaCard3},
                {kanaCard4, kanaCard5, kanaCard6},
                {kanaCard7, kanaCard8, kanaCard9}};

        //WHEN
        Mockito.when(kanaCardsRepository.getNineByNineKanaCardsGrid("katakana"))
                .thenReturn(kanaCards);
        Mockito.when(idService.createRandomId())
                .thenReturn(id);
        KanaCardsGrid expected = new KanaCardsGrid(id, kanaCards, isMatched);
        KanaCardsGrid actual = kanaCardsService.getNineByNineKanaCardsGrid("katakana");

        //THEN
        assertEquals(expected, actual);
    }
}
