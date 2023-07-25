import {useEffect, useState} from "react";
import {PlayingCard} from "./model/PlayingCard.ts";
import axios from "axios"

export default function App() {

    const [playingCards, setPlayingCards] = useState<PlayingCard[]>([]);
    const gameSize = "large";

    function loadPlayingCards() {
        axios.get(
            "api/playing_cards/" + gameSize)

            .then((response) => {
                    setPlayingCards(response?.data)
                }
            )
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
            {playingCards.map((playingCard: PlayingCard) => <div key={playingCard}> {playingCard}</div>)}

        </>
    );
}
