import React, {useState} from 'react';
import axios from "axios";
import {CharacterCard} from "./CharacterCard.ts";

export default function NewCharacterCardFrame() {

    const [character, setCharacter] = useState("");

    function changeCharacter(event: React.ChangeEvent<HTMLInputElement>) {
        setCharacter(event.target.value)
    }

    function saveCharacterCard() {
        setCharacter("")
        axios.post<CharacterCard>("/api/character_cards", {
            character: character
        })
            .catch(console.error)
    }

    return (
        <div>
            <input type="text" value={character} onInput={changeCharacter}/>
            <button onClick={saveCharacterCard}>Save</button>
        </div>
    );
}
