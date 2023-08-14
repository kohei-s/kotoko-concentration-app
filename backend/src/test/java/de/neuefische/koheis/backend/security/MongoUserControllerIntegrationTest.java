package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;

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
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    @WithMockUser(username = "test", password = "1234")
    void testGetUserInfo() throws Exception {
        //GIVEN

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON))

                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk());
                /*.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username", Matchers.is("test")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.achievement", Matchers.is("USER")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.wordbook", Matchers.hasItem("ROLE_USER")));
    }*/
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "test", password="1234")
    void getAnonymousUser_whenLoggedOut() throws Exception {
        //GIVEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(httpBasic("test", "1234")).with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("test"));

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/logout")
                .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk());


        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me")
                .with(SecurityMockMvcRequestPostProcessors.anonymous()))

                //THEN
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());

    }

}
