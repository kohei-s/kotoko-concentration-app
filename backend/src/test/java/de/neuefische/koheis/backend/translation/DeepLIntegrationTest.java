package de.neuefische.koheis.backend.translation;

import com.deepl.api.TextResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
class DeepLIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    DeepLConfig deepLConfig;

    @MockBean
    DeepLService deepLService;

    @Test
    void expectJapaneseTranslation_whenGetTranslation() throws Exception {
        String originalText = "animal";
        String originalLanguage = "EN";
        Translation expected = new Translation("animal", "動物");
        String expectedJson = """
                {
                "original": "animal",
                "japanese": "動物"
                }
                """;


        when(deepLService.getJapaneseTranslation(originalText, originalLanguage)).thenReturn(expected);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/translation?original=" + originalText + "&language=" + originalLanguage))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedJson));


    }

}
