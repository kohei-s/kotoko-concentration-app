package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class UserNotFoundExceptionTest {
    @Test
    void testConstructor() {
        String errorMessage = "User not found!";
        UserNotFoundException exception = new UserNotFoundException(errorMessage);

        assertEquals(errorMessage, exception.getMessage());
    }
}
