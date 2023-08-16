package de.neuefische.koheis.backend.security;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.Optional;
import static org.mockito.Mockito.*;


class MongoUserDetailsServiceTest {

    MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);

    @Test
    void testLoadUserByUsername() {
        //GIVEN
        MongoUser mockUser = new MongoUser("1", "test", "1234", "5678", new String[]{"a", "i", "u"});

        //WHEN
        Mockito.when(mongoUserRepository.findByUsername("test")).thenReturn(Optional.of(mockUser));
        UserDetails userDetails = mongoUserDetailsService.loadUserByUsername("test");

        //THEN
        assertEquals("test", userDetails.getUsername());
        assertEquals("1234", userDetails.getPassword());
        String[] expected = {"5678", "a", "i", "u"};
        String[] actual = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toArray(String[]::new);
        assertArrayEquals(expected, actual);
    }

    @Test
    @WithUserDetails("unknownuser")
    void testLoadUserByUsername_UserNotFound() {
        //WHEN
        when(mongoUserRepository.findByUsername(anyString())).thenReturn(Optional.empty());

        //THEN
        Assertions.assertThrows(UsernameNotFoundException.class,
                () -> mongoUserDetailsService.loadUserByUsername("unknownuser"));
    }
}
