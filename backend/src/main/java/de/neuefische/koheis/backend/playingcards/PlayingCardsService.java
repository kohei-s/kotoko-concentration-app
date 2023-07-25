package de.neuefische.koheis.backend.playingcards;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayingCardsService {
    private final PlayingCards playingCards = new PlayingCards();

    // "small": 2 names & 6 numbers / "medium": 2 names & 13 numbers / "large": 4 names & 13 numbers
    public List<String> getPlayingCards(String gameSize){
        return playingCards.getPlayingCards(gameSize);
    }
}
