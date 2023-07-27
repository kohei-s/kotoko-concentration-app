package de.neuefische.koheis.backend.charactercards;

import de.neuefische.koheis.backend.chractercards.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import java.util.Collections;
import java.util.List;
import static org.mockito.Mockito.*;

class CharacterCardServiceTest {

    CharacterCardRepository characterCardRepository = mock(CharacterCardRepository.class);
    IdService idService = mock(IdService.class);
    CharacterCardService characterCardService = new CharacterCardService(characterCardRepository, idService);


    @Test
    void getAllCharacterCards_thenReturnEmptyList(){
        //GIVEN
        when(characterCardRepository.findAll())
                .thenReturn(Collections.emptyList());

        //WHEN
        List<CharacterCard> actual = characterCardService.getAllCharacterCards();

        //THEN
        verify(characterCardRepository).findAll();
        Assertions.assertThat(actual)
                .isEmpty();
    }

    @Test
    void whenCharacterCardAdded_thenReturnCharacterCard(){
        //GIVEN
        CharacterCardWithoutId characterCardToBeAdded = new CharacterCardWithoutId("test");
        CharacterCard characterCardAdded = new CharacterCard("012", "test");
        CharacterCard expected = new CharacterCard("012", "test");

        //WHEN
        when(characterCardRepository.insert(characterCardAdded))
                .thenReturn(characterCardAdded);
        when(idService.createRandomId())
                .thenReturn("012");
        CharacterCard actual = characterCardService.addCharacterCard(characterCardToBeAdded);

        //THEN
        verify(characterCardRepository).insert(characterCardAdded);
        verify(idService).createRandomId();
        Assertions.assertThat(actual)
                .isEqualTo(expected);
    }


}
