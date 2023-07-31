package de.neuefische.koheis.backend.kanacards;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class KanaCardsServiceTest {

    KanaCardsRepository kanaCardsRepository = mock(KanaCardsRepository.class);
    KanaCardsService kanaCardsService = new KanaCardsService(kanaCardsRepository);

    @Test
    void getRandomFourHiraganaCards_thenReturnHashMapOfFourAlphabetHiraganaPairs(){
        //GIVEN
        Map<String, String> expected = new HashMap<>() {{
            put("ka", "か");
            put("mi","み");
            put("na","な");
            put("ri","り");
        }};

        //WHEN
        Mockito.when(kanaCardsRepository.getRandomFourHiraganaCards())
                .thenReturn(expected);
        Map<String, String> actual = kanaCardsService.getRandomFourHiraganaCards();

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void getRandomFourKatakanaCards_thenReturnHashMapOfFourAlphabetKatakanaPairs(){
        Map<String, String> expected = new HashMap<>() {{
            put("ka", "カ");
            put("mi","ミ");
            put("na","ナ");
            put("ri","リ");
        }};

        //WHEN
        Mockito.when(kanaCardsRepository.getRandomFourKatakanaCards())
                .thenReturn(expected);
        Map<String, String> actual = kanaCardsService.getRandomFourKatakanaCards();

        //THEN
        assertEquals(expected, actual);
    }

}
