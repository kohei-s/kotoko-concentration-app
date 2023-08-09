import NewGameCard from "./NewGameCard.tsx";
import {GameCard} from "./GameLogic/GameCard.ts";
import axios from "axios";
import {useEffect, useState} from "react";

export default function GameCardCollection(){

    const [allGameCards, setAllGameCards] = useState<GameCard[]>([])

    useEffect(
        () => {
            loadAllGameCards()
        }, []
    )

    function loadAllGameCards() {
        axios.get<GameCard[]>(
            "/api/game_cards/all"
            )
            .then(response => {
                setAllGameCards(response.data)
            }).catch(console.error)
    }

    return(
        <>
            <NewGameCard></NewGameCard>
            {allGameCards.map(card => <div key={card.id}>title: {card.title}, card set name: {card.cardSetName}</div>)}
        </>
    )

}
