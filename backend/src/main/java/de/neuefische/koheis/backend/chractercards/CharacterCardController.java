package de.neuefische.koheis.backend.chractercards;

import org.springframework.http.HttpStatus;
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

    @GetMapping("/{id}")
    public CharacterCard getOneCharacterCardById(@PathVariable String id){
        return characterCardService.getOneCharacterCardById(id);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CharacterCard addCharacterCard(@RequestBody CharacterCardWithoutId characterCardWithoutId){
        return characterCardService.addCharacterCard(characterCardWithoutId);
    }

}
