package de.neuefische.koheis.backend.security;

import java.util.Arrays;
import java.util.Objects;

public record UserInfo (
    String username,
    String achievement,
    String[] wordbook
){
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserInfo userInfo = (UserInfo) o;
        return Objects.equals(username, userInfo.username) && Objects.equals(achievement, userInfo.achievement) && Arrays.equals(wordbook, userInfo.wordbook);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(username, achievement);
        result = 31 * result + Arrays.hashCode(wordbook);
        return result;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "username='" + username + '\'' +
                ", achievement='" + achievement + '\'' +
                ", wordbook=" + Arrays.toString(wordbook) +
                '}';
    }
}
