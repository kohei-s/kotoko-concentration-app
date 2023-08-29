package de.neuefische.koheis.backend.gamegcards;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

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

    @GetMapping("/myAll")
    List<GameCard> getAllMyGameCards() {

        return gameCardsService.getAllMyGameCards();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameCard> getGameCardById(@PathVariable("id") String id) {
        try {
            GameCard getedGameCard = gameCardsService.getGameCardById(id);
            return ResponseEntity.ok(getedGameCard);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    GameCardsGrid getGameCardsSet(@RequestParam String size, @RequestParam String name) {

        return gameCardsService.getGameCardsGrid(size, name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    GameCard addGameCard(@Valid @RequestBody GameCardWithoutAuthorId gameCardWithoutAuthorId) {

        return gameCardsService.addGameCard(gameCardWithoutAuthorId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameCard> updateGameCard(@PathVariable("id") String id, @Valid @RequestBody GameCardWithoutId gameCardWithoutId) {
        try {
            GameCard updatedGameCard = gameCardsService.updateGameCard(gameCardWithoutId, id);
            return ResponseEntity.ok(updatedGameCard);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGameCard(@PathVariable("id") String id) {
        try {
            gameCardsService.deleteGameCard(id);
            return ResponseEntity.ok("Card is deleted successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
