package de.neuefische.koheis.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MongoUserService {

    private MongoUserRepository mongoUserRepository;

    public UserInfo findByUsername(String username) {
        if (mongoUserRepository.findByUsername(username).isEmpty()) {
            return new UserInfo("Anonymous User", "unknown", new String[]{"unknown"});
        }
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username:" + username + " not found!"));

        return new UserInfo(mongoUser.username(), mongoUser.achievement(), mongoUser.wordbook());
    }

    public UserInfo updateUserInfo(UserInfo userInfo) {
        MongoUser mongoUser = mongoUserRepository.findByUsername(userInfo.username())
                .orElseThrow(() -> new UsernameNotFoundException("Username:" + userInfo.username() + " not found!"));

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
