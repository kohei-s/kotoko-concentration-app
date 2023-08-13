package de.neuefische.koheis.backend.gamegcards;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class GameCardsGridIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    GameCardsRepository gameCardsRepository;

    @DirtiesContext
    @Test
    @WithMockUser
    void whenListEmpty_thenReturnEmptyList() throws Exception {
        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/game_cards/all")
                                .with(csrf())
                )

                //THEN
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("""
                        []
                        """));

    }


    @DirtiesContext
    @Test
    @WithMockUser
    void whenGetExistingGameCardById_thenReturnGameCardWithId() throws Exception {
        //GIVEN
        String actual = mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/game_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "title": "test",
                                        "cardSetName": "testSet"
                                        }
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                        "title": "test",
                        "cardSetName": "testSet"
                        }
                        """))
                .andReturn()
                .getResponse()
                .getContentAsString();

        GameCard actualGameCard = objectMapper.readValue(actual, GameCard.class);
        String id = actualGameCard.getId();

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/game_cards/" + id))
                .andExpect(status().isOk())

                //THEN
                .andExpect(content().json("""
                        {
                        "id": "<ID>",
                        "title": "test",
                        "cardSetName": "testSet"
                        }
                        """.replaceFirst("<ID>", id)));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenGetNotExistingGameCard_thenReturnNotFoundErrorMessage() throws Exception {
        //GIVEN
        String idOfNotExistingGameCard = "012";

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/game_cards/" + idOfNotExistingGameCard)
                )

                //THEN
                .andExpect(status().isNotFound());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void expectTwoDimensionalArrayOfTwentyEightPlayingCards() throws Exception {
        //GIVEN
        String size = "small";
        gameCardsRepository.save(new GameCard("01", "♥1", "playing-cards"));
        gameCardsRepository.save(new GameCard("012", "♥2", "playing-cards"));
        gameCardsRepository.save(new GameCard("03", "♥3", "playing-cards"));
        gameCardsRepository.save(new GameCard("04", "♥4", "playing-cards"));
        gameCardsRepository.save(new GameCard("05", "♥5", "playing-cards"));
        gameCardsRepository.save(new GameCard("06", "♥6", "playing-cards"));
        gameCardsRepository.save(new GameCard("07", "♥7", "playing-cards"));
        gameCardsRepository.save(new GameCard("08", "♥8", "playing-cards"));
        gameCardsRepository.save(new GameCard("09", "♥9", "playing-cards"));
        gameCardsRepository.save(new GameCard("10", "♥10", "playing-cards"));
        gameCardsRepository.save(new GameCard("11", "♥11", "playing-cards"));
        gameCardsRepository.save(new GameCard("12", "♥12", "playing-cards"));

        //WHEN
        String result = mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/game_cards?size=" + size + "&name=playing-cards")
                )
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JSONObject json = new JSONObject(result);
        JSONArray cardsGrid = json.getJSONArray("cardsGrid");
        JSONArray isMatched = json.getJSONArray("isMatched");

        //THEN
        int expectedRowNumber = 3;
        assertEquals(expectedRowNumber, cardsGrid.length());
        assertEquals(expectedRowNumber, isMatched.length());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenAddedGameCard_thenReturnGameCard() throws Exception {
        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/game_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "title": "testTitle",
                                        "cardSetName": "testSet3"
                                        }
                                        """)
                                .with(csrf())
                )
                //THEN
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("title").value("testTitle"))
                .andExpect(jsonPath("cardSetName").value("testSet3"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenUpdateExistingGameCard_thenReturnUpdatedGameCard() throws Exception {
        //GIVEN
        String existingGameCardWithoutId = mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/game_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "title": "test",
                                        "cardSetName": "testSet"
                                        }
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                        "title": "test",
                        "cardSetName": "testSet"
                        }
                        """))
                .andReturn()
                .getResponse()
                .getContentAsString();

        GameCard existingGameCard = objectMapper.readValue(existingGameCardWithoutId, GameCard.class);
        String id = existingGameCard.getId();

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/game_cards/" + id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "title": "test_updated",
                                        "cardSetName": "testSet"
                                        }
                                        """)
                                .with(csrf())
                )

                //THEN
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value(id))
                .andExpect(jsonPath("title").value("test_updated"))
                .andExpect(jsonPath("cardSetName").value("testSet"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenUpdateNotExistingGameCard_thenReturnNotFoundErrorMessage() throws Exception {
        //GIVEN
        String idOfNotExistingGameCard = "012";
        GameCardWithoutId gameCardWithoutId = new GameCardWithoutId("test", "testSet");
        String gameCardJson = objectMapper.writeValueAsString(gameCardWithoutId);

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/game_cards/" + idOfNotExistingGameCard)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(gameCardJson)
                                .with(csrf())
                )

                //THEN
                .andExpect(status().isNotFound());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenDeleteExistingGameCard_thenReturnEmptyList() throws Exception {
        //GIVEN
        String existingGameCardWithoutId = mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/game_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "title": "test",
                                        "cardSetName": "setTest"
                                        }
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                        "title": "test",
                        "cardSetName": "setTest"
                        }
                        """))
                .andReturn()
                .getResponse()
                .getContentAsString();

        GameCard existingGameCard = objectMapper.readValue(existingGameCardWithoutId, GameCard.class);
        String id = existingGameCard.getId();

        //WHEN
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/game_cards/" + id)
                        .with(csrf())
        ).andExpect(status().isOk());

        //THEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/game_cards/all")
                                .with(csrf())
                ).andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenDeleteNotExistingGameCard_thenReturnNotFoundErrorMessage() throws Exception {
        //GIVEN
        String idOfNotExistingGameCard = "012";

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.delete("/api/game_cards/" + idOfNotExistingGameCard)
                                .with(csrf())
                )

                //THEN
                .andExpect(status().isNotFound());
    }

}

