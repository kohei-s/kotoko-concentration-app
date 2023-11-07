package de.neuefische.koheis.backend.translation;

import com.deepl.api.DeepLException;
import com.deepl.api.TextResult;
import com.deepl.api.Translator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class DeepLServiceTest {
    DeepLConfig deepLConfig = mock(DeepLConfig.class);
    Translator translator = mock(Translator.class);
    DeepLService deepLService;

    @BeforeEach
    void setUp() {
        deepLService = new DeepLService(deepLConfig);
    }

    @Test
    void expectTranslation_whenTranslateTextCalled() throws DeepLException, InterruptedException {
        //GIVEN
        String originalWord = "proton beam";
        String translatedWord = "陽子ビーム";
        String originalLanguage = "EN";
        String authKey = "text:fx";
        Translation expected = new Translation(originalWord, translatedWord);
        TextResult textResult = new TextResult(translatedWord, originalLanguage);

        //WHEN
        when(deepLConfig.getKey()).thenReturn(authKey);
        when(deepLConfig.getTranslator()).thenReturn(translator);
        when(translator.translateText(originalWord, originalLanguage, "JA")).thenReturn(textResult);
        Translation actual = deepLService.getJapaneseTranslation(originalWord, originalLanguage);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void expectException_whenGetJapaneseTranslationCalledWithWrongLanguage() {
        //GIVEN
        String originalText = "Tier";
        String originalLanguage = "EN";

        //WHEN
        //THEN
        assertThrows(Exception.class, () -> deepLService.getJapaneseTranslation(originalText, originalLanguage));
    }
}
