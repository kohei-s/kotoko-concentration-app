package de.neuefische.koheis.backend.gamegcards;

import de.neuefische.koheis.backend.idservice.IdService;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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

    public GameCard getGameCardById(String id){

        return gameCardsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("CharacterCard with id:" + id + " is not found!"));
    }

    public List<GameCard> findByCardSetName(String cardSetName){
        List<GameCard> gameCardList = gameCardsRepository.findAll();

        return gameCardList.stream().filter(card -> cardSetName.equals(card.getCardSetName())).toList();
    }
    
    public int[] setIndexOfRowAndColumn (String gameSize){
        int[] rowAndColumn = new int[2];
        if (gameSize.equals("large")){
            rowAndColumn[0] = 4;
            rowAndColumn[1] = 4;
        } else if (gameSize.equals("medium")){
            rowAndColumn[0] = 3;
            rowAndColumn[1] = 4;
        } else {
            rowAndColumn[0] = 3;
            rowAndColumn[1] = 3;
        }

        return  rowAndColumn;
    }

    public GameCardsGrid getGameCardsGrid(String gameSize, String cardSetName) {
        List<GameCard> gameCardList = findByCardSetName(cardSetName);
        GameCard[][] gameCardBoard = generateGameBoard(gameSize, gameCardList);
        int[] rowAndColumn = setIndexOfRowAndColumn(gameSize);
        boolean[][] isMatched = new boolean[rowAndColumn[0]][rowAndColumn[1]];

        for (int i = 0; i < rowAndColumn[0]; i++) {
            for (int j = 0; j < rowAndColumn[1]; j++) {
                isMatched[i][j] = false;
            }
        }

        return new GameCardsGrid(idService.createRandomId(), gameCardBoard, isMatched);
    }

    public GameCard[][] generateGameBoard(String gameSize, List<GameCard> allGameCards) {
        int pairing;
        switch (gameSize) {
            case "small" -> pairing = 4;
            case "medium" -> pairing = 6;
            default -> pairing = 8;
        }
        int[] rowAndColumn = setIndexOfRowAndColumn(gameSize);
        GameCard[][] gameCardGrid = new GameCard[rowAndColumn[0]][rowAndColumn[1]];
        List<GameCard> gameCards = new ArrayList<>(allGameCards.subList(0, pairing));
        gameCards.addAll(List.copyOf(gameCards));
        GameCard emptyCard = new GameCard(idService.createRandomId(), "empty", "empty");
        if (gameSize.equals("small")) {
            gameCards.add(emptyCard);
        }
        shuffle(gameCards);
        int k = 0;
        for (int i = 0; i < rowAndColumn[0]; i++) {
            for (int j = 0; j < rowAndColumn[1]; j++) {
                gameCardGrid[i][j] = gameCards.get(k);
                k++;
            }
        }

        return gameCardGrid;
    }

    public GameCard addGameCard (GameCardWithoutId gameCardWithoutId) {

        return gameCardsRepository.insert(new GameCard(idService.createRandomId(), gameCardWithoutId.getTitle(), gameCardWithoutId.getCardSetName()));
    }

    public GameCard updateGameCard(GameCardWithoutId gameCardWithoutId, String id){
        if (!gameCardsRepository.existsById(id)) throw new NoSuchElementException();

        return gameCardsRepository.save(new GameCard(id, gameCardWithoutId.getTitle(), gameCardWithoutId.getCardSetName()));
    }

    public void deleteGameCard(String id){
        if (!gameCardsRepository.existsById(id)) throw new NoSuchElementException();

        gameCardsRepository.deleteById(id);
    }

}
