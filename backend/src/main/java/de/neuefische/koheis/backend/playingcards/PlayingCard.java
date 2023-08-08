package de.neuefische.koheis.backend.playingcards;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayingCard {
    private String suit;
    private String number;
}
