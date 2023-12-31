package de.neuefische.koheis.backend.gamegcards;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameCardWithoutAuthorId {
    private String title;
    private String reading;
    private String cardSetName;
}
