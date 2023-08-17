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
        String[] wordbook,

        boolean[] diacritics,

        String[] levels
) {

        public String getAchievement() {
                return achievement;
        }

        public String[] getWordbook() {
                return wordbook;
        }

        public boolean[] getDiacritics() {return diacritics;}

        public String[] getLevels() {return levels;}

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                MongoUser mongoUser = (MongoUser) o;
                return Objects.equals(id, mongoUser.id) && Objects.equals(username, mongoUser.username) && Objects.equals(password, mongoUser.password) && Objects.equals(getAchievement(), mongoUser.getAchievement()) && Arrays.equals(getWordbook(), mongoUser.getWordbook()) && Arrays.equals(getDiacritics(), mongoUser.getDiacritics()) && Arrays.equals(getLevels(), mongoUser.getLevels());
        }

        @Override
        public int hashCode() {
                int result = Objects.hash(id, username, password, getAchievement());
                result = 31 * result + Arrays.hashCode(getWordbook());
                result = 31 * result + Arrays.hashCode(getDiacritics());
                result = 31 * result + Arrays.hashCode(getLevels());
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
                        ", diacritics=" + Arrays.toString(diacritics) +
                        ", levels=" + Arrays.toString(levels) +
                        '}';
        }
}
