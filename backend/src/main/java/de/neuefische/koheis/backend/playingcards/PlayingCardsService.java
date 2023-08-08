package de.neuefische.koheis.backend.playingcards;

import de.neuefische.koheis.backend.idservice.IdService;
import org.springframework.stereotype.Service;

@Service
public class PlayingCardsService {
    private final PlayingCardsRepository playingCardsRepository;
    private final IdService idService;

    PlayingCardsService(PlayingCardsRepository playingCardsRepository, IdService idService) {
        this.playingCardsRepository = playingCardsRepository;
        this.idService = idService;
    }

    // "small": 2 names & 6 numbers / "medium": 2 names & 13 numbers / "large": 4 names & 13 numbers
    public PlayingCardsGrid getPlayingCardsGrid(String gameSize){
       PlayingCard[][] playingCardsGridWithoutId = playingCardsRepository.getPlayingCardsGrid(gameSize);
        int indexOfColumn;
        switch (gameSize) {
            case "large" -> indexOfColumn = 13;
            case "medium" -> indexOfColumn = 7;
            default -> indexOfColumn = 4;
        }
        boolean [][] isMatched = new boolean[4][indexOfColumn];
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < indexOfColumn; j++) {
               isMatched[i][j] = false;
            }
        }

        return new PlayingCardsGrid(idService.createRandomId(), playingCardsGridWithoutId, isMatched);
    }

}
