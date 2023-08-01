package de.neuefische.koheis.backend.kanacards;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class KanaCard {
    private String kana;
    private String reading;
}

