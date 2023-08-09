package de.neuefische.koheis.backend.gamegcards;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game_cards")
public class GameCardsController {

    private final GameCardsService gameCardsService;

    GameCardsController(GameCardsService gameCardsService) {
        this.gameCardsService = gameCardsService;
    }

    @GetMapping("/all")
    List<GameCard> getAllGameCards() {
        return gameCardsService.getAllGameCards();
    }

    @GetMapping
    GameCardsGrid getGameCardsSet(@RequestParam String size, @RequestParam String name) {
        return gameCardsService.getGameCardsGrid(size, name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    GameCard addGameCard(@RequestBody GameCardWithoutId gameCardWithoutId) {
        return gameCardsService.addGameCard(gameCardWithoutId);
    }

}
