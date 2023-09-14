package de.neuefische.koheis.backend.translation;

import com.deepl.api.DeepLException;
import com.deepl.api.Translator;
import com.deepl.api.TranslatorOptions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.HashMap;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


class DeepLServiceTest {
    DeepLConfig deepLConfig = mock(DeepLConfig.class);
    Translator translator;
    DeepLService deepLService;

    @BeforeEach
    void setUp() {
        deepLService = new DeepLService(deepLConfig);
    }

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

    @Test
    void expectTranslation_whenTranslateTextCalled() throws DeepLException, InterruptedException {
        //GIVEN
        String originalWord = "proton beam";
        String translatedWord = "陽子ビーム";
        String originalLanguage = "EN";
        String authKey = "test:fx";
        Map<String, String> headers = new HashMap<>();
        headers.put("mock-server-session-allow-missing-user-agent", "5");
        headers.put("mock-server-session-allow-reconnections", "5");
        Translation expected = new Translation(originalWord, translatedWord);
        TranslatorOptions options = new TranslatorOptions()
                .setServerUrl("http://localhost:3000")
                .setHeaders(headers);

        //WHEN
        when(deepLConfig.getKey()).thenReturn(authKey);
        translator = new Translator(authKey, options);
        Translation actual = new Translation(originalWord, translator.translateText(originalWord, originalLanguage, "JA").getText());

        //THEN
        assertEquals(expected, actual);
    }

}
