package de.neuefische.koheis.backend.security;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@RequiredArgsConstructor
class MongoUserServiceTest {

    private final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    private final MongoUserService mongoUserService;

    @Test
    void whenUserExists_returnUserInfo() {
        //GIVEN
        MongoUser mongoUser = new MongoUser("1", "test", "test", "test", new String[]{"test"});
        Mockito.when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(mongoUser));

        //WHEN
        UserInfo expected = new UserInfo(mongoUser.username(), mongoUser.achievement(), mongoUser.wordbook());
        UserInfo actual = mongoUserService.findByUsername("test");

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void whenNotUserExists_throwException() {
        //GIVEN
        //WHEN
        Mockito.when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.empty());
        UserInfo expected = new UserInfo("Anonymous User", "unknown", new String[]{"unknown"});
        UserInfo actual = mongoUserService.findByUsername("test");

        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void whenUpdateExistingUserInfo_returnUpdatedUserInfo() {
        //GIVEN
        MongoUser before = new MongoUser("012", "test", "345", "testA", new String[]{"testB"});
        Mockito.when(mongoUserRepository.save(before))
                .thenReturn(before);
        Mockito.when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(before));

        //WHEN
        MongoUser after = new MongoUser("012", "test", "345", "testC", new String[]{"testD"});
        Mockito.when(mongoUserRepository.save(after))
                .thenReturn(after);
        Mockito.when(mongoUserRepository.findByUsername("test"))
                .thenReturn(Optional.of(after));
        UserInfo expected = new UserInfo("test", "testC", new String[]{"testD"});
        UserInfo actual = mongoUserService.updateUserInfo(new UserInfo("test", "testC", new String[]{"testD"}));

        //THEN
        verify(mongoUserRepository).save(after);
        verify(mongoUserRepository).findByUsername("test");
        assertEquals(expected, actual);
    }

}
