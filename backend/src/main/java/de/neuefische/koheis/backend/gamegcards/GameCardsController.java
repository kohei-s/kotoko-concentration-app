package de.neuefische.koheis.backend.gamegcards;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/playing_cards")
public class GameCardsController {

    private final GameCardsService gameCardsService;

    GameCardsController(GameCardsService gameCardsService){
        this.gameCardsService = gameCardsService;
    }

    @GetMapping()
    GameCardsGrid getPlayingCards(@RequestParam String size, @RequestParam String name){
        return gameCardsService.getPlayingCardsGrid(size, name) ;
    }

}
