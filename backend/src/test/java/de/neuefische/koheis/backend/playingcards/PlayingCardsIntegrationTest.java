package de.neuefische.koheis.backend.playingcards;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PlayingCardsIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void expectListWithSizeFiftyTwoOnGet() throws Exception {
        //GIVEN
        String size = "large";
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/playing_cards/" + size)
                )
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", Matchers.hasSize(52)));
    }

    @Test
    void expectTrueWithCardsOfSameNumber() throws Exception{
        //WHEN
        Boolean actual = Boolean.valueOf(mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/playing_cards")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        ["spade13","heart13"]
                                        """)
                )
        //THEN
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString());

        assertThat(actual).isTrue();
    }

}
