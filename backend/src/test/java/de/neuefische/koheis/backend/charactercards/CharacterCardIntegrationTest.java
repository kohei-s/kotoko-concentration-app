package de.neuefische.koheis.backend.charactercards;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.koheis.backend.chractercards.CharacterCard;
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
    @Autowired
    ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    void expectEmptyListOnGet() throws Exception {
        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/character_cards")
                )
        //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    void whenGetCOneCharacterCardById() throws Exception {
        //GIVEN
        String actual = mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/character_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"character": "test"}
                                        """)
                )
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                        "character": "test"
                        }
                        """))
                .andReturn()
                .getResponse()
                .getContentAsString();

        CharacterCard actualCharacterCard = objectMapper.readValue(actual, CharacterCard.class);
        String id = actualCharacterCard.id();

        //WHEN
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/character_cards/" + id))
                        .andExpect(status().isOk())

        //THEN
                        .andExpect(content().json("""
                                {
                                "id": "<ID>",
                                "character": "test"
                                }
                                """.replaceFirst("<ID>", id)));
    }

    @DirtiesContext
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

    @DirtiesContext
    @Test
    void whenUpdatedCharacterCard_thenReturnCharacterCard() throws Exception {
        //GIVEN
        String id = "012";

        //WHEN
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/character_cards/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"character": "test"}
                                """
                        )
        )
        //THEN
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value("012"))
                .andExpect(jsonPath("character").value("test"));
    }

}
