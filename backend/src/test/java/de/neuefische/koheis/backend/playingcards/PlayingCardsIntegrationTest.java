package de.neuefische.koheis.backend.playingcards;

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
class PlayingCardsIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void expectListWithSizeFiftyTwoOnGet() throws Exception {
        //GIVEN
        String size = "large";
        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/playing_cards/" + size)
                )
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", Matchers.hasSize(52)));
    }

}
