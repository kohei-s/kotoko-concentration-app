package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAnonymousUser_whenNotLoggedInUser() throws Exception {
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))

                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("anonymousUser"));
    }

}
