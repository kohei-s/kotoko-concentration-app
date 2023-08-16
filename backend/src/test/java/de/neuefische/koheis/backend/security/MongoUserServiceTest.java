package de.neuefische.koheis.backend.security;

import de.neuefische.koheis.backend.idservice.IdService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

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
        verify(mongoUserRepository).insert(new MongoUser("01", "testName", "123", null, new String[0], new boolean[0], new String[0]));
        verify(idService).createRandomId();
    }

    @Test
    void whenUserExists_throwException() {
        //GIVEN
        Mockito.when(mongoUserRepository.findByUsername("testName"))
                        .thenReturn(Optional.of(new MongoUser("01", "testName", "testPassword", "testAchievement", new String[]{"testWordbook"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"})));

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
        MongoUser mongoUser = new MongoUser("01", "testName", "testPassword", "", new String[]{}, new boolean[]{}, new String[]{});
        Mockito.when(mongoUserRepository.findByUsername("testName"))
                .thenReturn(Optional.of(mongoUser));
        UserInfo expected = new UserInfo("testName", "", new String[]{}, new boolean[]{}, new String[]{});

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
        UserInfo expected = new UserInfo("Anonymous User", "", new String[]{}, new boolean[]{}, new String[]{});

        //WHEN
        UserInfo actual = mongoUserService.findByUsername("testName");

        //THEN
        verify(mongoUserRepository).findByUsername("testName");
        assertEquals(expected, actual);
    }

    @Test
    void whenUpdateExistingUserInfo_returnUpdatedUserInfo() {
        //GIVEN
        MongoUser before = new MongoUser("012", "test", "345", "testA", new String[]{"testB"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        Mockito.when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(before));

        //WHEN
        MongoUser after = new MongoUser("012", "test", "345", "testC", new String[]{"testD"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        Mockito.when(mongoUserRepository.save(after))
                .thenReturn(after);
        Mockito.when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(after));
        UserInfo expected = new UserInfo("test", "testC", new String[]{"testD"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        UserInfo actual = mongoUserService.updateUserInfo(new UserInfo("test", "testC", new String[]{"testD"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"}));

        //THEN
        verify(mongoUserRepository).save(after);
        verify(mongoUserRepository).findByUsername("test");
        assertEquals(expected, actual);
    }

}
