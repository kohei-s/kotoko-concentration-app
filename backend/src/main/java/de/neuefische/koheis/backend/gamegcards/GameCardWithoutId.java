package de.neuefische.koheis.backend.gamegcards;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameCardWithoutId {
    private String title;
    private String cardSetName;

}
