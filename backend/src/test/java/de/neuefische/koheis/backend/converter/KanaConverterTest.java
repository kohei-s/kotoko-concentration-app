package de.neuefische.koheis.backend.converter;
import com.ibm.icu.text.Transliterator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.mockito.Mockito;

@ExtendWith(MockitoExtension.class)
class KanaConverterTest {

    private KanaConverter kanaConverter;

    @Mock
    private Transliterator transliterator;

    @BeforeEach
    void setUp() {
        kanaConverter = new KanaConverter();
    }

    @Test
    void testConvertHiraganaToAlphabet() {
        String hiragana = "ひらがな";
        Mockito.lenient().when(transliterator.transliterate(hiragana)).thenReturn("hiragana");
        String result = kanaConverter.convertHiraganaToAlphabet(hiragana);
        assertEquals("hiragana", result);
    }

    @Test
    void testConvertKatakanaToAlphabet() {
        String katakana = "カタカナ";
        Mockito.lenient().when(transliterator.transliterate(katakana)).thenReturn("katakana");
        String result = kanaConverter.convertKatakanaToAlphabet(katakana);
        assertEquals("katakana", result);
    }
}
