package de.neuefische.koheis.backend.translation;

import com.deepl.api.TextResult;
import com.deepl.api.Translator;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class DeepLServiceTest {

    Translator translator = mock(Translator.class);
    DeepLConfig deepLConfig = mock(DeepLConfig.class);
    DeepLService deepLService = new DeepLService(deepLConfig);

    @Test
    void expectKeyString_whenGetKeyCalled() {
        //GIVEN
        String expect = "abcdefghijklmnopqr";

        //WHEN
        when(deepLConfig.getKey()).thenReturn(expect);
        String actual = deepLService.getKey();

        //THEN
        assertEquals(expect, actual);
    }

    @Test
    void expectJapaneseTranslation_whenGetJapaneseTranslationCalled() throws Exception{
        //GIVEN
        String originalText = "animal";
        String originalLanguage = "EN";
        String authKey = "Test";
        Translation expected = new Translation("animal", "動物");
        TextResult textResult = new TextResult("動物", "EN");

        //WHEN
        when(deepLConfig.getKey()).thenReturn(authKey);
        when(translator.translateText(originalText, originalLanguage, "JA")).thenReturn(textResult);
        Translation actual = deepLService.getJapaneseTranslation(originalText, originalLanguage);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void expectException_whenGetJapaneseTranslationCalledWithWrongLanguage() {
        //GIVEN
        String originalText = "Tier";
        String originalLanguage = "EN";

        //WHEN
        when(deepLConfig.getKey()).thenReturn("Test");

        //THEN
        assertThrows(Exception.class, () ->  deepLService.getJapaneseTranslation(originalText, originalLanguage));

    }

}
