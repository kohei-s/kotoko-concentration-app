package de.neuefische.koheis.backend.playingcards;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

public class PlayingCards {
    public List<String> getPlayingCards(String gameSize) {
        ArrayList<String> names = new ArrayList<>(List.of("heart", "spade", "diamond", "club"));
        ArrayList<String> numbers = new ArrayList<>(List.of("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"));
        ArrayList<String> playingCards = new ArrayList<>();

        // "small": 2 names & 6 numbers / "medium": 2 names & 13 numbers / "large": 4 names & 13 numbers
        int indexOfNumbers = ((gameSize.equals("small")) ? 6 : 13);
        int indexOfNames = ((gameSize.equals("large")) ? 4 : 2);

        for (String name : names.subList(0, indexOfNames)) {
            for (String number : numbers.subList(0, indexOfNumbers)) {
                String card = name + "-" + number;
                playingCards.add(card);
            }
        }

        Collections.shuffle(playingCards);
        return playingCards;
    }

    public boolean checkMatchOfSelectedPlayingCards(String card1, String card2) {
        Pattern numbers = Pattern.compile("\\d{1,2}");
        String cardNumber1 = String.valueOf(numbers.matcher(card1));
        String cardNumber2 = String.valueOf(numbers.matcher(card2));

        return (cardNumber1.equals(cardNumber2));
    }

}
