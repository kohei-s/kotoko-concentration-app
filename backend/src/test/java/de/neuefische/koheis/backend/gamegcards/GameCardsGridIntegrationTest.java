package de.neuefische.koheis.backend.gamegcards;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.koheis.backend.security.MongoUser;
import de.neuefische.koheis.backend.security.MongoUserRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    MongoUserRepository mongoUserRepository;

    @BeforeEach
    void setUpUsers() {
        MongoUser user = new MongoUser(
                "1",
                "testUsername",
                "testPassword",
                "achievement",
                new ArrayList<>(List.of("testWord")),
                new ArrayList<>(List.of(true)),
                new ArrayList<>(List.of("testLevel")),
                "testSet");
        mongoUserRepository.save(user);
    }

    @DirtiesContext
    @Test
    @WithMockUser (username = "testUsername", password = "testPassword")
    void whenMyListEmpty_thenReturnEmptyList() throws Exception {
        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/game_cards/myAll")
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
    @WithMockUser(username = "testUsername", password = "testPassword")
    void whenGetExistingGameCardById_thenReturnGameCardWithId() throws Exception {
        //GIVEN
        String actual = mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/game_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "title": "testTitle",
                                        "reading": "testReading",
                                        "cardSetName": "testSet"
                                        }
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                        "title": "testTitle",
                        "reading": "testReading",
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
                        "title": "testTitle",
                        "reading": "testReading",
                        "cardSetName": "testSet",
                        "authorId": "1"
                       }
                        """.replaceFirst("<ID>", id)));
    }

    @DirtiesContext
    @Test
    @WithMockUser(username = "testUsername", password = "testPassword")
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
    @WithMockUser(username = "testUsername", password = "testPassword")
    void expectTwoDimensionalArrayOfTwentyEightPlayingCards() throws Exception {
        //GIVEN
        String size = "small";
        gameCardsRepository.save(new GameCard("01", "♥1", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("02", "♥2", "empty","playing-cards", "1"));
        gameCardsRepository.save(new GameCard("03", "♥3", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("04", "♥4", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("05", "♥5", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("06", "♥6", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("07", "♥7", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("08", "♥8", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("09", "♥9", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("10", "♥10", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("11", "♥11", "empty", "playing-cards", "1"));
        gameCardsRepository.save(new GameCard("12", "♥12", "empty", "playing-cards", "1"));

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
    @WithMockUser(username = "testUsername", password = "testPassword")
    void whenAddedGameCard_thenReturnGameCard() throws Exception {
        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/game_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "title": "testTitle",
                                        "reading": "testReading",
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
                .andExpect(jsonPath("reading").value("testReading"))
                .andExpect(jsonPath("cardSetName").value("testSet3"))
                .andExpect(jsonPath("authorId").value("1"));
    }

    @DirtiesContext
    @Test
    @WithMockUser(username = "testUsername", password = "testPassword")
    void whenUpdateExistingGameCard_thenReturnUpdatedGameCard() throws Exception {
        //GIVEN
        String existingGameCardWithoutId = mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/game_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "title": "test",
                                        "reading": "testReading",
                                        "cardSetName": "testSet"
                                        }
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                        "title": "test",
                        "reading": "testReading",
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
                                        "reading": "test_updatedReading",
                                        "cardSetName": "testSet",
                                        "authorId": "1"
                                        }
                                        """)
                                .with(csrf())
                )

                //THEN
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value(id))
                .andExpect(jsonPath("title").value("test_updated"))
                .andExpect(jsonPath("reading").value("test_updatedReading"))
                .andExpect(jsonPath("cardSetName").value("testSet"))
                .andExpect(jsonPath("authorId").value("1"));
    }

    @DirtiesContext
    @Test
    @WithMockUser(username = "testUsername", password = "testPassword")
    void whenUpdateNotExistingGameCard_thenReturnNotFoundErrorMessage() throws Exception {
        //GIVEN
        String idOfNotExistingGameCard = "012";
        GameCardWithoutId gameCardWithoutId = new GameCardWithoutId("test", "testReading", "testSet", "1");
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
    @WithMockUser(username = "testUsername", password = "testPassword")
    void whenDeleteExistingGameCard_thenReturnEmptyList() throws Exception {
        //GIVEN
        String existingGameCardWithoutId = mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/game_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "title": "test",
                                        "reading": "testReading",
                                        "cardSetName": "testSet"
                                        }
                                        """)
                                .with(csrf())
                )
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                        "title": "test",
                        "reading": "testReading",
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
                MockMvcRequestBuilders.delete("/api/game_cards/" + id)
                        .with(csrf())
        ).andExpect(status().isOk());

        //THEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/game_cards/myAll")
                                .with(csrf())
                ).andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    @WithMockUser(username = "testUsername", password = "testPassword")
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
