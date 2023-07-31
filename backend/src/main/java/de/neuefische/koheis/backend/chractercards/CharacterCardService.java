package de.neuefische.koheis.backend.chractercards;


import de.neuefische.koheis.backend.idservice.IdService;
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
        return this.characterCardRepository.findById(id).orElseThrow(() -> new NoSuchElementException("CharacterCard with id:" + id + " is not found!"));
    }

    public CharacterCard addCharacterCard(CharacterCardWithoutId characterCardWithoutId){
       return characterCardRepository.insert(new CharacterCard(idService.createRandomId(), characterCardWithoutId.getCharacter()));
    }

    public CharacterCard updateCharacterCard(CharacterCardWithoutId characterCardWithoutId, String id){
        if (!characterCardRepository.existsById(id)) throw new NoSuchElementException();
        return characterCardRepository.save(new CharacterCard(id, characterCardWithoutId.getCharacter()));
    }

    public void deleteCharacterCard(String id){
        if (!characterCardRepository.existsById(id)) throw new NoSuchElementException();
        characterCardRepository.deleteById(id);
    }

}
