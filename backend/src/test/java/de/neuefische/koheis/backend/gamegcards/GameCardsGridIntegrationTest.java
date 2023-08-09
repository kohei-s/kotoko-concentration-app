package de.neuefische.koheis.backend.gamegcards;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class GameCardsGridIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    GameCardsRepository gameCardsRepository;

    @Test
    void expectTwoDimensionalArrayOfTwentyEightPlayingCards() throws Exception {
        //GIVEN
        String size = "small";
        GameCard gameCard1 = new GameCard("♥1", "playing-cards");
        GameCard gameCard2 = new GameCard("♥2", "playing-cards");
        GameCard gameCard3 = new GameCard("♥3", "playing-cards");
        GameCard gameCard4 = new GameCard("♥4", "playing-cards");
        GameCard gameCard5 = new GameCard("♥5", "playing-cards");
        GameCard gameCard6 = new GameCard("♥6", "playing-cards");
        GameCard gameCard7 = new GameCard("♥7", "playing-cards");
        GameCard gameCard8 = new GameCard("♥8", "playing-cards");
        GameCard gameCard9 = new GameCard("♥9", "playing-cards");
        GameCard gameCard10 = new GameCard("♥10", "playing-cards");
        GameCard gameCard11 = new GameCard("♥11", "playing-cards");
        GameCard gameCard12 = new GameCard("♥12", "playing-cards");

        gameCardsRepository.save(gameCard1);
        gameCardsRepository.save(gameCard2);
        gameCardsRepository.save(gameCard3);
        gameCardsRepository.save(gameCard4);
        gameCardsRepository.save(gameCard5);
        gameCardsRepository.save(gameCard6);
        gameCardsRepository.save(gameCard7);
        gameCardsRepository.save(gameCard8);
        gameCardsRepository.save(gameCard9);
        gameCardsRepository.save(gameCard10);
        gameCardsRepository.save(gameCard11);
        gameCardsRepository.save(gameCard12);

        //WHEN
        String result = mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/playing_cards?size=" + size + "&name=playing-cards")
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

}

