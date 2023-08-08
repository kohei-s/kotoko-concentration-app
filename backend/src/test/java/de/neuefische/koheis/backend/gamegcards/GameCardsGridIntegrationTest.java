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

    @Test
    void expectTwoDimensionalArrayOfTwentyEightPlayingCards() throws Exception {
        //GIVEN
        String size = "medium";
        //WHEN
        String result = mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/playing_cards/" + size)
                )
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JSONObject json = new JSONObject(result);
        JSONArray playingCardsGrid = json.getJSONArray("cardsGrid");
        JSONArray isMatched = json.getJSONArray("isMatched");

        //THEN
        int expectedRows = 7;
        int expectedCols = 4;
        assertEquals(expectedRows, playingCardsGrid.length());
        assertEquals(expectedRows, isMatched.length());
        for (int i = 0; i < playingCardsGrid.length(); i++) {
            JSONArray row = playingCardsGrid.getJSONArray(i);
            assertEquals(expectedCols, row.length());
        }
        for (int i = 0; i < isMatched.length(); i++) {
            JSONArray row = isMatched.getJSONArray(i);
            assertEquals(expectedCols, row.length());
        }

    }

}
