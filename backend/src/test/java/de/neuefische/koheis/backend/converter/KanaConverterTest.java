package de.neuefische.koheis.backend.converter;

import com.ibm.icu.text.Transliterator;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class KanaConverterTest {
    private KanaConverter kanaConverter;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        kanaConverter = new KanaConverter();
    }

    @Test
    public void testConvertHiraganaToAlphabet() {
        String hiragana = "ひらがな";
        Transliterator trans = Transliterator.getInstance("Hiragana-Latin");
        String expected = trans.transliterate(hiragana);
        String result = kanaConverter.convertHiraganaToAlphabet(hiragana);
        assertEquals(expected, result);
    }

    @Test
    public void testConvertKatakanaToAlphabet() {
        String katakana = "カタカナ";
        Transliterator trans = Transliterator.getInstance("Katakana-Latin");
        String expected = trans.transliterate(katakana);
        String result = kanaConverter.convertKatakanaToAlphabet(katakana);
        assertEquals(expected, result);
    }
}
