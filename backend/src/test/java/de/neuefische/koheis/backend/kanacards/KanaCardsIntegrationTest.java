package de.neuefische.koheis.backend.kanacards;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class KanaCardsIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    void expectHashMapOfFourAlphabetHiraganaPairs() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/kana_cards/hiragana")

        )
        //THEN
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.*", Matchers.hasSize(4)));
    }

    @Test
    void expectHashMapOfFourAlphabetKatakanaPairs() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/kana_cards/katakana")

                )
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.*", Matchers.hasSize(4)));
    }

}
