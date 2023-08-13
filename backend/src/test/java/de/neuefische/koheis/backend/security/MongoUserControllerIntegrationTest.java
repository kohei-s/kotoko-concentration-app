package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    @DirtiesContext
    void getAnonymousUser_whenNotLoggedInUser() throws Exception {
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))

                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("anonymousUser"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username="test", password ="test123")
    void getName_whenLoggedIn() throws Exception {
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(httpBasic("test", "test123")).with(csrf()))

                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("test"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "test", password="test123")
    void getAnonymousUser_whenLoggedOut() throws Exception {
        //GIVEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(httpBasic("test", "test123")).with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("test"));

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/logout")
                .with(csrf()));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))

                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("anonymousUser"));

    }


}
