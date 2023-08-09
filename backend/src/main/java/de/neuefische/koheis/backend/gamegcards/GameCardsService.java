package de.neuefische.koheis.backend.gamegcards;

import de.neuefische.koheis.backend.idservice.IdService;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import static java.util.Collections.shuffle;

@Service
public class GameCardsService {
    private final GameCardsRepository gameCardsRepository;
    private final IdService idService;

    GameCardsService(GameCardsRepository gameCardsRepository, IdService idService) {
        this.gameCardsRepository = gameCardsRepository;
        this.idService = idService;
    }

    public List<GameCard> getAllGameCards(){
        
        return gameCardsRepository.findAll();
    }

    public List<GameCard> findByCardSetName(String cardSetName){
        List<GameCard> gameCardList = gameCardsRepository.findAll();

        return gameCardList.stream().filter(card -> cardSetName.equals(card.getCardSetName())).toList();
    }

    // "small": 2 names & 6 numbers / "medium": 2 names & 13 numbers / "large": 4 names & 13 numbers
    public GameCardsGrid getGameCardsGrid(String gameSize, String cardSetName) {

        List<GameCard> gameCardList = findByCardSetName(cardSetName);
        GameCard[][] gameCardBoard = generateGameBoard(gameSize, gameCardList);

        int indexOfRow;
        switch (gameSize) {
            case "large" -> indexOfRow = 13;
            case "small" -> indexOfRow = 3;
            default -> indexOfRow = 7;
        }
        boolean[][] isMatched = new boolean[indexOfRow][4];
        for (int i = 0; i < indexOfRow; i++) {
            for (int j = 0; j < 4; j++) {
                isMatched[i][j] = false;
            }
        }

        return new GameCardsGrid(idService.createRandomId(), gameCardBoard, isMatched);
    }

    public GameCard[][] generateGameBoard(String gameSize, List<GameCard> allGameCards) {
        int indexOfRow;
        switch (gameSize) {
            case "large" -> indexOfRow = 13;
            case "small" -> indexOfRow = 3;
            default -> indexOfRow = 7;
        }
        GameCard[][] gameCardGrid = new GameCard[indexOfRow][4];
        List<GameCard> gameCards = new ArrayList<>(allGameCards.subList(0, indexOfRow * 2));
        gameCards.addAll(List.copyOf(gameCards));
        GameCard emptyCard = new GameCard(idService.createRandomId(), "empty", "empty");
        if (gameSize.equals("medium")) {
            gameCards.add(emptyCard);
            gameCards.add(emptyCard);
        }
        shuffle(gameCards);
        int k = 0;
        for (int i = 0; i < indexOfRow; i++) {
            for (int j = 0; j < 4; j++) {
                gameCardGrid[i][j] = gameCards.get(k);
                k++;
            }
        }

        return gameCardGrid;
    }

    public GameCard addGameCard (GameCardWithoutId gameCardWithoutId) {
        return gameCardsRepository.insert(new GameCard(idService.createRandomId(), gameCardWithoutId.getTitle(), gameCardWithoutId.getCardSetName()));
    }

}
