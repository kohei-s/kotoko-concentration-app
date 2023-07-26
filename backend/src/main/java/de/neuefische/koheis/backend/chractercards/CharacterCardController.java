package de.neuefische.koheis.backend.chractercards;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/character_cards")
public class CharacterCardController {

    private final CharacterCardService characterCardService;

    public CharacterCardController(CharacterCardService characterCardService){
        this.characterCardService = characterCardService;
    }

    @GetMapping("/cards")
    public List<CharacterCard> getAllCharacterCards(){
        return this.characterCardService.getAllCharacterCards();
    }

}
