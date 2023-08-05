package de.neuefische.koheis.backend.kanacards;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/kana_cards")
public class KanaCardsController {

    private final KanaCardsService kanaCardsService;
    public KanaCardsController(KanaCardsService kanaCardsService) {
        this.kanaCardsService = kanaCardsService;
    }

    @GetMapping("/hiragana")
    KanaCardsGrid getNineByNineKanaCardsGrid(){
        return kanaCardsService.getNineByNineKanaCardsGrid("hiragana");
    }

    @GetMapping("/katakana")
    KanaCardsGrid getNineKanaCardsGrid(){
        return kanaCardsService.getNineByNineKanaCardsGrid("katakana");
    }

}
