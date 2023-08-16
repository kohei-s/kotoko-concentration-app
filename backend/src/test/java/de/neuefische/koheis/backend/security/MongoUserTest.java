package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class MongoUserTest {

    @Test
    void testEqualsAndHashCode() {
        MongoUser user1 = new MongoUser("1", "test1", "password123", "a1", new String[]{"apple", "banana", "cherry"});
        MongoUser user2 = new MongoUser("1", "test1", "password123", "a1", new String[]{"apple", "banana", "cherry"});
        MongoUser user3 = new MongoUser("2", "test2", "password456", "a2", new String[]{"dog", "cat", "bird"});

        assertEquals(user1, user2);
        assertNotEquals(user1, user3);
    }

    @Test
    void testToString() {
        MongoUser user = new MongoUser("1", "test", "password123", "a1", new String[]{"apple", "banana", "cherry"});
        String expectedString = "MongoUser{" +
                "id='1', " +
                "username='test', " +
                "password='password123', " +
                "achievement='a1', " +
                "wordbook=[apple, banana, cherry]" +
                '}';

        assertEquals(expectedString, user.toString());
    }
}

