package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MongoUserTest {

    @Test
    void testEqualsAndHashCode() {
        MongoUser user1 = new MongoUser("1", "test1", "password123", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        MongoUser user2 = new MongoUser("1", "test1", "password123", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        MongoUser user3 = new MongoUser("2", "test2", "password456", "10", new String[]{"h2", "k3", "c4"}, new boolean[]{true, true}, new String[]{"medium", "large", "small", "small"});

        assertEquals(user1, user2);
        assertNotEquals(user1, user3);
    }

    @Test
    void testToString() {
        MongoUser user = new MongoUser("1", "test", "password123", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        String expectedString = "MongoUser{" +
                "id='1', " +
                "username='test', " +
                "password='password123', " +
                "achievement='8', " +
                "wordbook=[h1, k2, c3], " +
                "diacritics=[false, false], " +
                "levels=[small, small, small, small]" +
                '}';

        assertEquals(expectedString, user.toString());
    }

    @Test
    void testHashCode() {
        MongoUser user1 = new MongoUser("1", "test", "password123", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        MongoUser user2 = new MongoUser("1", "test", "password123", "8", new String[]{"h1", "k2", "c3"}, new boolean[]{false, false}, new String[]{"small", "small", "small", "small"});
        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    void testEqualsDifferentValues() {
        MongoUser mongoUser1 = new MongoUser("id1", "user1", "pass1", "achieve1", new String[]{"word1"}, new boolean[]{true}, new String[]{"level1"});
        MongoUser mongoUser2 = new MongoUser("id2", "user2", "pass2", "achieve2", new String[]{"word2"}, new boolean[]{false}, new String[]{"level2"});
        assertNotEquals(mongoUser1, mongoUser2);
    }

    @Test
    void testEqualsSameValues() {
        MongoUser mongoUser1 = new MongoUser("id", "user", "pass", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        MongoUser mongoUser2 = new MongoUser("id", "user", "pass", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        assertEquals(mongoUser1, mongoUser2);
    }

    @Test
    void testEqualsSameObject() {
        MongoUser mongoUser = new MongoUser("id", "user", "pass", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        assertSame(mongoUser, mongoUser);
    }

    @Test
    void testEqualsNull() {
        MongoUser mongoUser = new MongoUser("id", "user", "pass", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        assertNotSame(null, mongoUser);
    }

}

