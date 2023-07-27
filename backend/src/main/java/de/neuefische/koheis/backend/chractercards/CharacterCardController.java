package de.neuefische.koheis.backend.chractercards;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/character_cards")
public class CharacterCardController {

    private final CharacterCardService characterCardService;

    public CharacterCardController(CharacterCardService characterCardService){
        this.characterCardService = characterCardService;
    }

    @GetMapping
    public List<CharacterCard> getAllCharacterCards(){
        return this.characterCardService.getAllCharacterCards();
    }

    @PostMapping
    public CharacterCard addCharacterCard(@RequestBody CharacterCardWithoutId characterCardWithoutId){
        return characterCardService.addCharacterCard(characterCardWithoutId);
    }

}