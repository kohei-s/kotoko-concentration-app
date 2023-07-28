package de.neuefische.koheis.backend.chractercards;


import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CharacterCardService {

    private final CharacterCardRepository characterCardRepository;
    private final IdService idService;

    public CharacterCardService(CharacterCardRepository characterCardRepository, IdService idService){
        this.characterCardRepository = characterCardRepository;
        this.idService = idService;
    }

    public List<CharacterCard> getAllCharacterCards(){
        return this.characterCardRepository.findAll();
    }

    public CharacterCard getOneCharacterCardById(String id){
        return this.characterCardRepository.findById(id).orElseThrow(() -> new NoSuchElementException("CharacterCard with id:" + id + " not found!"));
    }

    public CharacterCard addCharacterCard(CharacterCardWithoutId characterCardWithoutId){
       return characterCardRepository.insert(new CharacterCard(idService.createRandomId(), characterCardWithoutId.getCharacter()));
    }

}
