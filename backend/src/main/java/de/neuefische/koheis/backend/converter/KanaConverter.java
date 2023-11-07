package de.neuefische.koheis.backend.converter;

import com.ibm.icu.text.Transliterator;
import org.springframework.stereotype.Component;

@Component
public class KanaConverter {

    public String convertHiraganaToAlphabet(String hiragana) {
        Transliterator trans = Transliterator.getInstance("Hiragana-Latin");
        return trans.transliterate(hiragana);
    }

    public String convertKatakanaToAlphabet(String katakana) {
        Transliterator trans = Transliterator.getInstance("Katakana-Latin");
        return trans.transliterate(katakana);
    }

}
