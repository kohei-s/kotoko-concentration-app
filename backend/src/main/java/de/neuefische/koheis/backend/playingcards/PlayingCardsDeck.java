package de.neuefische.koheis.backend.playingcards;

import org.springframework.stereotype.Component;
import java.util.*;
import static java.util.Collections.shuffle;

@Component
public class PlayingCardsDeck {

    public List<PlayingCard> createPlayingCards(String gameSize) {
        List<String> suits = new ArrayList<>(List.of("♥", "♠", "♣", "♦"));
        List<String> numbers = new ArrayList<>(List.of("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"));
        List<PlayingCard> playingCards = new ArrayList<>();

        // "small": 2 names & 6 numbers / "medium": 2 names & 13 numbers / "large": 4 names & 13 numbers
        int indexOfNumbers = ((gameSize.equals("small")) ? 6 : 13);
        int indexOfNames = ((gameSize.equals("large")) ? 4 : 2);

        for (String suit : suits.subList(0, indexOfNames)) {
            for (String number : numbers.subList(0, indexOfNumbers)) {
                PlayingCard card = new PlayingCard(suit, number);
                playingCards.add(card);
            }
        }

        Collections.shuffle(playingCards);
        return playingCards;
    }

    public PlayingCard[][] getPlayingCardsGrid(String gameSize) {
        int indexOfColumn = 0;
        switch (gameSize) {
            case "large" -> indexOfColumn = 13;
            case "medium" -> indexOfColumn = 7;
            default -> indexOfColumn = 4;
        }
        PlayingCard[][] playingCardGrid = new PlayingCard[4][indexOfColumn];
        PlayingCardsDeck deck = new PlayingCardsDeck();
        List<PlayingCard> playingCards = deck.createPlayingCards(gameSize);
        playingCards.addAll(List.copyOf(playingCards));
        PlayingCard emptyCard = new PlayingCard("empty", "empty");
        if (gameSize.equals("medium")) {
            playingCards.add(emptyCard);
            playingCards.add(emptyCard);
        }
        shuffle(playingCards);
        int k = 0;
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < indexOfColumn; j++) {
                playingCardGrid[i][j] = playingCards.get(k);
                k++;
            }
        }

        return playingCardGrid;
    }

}
