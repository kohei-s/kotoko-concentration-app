package de.neuefische.koheis.backend.translation;

import com.deepl.api.DeepLException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;

class DeepLServiceTest {

    DeepLConfig deepLConfig = mock(DeepLConfig.class);

    DeepLService deepLService = new DeepLService(deepLConfig);

    @Test
    void expectJapaneseTranslation_whenGetJapaneseTranslationCalled() throws Exception{
        //GIVEN
        String originalText = "animal";
        String originalLanguage = "en";
        Translation expected = new Translation("animal", "動物");

        //WHEN
        Translation actual = deepLService.getJapaneseTranslation(originalText, originalLanguage);

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void expectException_whenGetJapaneseTranslationCalledWithWrongLanguage() {
        //GIVEN
        String originalText = "Tier";
        String originalLanguage = "en";

        //WHEN
        //THEN
        assertThrows(DeepLException.class, () ->  deepLService.getJapaneseTranslation(originalText, originalLanguage));

    }

}
