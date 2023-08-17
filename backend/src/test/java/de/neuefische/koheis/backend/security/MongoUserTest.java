package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Objects;

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
    void testEqualsNull() {
        MongoUser mongoUser = new MongoUser("id", "user", "pass", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        boolean test1 = mongoUser.equals(null);
        String testObject = "test";
        Class class1 = mongoUser.getClass();
        Class class2 = testObject.getClass();
        boolean test2 = class1.equals(class2);
        boolean test3 = (test1 || test2);
        assertEquals(false, test3);
    }

    @Test
    void testEqualsThis() {
        MongoUser mongoUser = new MongoUser("id", "user", "pass", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        boolean test = mongoUser.equals(mongoUser);
        assertEquals(true, test);
    }

    @Test
    void testEqualsClass() {
        MongoUser mongoUser = new MongoUser("id", "user", "pass", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        String test2 = "test";
        Class class1 = mongoUser.getClass();
        Class class2 = test2.getClass();
        boolean test3 = class1.equals(class2);
        assertEquals(false, test3);
    }

    @Test
    void testEqualsValues() {
        MongoUser mongoUser1 = new MongoUser("12", "user1", "achieve1", "21", new String[]{"word1"}, new boolean[]{true}, new String[]{"level1"});
        MongoUser mongoUser2 = new MongoUser("34", "user2", "achieve2", "31", new String[]{"word2"}, new boolean[]{false}, new String[]{"level2"});
        boolean test = Objects.equals(mongoUser1.username(), mongoUser2.username())
                && Objects.equals(mongoUser1.achievement(), mongoUser2.achievement() )
                && Arrays.equals(mongoUser1.wordbook(), mongoUser2.wordbook())
                && Arrays.equals(mongoUser1.diacritics(), mongoUser2.diacritics())
                && Arrays.equals(mongoUser1.levels(), mongoUser2.levels());
        boolean test2 = mongoUser1.equals(mongoUser2);
        assertEquals(test, test2);
    }

    @Test
    void testEqualsSame() {
        MongoUser obj = new MongoUser("12", "user1", "achieve1", "21", new String[]{"word1"}, new boolean[]{true}, new String[]{"level1"});
        assertTrue(obj.equals(obj));
    }

    @Test
    public void testEqualsNullObject() {
        MongoUser obj = new MongoUser("12", "user1", "achieve1", "21", new String[]{"word1"}, new boolean[]{true}, new String[]{"level1"});
        assertFalse(obj.equals(null));
    }

    @Test
    public void testEqualsDifferentClass() {
        MongoUser obj = new MongoUser("12", "user1", "achieve1", "21", new String[]{"word1"}, new boolean[]{true}, new String[]{"level1"});
        assertFalse(obj.equals("Hello"));
    }

    @Test
    public void testEqualsSameClassDifferentInstances() {
        MongoUser obj1 = new MongoUser("12", "user1", "achieve1", "21", new String[]{"word1"}, new boolean[]{true}, new String[]{"level1"});
        MongoUser obj2 = new MongoUser("12", "user1", "achieve1", "21", new String[]{"word1"}, new boolean[]{true}, new String[]{"level1"});
        assertTrue(obj1.equals(obj2));
    }

    @Test
    public void testEqualsDifferentClassInstances() {
        MongoUser obj = new MongoUser("12", "user1", "achieve1", "21", new String[]{"word1"}, new boolean[]{true}, new String[]{"level1"});
        UserInfo other = new UserInfo("user", "achieve", new String[]{"word"}, new boolean[]{true}, new String[]{"level"});
        assertFalse(obj.equals(other));
    }

}

