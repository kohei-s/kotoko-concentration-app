package de.neuefische.koheis.backend.security;

import java.util.List;

public record UserInfo (
    String username,
    String achievement,
    List<String> wordbook,
    List<Boolean> diacritics,
    List<String> levels

){
}
