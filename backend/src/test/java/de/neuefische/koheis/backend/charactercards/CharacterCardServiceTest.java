package de.neuefische.koheis.backend.charactercards;

import de.neuefische.koheis.backend.chractercards.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class CharacterCardServiceTest {

    CharacterCardRepository characterCardRepository = mock(CharacterCardRepository.class);
    IdService idService = mock(IdService.class);
    CharacterCardService characterCardService = new CharacterCardService(characterCardRepository, idService);


    @Test
    void getAllCharacterCards_thenReturnEmptyList() {
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
    void getExistingCharacterCardWithId_thenReturnCharacterCardWithId() {
        //GIVEN
        CharacterCard expected = new CharacterCard("012", "test");
        when(characterCardRepository.findById("012"))
                .thenReturn(Optional.of(expected));

        //WHEN
        CharacterCard actual = characterCardService.getOneCharacterCardById("012");

        //THEN
        verify(characterCardRepository).findById("012");
        Assertions.assertThat(actual)
                .isEqualTo(expected);
    }

    @Test
    void getNotExistingCharacterCardWithId_thenThrowException() {
        //GIVEN
        String id = "012";

        //WHEN
        when(characterCardRepository.existsById(id))
                .thenReturn(false);

        //THEN
        assertThrows(NoSuchElementException.class, () -> characterCardService.getOneCharacterCardById(id));
    }

    @Test
    void whenCharacterCardAdded_thenReturnCharacterCard() {
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

    @Test
    void whenUpdateExistingCharacterCard_thenReturnCharacterCard() {
        //GIVEN
        CharacterCardWithoutId characterCardWithoutId = new CharacterCardWithoutId("test");
        String id = "012";

        //WHEN
        when(characterCardRepository.save(new CharacterCard(id, characterCardWithoutId.getCharacter())))
                .thenReturn(new CharacterCard("012", "test"));
        when(characterCardRepository.existsById(id))
                .thenReturn(true);
        CharacterCard actual = characterCardService.updateCharacterCard(characterCardWithoutId, "012");

        //THEN
        CharacterCard expected = new CharacterCard("012", "test");
        verify(characterCardRepository).save(expected);
        Assertions.assertThat(actual)
                .isEqualTo(expected);
    }

    @Test
    void whenUpdateWithNotExistingId_thenThrowException() {
        //GIVEN
        String notExistingId = "012";
        CharacterCardWithoutId characterCardWithoutId = new CharacterCardWithoutId("test");

        //WHEN
        when(characterCardRepository.existsById("012"))
                .thenReturn(false);

        //THEN
        assertThrows(NoSuchElementException.class, () -> characterCardService.updateCharacterCard(characterCardWithoutId, "012"));
        verify(characterCardRepository).existsById(notExistingId);
        verify(characterCardRepository, never()).save(any());
    }

    @Test
    void whenDeleteExistingCharacterCard_thenDeleteCharacterCard() {
        //GIVEN
        String id = "012";

        //WHEN
        when(characterCardRepository.existsById(id))
                .thenReturn(true);
        doNothing().when(characterCardRepository).deleteById(id);
        characterCardService.deleteCharacterCard(id);

        //THEN
        verify(characterCardRepository).existsById(id);
        verify(characterCardRepository).deleteById(id);
    }

    @Test
    void whenDeleteNotExistingCharacterCard_thenThrowException() {
        //GIVEN
        String id = "012";

        //WHEN
        when(characterCardRepository.existsById(id))
                .thenReturn(false);

        //THEN
        assertThrows(NoSuchElementException.class, () -> characterCardService.deleteCharacterCard(id));
        verify(characterCardRepository).existsById(id);
        verify(characterCardRepository, never()).deleteById(id);
    }

}
