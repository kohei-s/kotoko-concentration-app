package de.neuefische.koheis.backend.kanacards;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KanaCardsRepository extends MongoRepository<KanaCardsDeck, String> {
    KanaCardsDeck kanaCardsDeck = new KanaCardsDeck();

    default KanaCard[][] getNineByNineKanaCardsGrid(String kanaType){
        return kanaCardsDeck.getNineByNineKanaCardsGrid(kanaType);
    }

}
