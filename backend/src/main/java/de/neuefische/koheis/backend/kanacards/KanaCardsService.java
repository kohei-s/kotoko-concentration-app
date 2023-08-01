package de.neuefische.koheis.backend.kanacards;

import org.springframework.stereotype.Service;

@Service
public class KanaCardsService {
    private final KanaCardsRepository kanaCardsRepository;

    public KanaCardsService(KanaCardsRepository kanaCardsRepository) {
        this.kanaCardsRepository = kanaCardsRepository;
    }

    public KanaCardsGrid getNineByNineKanaCardsGrid(){
        return kanaCardsRepository.getNineByNineKanaCardsGrid();
    }

}
