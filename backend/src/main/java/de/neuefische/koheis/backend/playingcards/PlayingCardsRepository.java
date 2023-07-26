package de.neuefische.koheis.backend.playingcards;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayingCardsRepository extends MongoRepository<PlayingCards, String> {

    PlayingCards playingCards = new PlayingCards();

    default List<String> getPlayingCards(String gameSize){
        return playingCards.getPlayingCards(gameSize);
    }

    default boolean checkMatchOfSelectedPlayingCards(List<String> twoCards) {
        return playingCards.checkMatchOfSelectedPlayingCards(twoCards);
    }


}
