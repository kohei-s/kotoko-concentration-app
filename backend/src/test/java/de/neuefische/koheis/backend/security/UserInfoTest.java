package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserInfoTest {
    @Test
    void testHashCode() {
        UserInfo user1 = new UserInfo("test", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        UserInfo user2 = new UserInfo("test", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});

        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    void testToString() {
        UserInfo user = new UserInfo("test", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        String expectedString = "UserInfo{" +
                "username='test', " +
                "achievement='8', " +
                "wordbook=[h1, k2, c3], " +
                "diacritics=[false, false], " +
                "levels=[small, small, small, small]" +
                '}';

        assertEquals(expectedString, user.toString());
    }

    @Test
    void testEquals() {
        UserInfo user1 = new UserInfo("test1", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        UserInfo user2 = new UserInfo("test1", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        UserInfo user3 = new UserInfo("test2", "12", new String[]{"h3", "k4", "c5"}, new boolean[]{true, false}, new String[]{"medium", "large", "small", "small"});

        assertEquals(user1, user2);
        assertNotEquals(user1, user3);
    }

    @Test
    void testEqualsDifferentValues() {
        UserInfo userInfo1 = new UserInfo("user1", "achieve1", new String[]{"word1"}, new boolean[]{true}, new String[]{"level1"});
        UserInfo userInfo2 = new UserInfo("user2", "achieve2", new String[]{"word2"}, new boolean[]{false}, new String[]{"level2"});
        assertNotEquals(userInfo1, userInfo2);
    }

    @Test
    void testEqualsSameValues() {
        UserInfo userInfo1 = new UserInfo("user", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        UserInfo userInfo2 = new UserInfo("user", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        assertEquals(userInfo1, userInfo2);
    }

    @Test
    void testEqualsNull() {
        UserInfo userInfo = new UserInfo("user", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        assertNotEquals(null, userInfo);
    }

    @Test
    void testEqualsSameObject() {
        UserInfo userInfo = new UserInfo("user", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        assertEquals(userInfo, userInfo);
    }

}

