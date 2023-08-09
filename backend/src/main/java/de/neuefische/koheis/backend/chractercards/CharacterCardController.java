package de.neuefische.koheis.backend.chractercards;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/character_cards")
public class CharacterCardController {

    private final CharacterCardService characterCardService;

    public CharacterCardController(CharacterCardService characterCardService) {
        this.characterCardService = characterCardService;
    }

//    @GetMapping
    public List<CharacterCard> getAllCharacterCards() {
        return this.characterCardService.getAllCharacterCards();
    }

//    @GetMapping("/{id}")
    public ResponseEntity<CharacterCard> getOneCharacterCardById(@PathVariable("id") String id) {
        try {
            CharacterCard getedCharacterCard = characterCardService.getOneCharacterCardById(id);
            return ResponseEntity.ok(getedCharacterCard);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

//    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CharacterCard addCharacterCard(@RequestBody CharacterCardWithoutId characterCardWithoutId) {
        return characterCardService.addCharacterCard(characterCardWithoutId);
    }

//    @PutMapping("/{id}")
    public ResponseEntity<CharacterCard> updateCharacterCard(@PathVariable("id") String id, @RequestBody CharacterCardWithoutId characterCardWithoutId) {
        try {
            CharacterCard updatedCharacterCard = characterCardService.updateCharacterCard(characterCardWithoutId, id);
            return ResponseEntity.ok(updatedCharacterCard);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

//    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCharacterCard(@PathVariable("id") String id) {
        try {
            characterCardService.deleteCharacterCard(id);
            return ResponseEntity.ok("Character is deleted successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
