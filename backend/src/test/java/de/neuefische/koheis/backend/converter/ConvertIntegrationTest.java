package de.neuefische.koheis.backend.converter;

import de.neuefische.koheis.backend.translation.Translation;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
class ConvertIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    GooConfig gooConfig;

    @MockBean
    ConvertService convertService;

    @Test
    @WithMockUser(username="test")
    void expectConversion_whenConvertTranslationToConversionCalled() throws Exception {

        Translation translation = new Translation("animal", "動物");
        Conversion conversion = new Conversion("動物", "どうぶつ", "doubutsu");
        String expected = """
                {
                "kanji": "動物",
                "kana": "どうぶつ",
                "alphabet": "doubutsu"
                }
                """;

       Mockito.when(convertService.convertTranslationToConversion(translation)).thenReturn(conversion);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/converter")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                {
                "original": "animal",
                "japanese": "動物"
                }
                """).with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expected));
    }

}
