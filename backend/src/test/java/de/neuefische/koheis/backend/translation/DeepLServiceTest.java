package de.neuefische.koheis.backend.translation;

import com.deepl.api.DeepLException;
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
    void expectException_whenGetJapaneseTranslationCalledWithWrongLanguage() {
        //GIVEN
        String originalText = "Tier";
        String originalLanguage = "EN";

        //WHEN
        when(deepLConfig.getKey()).thenReturn("Test");

        //THEN
        assertThrows(Exception.class, () -> deepLService.getJapaneseTranslation(originalText, originalLanguage));
    }

}
