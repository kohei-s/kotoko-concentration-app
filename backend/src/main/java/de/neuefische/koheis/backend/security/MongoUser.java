package de.neuefische.koheis.backend.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Arrays;
import java.util.Objects;

@Document("users")
public record MongoUser(
        @Id
        String id,
        String username,
        String password,
        String achievement,
        String[] wordbook
) {

        public String getAchievement() {
                return achievement;
        }

        public String[] getWordbook() {
                return wordbook;
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                MongoUser mongoUser = (MongoUser) o;
                return Objects.equals(id, mongoUser.id) && Objects.equals(username, mongoUser.username) && Objects.equals(password, mongoUser.password) && Objects.equals(achievement, mongoUser.achievement) && Arrays.equals(wordbook, mongoUser.wordbook);
        }

        @Override
        public int hashCode() {
                int result = Objects.hash(id, username, password, achievement);
                result = 31 * result + Arrays.hashCode(wordbook);
                return result;
        }

        @Override
        public String toString() {
                return "MongoUser{" +
                        "id='" + id + '\'' +
                        ", username='" + username + '\'' +
                        ", password='" + password + '\'' +
                        ", achievement='" + achievement + '\'' +
                        ", wordbook=" + Arrays.toString(wordbook) +
                        '}';
        }
}
