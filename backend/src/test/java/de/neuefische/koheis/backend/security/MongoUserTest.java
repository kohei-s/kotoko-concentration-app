package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class MongoUserTest {

    @Test
    void testEqualsAndHashCode() {
        MongoUser user1 = new MongoUser("1", "test1", "password123", "8", new String[]{"h1", "k2", "c3"});
        MongoUser user2 = new MongoUser("1", "test1", "password123", "8", new String[]{"h1", "k2", "c3"});
        MongoUser user3 = new MongoUser("2", "test2", "password456", "10", new String[]{"h2", "k3", "c4"});

        assertEquals(user1, user2);
        assertNotEquals(user1, user3);
    }

    @Test
    void testToString() {
        MongoUser user = new MongoUser("1", "test", "password123", "8", new String[]{"h1", "k2", "c3"});
        String expectedString = "MongoUser{" +
                "id='1', " +
                "username='test', " +
                "password='password123', " +
                "achievement='8', " +
                "wordbook=[h1, k2, c3]" +
                '}';

        assertEquals(expectedString, user.toString());
    }

    @Test
    void testHashCode() {
        MongoUser user1 = new MongoUser("1", "test", "password123", "8", new String[]{"h1", "k2", "c3"});
        MongoUser user2 = new MongoUser("1", "test", "password123", "8", new String[]{"h1", "k2", "c3"});

        assertEquals(user1.hashCode(), user2.hashCode());
    }

}

