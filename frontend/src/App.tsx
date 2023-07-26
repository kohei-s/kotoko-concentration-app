import {useEffect, useState} from "react";
import axios from "axios"
import {CharacterCard} from "./CharacterCard.ts";

export default function App() {

    const [playingCards, setPlayingCards] = useState<string[]>([""]);
    const [characterCards, setCharacterCards] = useState<CharacterCard[]>([]);
    const gameSize = "large";

    function loadPlayingCards() {
        axios.get<string[]>(
            "api/playing_cards/" + gameSize)
            .then((response) => {
                setPlayingCards(response.data)
            })
            .catch(console.error)
    }

    function loadCharacterCards() {
        axios.get<CharacterCard[]>(
            "api/playing_cards/cards")
            .then((response) => {
                setCharacterCards(response?.data)
            })
            .catch(console.error)
    }


    useEffect(
        () => {
            loadPlayingCards()
        }, []
    )

    return (
        <>
            <h2>Concentration</h2>
            <div>
                {playingCards.map((playingCard: string) =>
                    <div key={playingCard}>{playingCard}</div>)}
            </div>
            <div>
                <button onClick={loadCharacterCards}>CharacterCards</button>
                {characterCards.map((characterCard: CharacterCard) =>
                    <div key={characterCard.id}>{characterCard.character}</div>)}
            </div>
        </>
    );
}
