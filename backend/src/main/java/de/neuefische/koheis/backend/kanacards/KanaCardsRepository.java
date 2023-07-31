package de.neuefische.koheis.backend.kanacards;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface KanaCardsRepository extends MongoRepository<KanaCards, String> {
    KanaCards kanaCards = new KanaCards();

    default Map<String, String> getRandomFourHiraganaCards(){
        return kanaCards.getRandomFourHiraganaCards();
    }

    default Map<String, String> getRandomFourKatakanaCards(){
        return kanaCards.getRandomFourKatakanaCards();
    }

}
