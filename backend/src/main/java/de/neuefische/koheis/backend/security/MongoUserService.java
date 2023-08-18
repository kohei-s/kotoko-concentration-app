package de.neuefische.koheis.backend.security;

import de.neuefische.koheis.backend.idservice.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;


@Service
@RequiredArgsConstructor
public class MongoUserService {

    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder;

    public UserInfo findByUsername(String username) {
        if (mongoUserRepository.findByUsername(username).isEmpty()) {
            return new UserInfo("Anonymous User", "", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        }
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username:" + username + " not found!"));

        return new UserInfo(mongoUser.username(), mongoUser.achievement(), mongoUser.wordbook(), mongoUser.diacritics(), mongoUser.levels());
    }

    public void registerUser(MongoUserCreation mongoUserWithoutId) {
        if (mongoUserRepository.existsByUsername(mongoUserWithoutId.username())) {
            throw new IllegalArgumentException("User: " + mongoUserWithoutId.username() + " exists already!");
        }

        String encoderPassword = passwordEncoder.encode(mongoUserWithoutId.password());

        MongoUser newUser = new MongoUser(idService.createRandomId(), mongoUserWithoutId.username(), encoderPassword, null, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        mongoUserRepository.insert(newUser);
    }

    public UserInfo updateUserInfo(UserInfo userInfo) {
        MongoUser mongoUser = mongoUserRepository.findByUsername(userInfo.username())
                .orElseThrow(() -> new UsernameNotFoundException("Username:" + userInfo.username() + " is not found!"));

        MongoUser updatedMongoUser = new MongoUser(
                mongoUser.id(),
                userInfo.username(),
                mongoUser.password(),
                userInfo.achievement(),
                userInfo.wordbook(),
                userInfo.diacritics(),
                userInfo.levels()
        );

        MongoUser returnedMongoUser = mongoUserRepository.save(updatedMongoUser);
        return new UserInfo(returnedMongoUser.username(), returnedMongoUser.achievement(), returnedMongoUser.wordbook(), returnedMongoUser.diacritics(), returnedMongoUser.levels());
    }

}
