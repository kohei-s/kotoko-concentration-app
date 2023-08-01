package de.neuefische.koheis.backend.kanacards;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("cardGrid")
public class KanaCardsGrid {
    KanaCard[][] cardsGrid;
}

