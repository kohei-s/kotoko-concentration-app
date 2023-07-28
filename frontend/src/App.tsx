import {useEffect, useState} from "react";
import axios from "axios"
import {CharacterCard} from "./CharacterCard/CharacterCard.ts";
import CharacterCardCollection from "./CharacterCard/CharacterCardCollection.tsx";
import NewCharacterCardFrame from "./CharacterCard/NewCharacterCardFrame.tsx";

export default function App() {

    const [playingCards, setPlayingCards] = useState<string[]>([""]);
    const [characterCards, setCharacterCards] = useState<CharacterCard[]>([]);
    const gameSize = "large";

    function loadPlayingCards() {
        axios.get<string[]>(
            "/api/playing_cards/" + gameSize)
            .then((response) => {
                setPlayingCards(response.data)
            })
            .catch(console.error)
    }

    function loadCharacterCards() {
        axios.get<CharacterCard[]>(
            "/api/character_cards")
            .then((response) => {
                setCharacterCards(response?.data)
            })
            .catch(console.error)
    }

    useEffect(
        () => {
            loadPlayingCards()
            loadCharacterCards()
        }, []
    )


    return (
        <>
            <div>
                <h1>Cards</h1>
                <div>
                    <NewCharacterCardFrame/>
                    <CharacterCardCollection characterCards={characterCards}></CharacterCardCollection>
                </div>
                <h2>Playing Cards</h2>
                <div>
                    {playingCards}
                </div>
            </div>
        </>
    );
}
