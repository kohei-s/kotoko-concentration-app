package de.neuefische.koheis.backend.security;

import de.neuefische.koheis.backend.idservice.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MongoUserService {

    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;

    public UserInfo findByUsername(String username) {
        if (mongoUserRepository.findByUsername(username).isEmpty()) {
            return new UserInfo("Anonymous User", "", new String[]{});
        }
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username:" + username + " not found!"));

        return new UserInfo(mongoUser.username(), mongoUser.achievement(), mongoUser.wordbook());
    }

    public void registerUser(MongoUserCreation mongoUserWithoutId) {
        if (mongoUserRepository.findByUsername(mongoUserWithoutId.username()).isPresent()) {
            throw new IllegalArgumentException("User: " + mongoUserWithoutId.username() + " exists already!");
        }

        PasswordEncoder encoder = new Argon2PasswordEncoder(16, 32, 8, 1 << 16 ,4);
        String encoderPassword = encoder.encode(mongoUserWithoutId.password());

        MongoUser newUser = new MongoUser(idService.createRandomId(), mongoUserWithoutId.username(), encoderPassword, "", new String[]{""});
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
                userInfo.wordbook());

        MongoUser returnedMongoUser = mongoUserRepository.save(updatedMongoUser);
        return new UserInfo(returnedMongoUser.username(), returnedMongoUser.achievement(), returnedMongoUser.wordbook());
    }

}
