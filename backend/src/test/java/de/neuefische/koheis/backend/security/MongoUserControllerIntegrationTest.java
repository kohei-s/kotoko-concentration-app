package de.neuefische.koheis.backend.security;

import org.hamcrest.Matchers;
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
    @DirtiesContext
    @WithMockUser(username = "test", password = "1234")
    void whenGetUserInfo_getUsername() throws Exception {
        //GIVEN

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON))

                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username", Matchers.is("Anonymous User")));
    }

    @Test
    @DirtiesContext
    void whenUpdateUserInfo_getUpdatedUserInfo() throws Exception {
        //GIVEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "username": "test",
                        "password": "abcd1234"
                        }
                        """)
                .with(csrf()));

        String userInfo = """
                {"username": "test",
                "achievement": "testA",
                "wordbook": ["testB"]
                }
                """;


        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/users/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userInfo)
                        .with(csrf()))

                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(userInfo));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "test", password = "abcd1234")
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

    @Test
    void expectRegistration_whenRegisterUser() throws Exception {
        //GIVEN
        String newUser = """
                    {
                        "username": "test",
                        "password": "abcd1234"
                    }
                """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newUser)
                        .with(csrf()))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("registered"));
    }

}
