package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
class UserInfoTest {
    @Test
    void testHashCode() {
        UserInfo user1 = new UserInfo("test", "testAchievement", new String[]{"apple", "banana", "cherry"});
        UserInfo user2 = new UserInfo("test", "testAchievement", new String[]{"apple", "banana", "cherry"});

        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    void testToString() {
        UserInfo user = new UserInfo("test", "testAchievement", new String[]{"dog", "cat", "bird"});
        String expectedString = "UserInfo{" +
                "username='test', " +
                "achievement='testAchievement', " +
                "wordbook=[dog, cat, bird]" +
                '}';

        assertEquals(expectedString, user.toString());
    }
}

