package de.neuefische.koheis.backend.playingcards;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayingCardsRepository extends MongoRepository<PlayingCardsGrid, String> {

    PlayingCardsDeck playingCardsDeck = new PlayingCardsDeck();

    default PlayingCard[][] getPlayingCardsGrid(String gameSize){
        return playingCardsDeck.getPlayingCardsGrid(gameSize);
    }

}
