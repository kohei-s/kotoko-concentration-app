package de.neuefische.koheis.backend.charactercards;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CharacterCardIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @DirtiesContext
    @Test
    void expectEmptyListOnGet() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/character_cards")
                )
        //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void whenAddedCharacterCard_thenReturnCharacterCard() throws Exception {
        //WHEN
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/character_cards")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"character": "test"}
                                """)
        )

        //THEN
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("character").value("test"));
    }

}
