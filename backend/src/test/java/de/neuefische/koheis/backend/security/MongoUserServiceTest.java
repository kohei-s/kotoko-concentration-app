package de.neuefische.koheis.backend.security;

import de.neuefische.koheis.backend.idservice.IdService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


class MongoUserServiceTest {

    private final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    private final IdService idService = mock(IdService.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final MongoUserService mongoUserService = new MongoUserService(mongoUserRepository, idService, passwordEncoder);

    @Test
    void whenUserIsRegistered_verifyRepositoryCall() {
        //GIVEN
        MongoUserCreation mongoUserWithoutId = new MongoUserCreation("testName", "testPassword");
        Mockito.when(mongoUserRepository.findByUsername("testName"))
                .thenReturn(Optional.empty());
        when(idService.createRandomId())
                .thenReturn("01");
        when(passwordEncoder.encode("testPassword"))
                .thenReturn("123");

        //WHEN
        mongoUserService.registerUser(mongoUserWithoutId);

        //THEN
        verify(mongoUserRepository).insert(new MongoUser("01", "testName", "123", null, new ArrayList<>(), new ArrayList<>(), new ArrayList<>()));
        verify(idService).createRandomId();
    }

    @Test
    void whenUserExists_throwException() {
        //GIVEN
        Mockito.when(mongoUserRepository.findByUsername("testName"))
                        .thenReturn(Optional.of(new MongoUser("01", "testName", "testPassword", "testAchievement", new ArrayList<>(List.of("testWordbook")), new ArrayList<>(List.of(false, false)), new ArrayList<>(List.of("small", "small", "small", "small")))));

        //WHEN //THEN
       try {
           mongoUserService.registerUser(new MongoUserCreation("testName", "testPassword"));
       } catch (Exception e) {
           assertEquals("User: testName exists already!", e.getMessage());
       }
    }

    @Test
    void whenUsernameExists_returnUserInfo() {
        //GIVEN
        MongoUser mongoUser = new MongoUser("01", "testName", "testPassword", "", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        Mockito.when(mongoUserRepository.findByUsername("testName"))
                .thenReturn(Optional.of(mongoUser));
        UserInfo expected = new UserInfo("testName", "", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

        //WHEN
        UserInfo actual = mongoUserService.findByUsername("testName");

        //THEN
        verify(mongoUserRepository, times(2)).findByUsername("testName");
        assertEquals(expected, actual);
    }

    @Test
    void whenUsernameExists_returnAnonymousUser () {
        //GIVEN
        Mockito.when(mongoUserRepository.findByUsername("testName"))
                .thenReturn(Optional.empty());
        UserInfo expected = new UserInfo("Anonymous User", "", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

        //WHEN
        UserInfo actual = mongoUserService.findByUsername("testName");

        //THEN
        verify(mongoUserRepository).findByUsername("testName");
        assertEquals(expected, actual);
    }

    @Test
    void whenUpdateExistingUserInfo_returnUpdatedUserInfo() {
        //GIVEN
        MongoUser before = new MongoUser("012", "test", "345", "testA", new ArrayList<>(List.of("testB")), new ArrayList<>(List.of(false, false)), new ArrayList<>(List.of("small", "small", "small", "small")));
        Mockito.when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(before));

        //WHEN
        MongoUser after = new MongoUser("012", "test", "345", "testC",  new ArrayList<>(List.of("testD")), new ArrayList<>(List.of(false, false)), new ArrayList<>(List.of("small", "small", "small", "small")));
        Mockito.when(mongoUserRepository.save(after))
                .thenReturn(after);
        Mockito.when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(after));
        UserInfo expected = new UserInfo("test", "testC",  new ArrayList<>(List.of("testD")), new ArrayList<>(List.of(false, false)), new ArrayList<>(List.of("small", "small", "small", "small")));
        UserInfo actual = mongoUserService.updateUserInfo(new UserInfo("test", "testC",  new ArrayList<>(List.of("testD")), new ArrayList<>(List.of(false, false)), new ArrayList<>(List.of("small", "small", "small", "small"))));

        //THEN
        verify(mongoUserRepository).save(after);
        verify(mongoUserRepository).findByUsername("test");
        assertEquals(expected, actual);
    }

}
