package de.neuefische.koheis.backend.charactercards;

import de.neuefische.koheis.backend.chractercards.CharacterCard;
import de.neuefische.koheis.backend.chractercards.CharacterCardRepository;
import de.neuefische.koheis.backend.chractercards.CharacterCardService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class CharacterCardServiceTest {

    CharacterCardRepository characterCardRepository = mock(CharacterCardRepository.class);
    CharacterCardService characterCardService = new CharacterCardService(characterCardRepository);

    @Test
    void getAllCharacterCards_thenReturnEmptyList(){
        //GIVEN
        Mockito.when(characterCardRepository.findAll())
                .thenReturn(Collections.emptyList());

        //WHEN
        List<CharacterCard> actual = characterCardService.getAllCharacterCards();

        //THEN
        verify(characterCardRepository).findAll();
        Assertions.assertThat(actual)
                .isEmpty();
    }

}
