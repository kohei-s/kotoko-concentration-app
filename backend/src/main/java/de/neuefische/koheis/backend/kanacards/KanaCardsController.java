package de.neuefische.koheis.backend.kanacards;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/kana_cards")
public class KanaCardsController {

    private final KanaCardsService kanaCardsService;

    public KanaCardsController(KanaCardsService kanaCardsService) {
        this.kanaCardsService = kanaCardsService;
    }

    @GetMapping("/hiragana")
    Map<String, String> getRandomFourHiraganaCards(){
        return kanaCardsService.getRandomFourHiraganaCards();
    }

    @GetMapping("/katakana")
    Map<String, String> getRandomFourKatakanaCards(){
        return kanaCardsService.getRandomFourKatakanaCards();
    }

}
