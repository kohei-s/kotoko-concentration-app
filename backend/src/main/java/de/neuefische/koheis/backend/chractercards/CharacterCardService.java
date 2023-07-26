package de.neuefische.koheis.backend.chractercards;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterCardService {
    private final CharacterCardRepository characterCardRepository;


    public CharacterCardService(CharacterCardRepository characterCardRepository){
        this.characterCardRepository = characterCardRepository;
    }

    public List<CharacterCard> getAllCharacterCards(){
        return this.characterCardRepository.findAll();
    }

}
