package de.neuefische.koheis.backend.kanacards;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class KanaCardsService {
    private final KanaCardsRepository kanaCardsRepository;

    public KanaCardsService(KanaCardsRepository kanaCardsRepository) {
        this.kanaCardsRepository = kanaCardsRepository;
    }

    public Map<String, String> getRandomFourHiraganaCards(){
        return kanaCardsRepository.getRandomFourHiraganaCards();
    }

    public Map<String, String> getRandomFourKatakanaCards(){
        return kanaCardsRepository.getRandomFourKatakanaCards();
    }

}
