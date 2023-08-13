package de.neuefische.koheis.backend.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;


@Service
public class MongoUserDetailsService implements UserDetailsService {

    private final MongoUserRepository mongoUserRepository;

    public MongoUserDetailsService(MongoUserRepository mongoUserRepository) {
        this.mongoUserRepository = mongoUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username:" + username + " not found!"));

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(mongoUser.getAchievement()));
        for (String role : mongoUser.getWordbook()) {
            authorities.add(new SimpleGrantedAuthority(role));
        }

        return User.builder()
                .username(mongoUser.username())
                .password(mongoUser.password())
                .authorities(authorities)
                .build();
    }

}
