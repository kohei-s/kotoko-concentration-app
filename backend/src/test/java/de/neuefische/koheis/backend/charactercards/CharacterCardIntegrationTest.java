package de.neuefische.koheis.backend.charactercards;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.koheis.backend.chractercards.CharacterCard;
import de.neuefische.koheis.backend.chractercards.CharacterCardWithoutId;
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
    void whenGetCharacterCards_thenReturnEmptyListOnGet() throws Exception {
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
    void whenGetExistingCharacterCardById_thenReturnCharacterCardWithId() throws Exception {
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
    void whenGetNotExistingCharacterCard_thenReturnNotFoundErrorMessage() throws Exception {
        //GIVEN
        String idOfNotExistingCharacterCard = "012";

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/character_cards/" + idOfNotExistingCharacterCard)
                )

                //THEN
                .andExpect(status().isNotFound());
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
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("character").value("test"));
    }

    @DirtiesContext
    @Test
    void whenUpdateExistingCharacterCard_thenReturnUpdatedCharacterCard() throws Exception {
        //GIVEN
        String existingCharacterCardWithoutId = mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/character_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"character": "test"}
                                        """)
                )
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {"character": "test"}
                        """))
                .andReturn()
                .getResponse()
                .getContentAsString();

        CharacterCard existingCharacterCard = objectMapper.readValue(existingCharacterCardWithoutId, CharacterCard.class);
        String id = existingCharacterCard.id();

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/character_cards/" + id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"character": "test_updated"}
                                        """)
                )

                //THEN
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value(id))
                .andExpect(jsonPath("character").value("test_updated"));
    }

    @DirtiesContext
    @Test
    void whenUpdateNotExistingCharacterCard_thenReturnNotFoundErrorMessage() throws Exception {
        //GIVEN
        String idOfNotExistingCharacterCard = "012";
        CharacterCardWithoutId characterCardWithoutId = new CharacterCardWithoutId("test");
        String characterCardJson = objectMapper.writeValueAsString(characterCardWithoutId);

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/character_cards/" + idOfNotExistingCharacterCard)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(characterCardJson)
                )

                //THEN
                .andExpect(status().isNotFound());
    }

    @DirtiesContext
    @Test
    void whenDeleteExistingCharacterCard_thenReturnEmptyList() throws Exception {
        //GIVEN
        String existingCharacterCardWithoutId = mockMvc.perform(
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

        CharacterCard existingCharacterCard = objectMapper.readValue(existingCharacterCardWithoutId, CharacterCard.class);
        String id = existingCharacterCard.id();

        //WHEN
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/character_cards/" + id)
        ).andExpect(status().isOk());

        //THEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/character_cards")
                ).andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    void whenDeleteNotExistingCharacterCard_thenReturnNotFoundErrorMessage() throws Exception {
        //GIVEN
        String idOfNotExistingCharacterCard = "012";

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.delete("/api/character_cards/" + idOfNotExistingCharacterCard)
                )

                //THEN
                .andExpect(status().isNotFound());
    }

}
