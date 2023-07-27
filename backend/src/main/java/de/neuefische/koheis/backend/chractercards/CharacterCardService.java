package de.neuefische.koheis.backend.chractercards;

import org.springframework.stereotype.Service;

import java.util.List;

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

    public CharacterCard addCharacterCard(CharacterCardWithoutId characterCardWithoutId){
        return characterCardRepository.insert(new CharacterCard(idService.createRandomId(), characterCardWithoutId.getCharacter()));
    }

}
