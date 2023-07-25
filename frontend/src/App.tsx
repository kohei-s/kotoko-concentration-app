import {useEffect, useState} from "react";
import axios from "axios"

export default function App() {


    const [playingCards, setPlayingCards] = useState<string[]>([""]);
    const gameSize = "large";

    function loadPlayingCards() {
         axios.get<string[]>(
            "api/playing_cards/" + gameSize)
            .then((response) => {
                    setPlayingCards(response.data)
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
            {playingCards.map((playingCard: string, index) =>
                <div key={index}>{playingCard}</div>)}
        </>
    );
}
