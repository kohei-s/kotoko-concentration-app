package de.neuefische.koheis.backend.playingcards;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlayingCardsService {
    private final PlayingCardsRepository playingCardsRepository;

    PlayingCardsService(PlayingCardsRepository playingCardsRepository) {
        this.playingCardsRepository = playingCardsRepository;
    }

    // "small": 2 names & 6 numbers / "medium": 2 names & 13 numbers / "large": 4 names & 13 numbers
    public List<String> getPlayingCards(String gameSize){
        return playingCardsRepository.getPlayingCards(gameSize);
    }

    public boolean checkMatchOfSelectedPlayingCards(List<String> twoCards) {
        return playingCardsRepository.checkMatchOfSelectedPlayingCards(twoCards);
    }
}