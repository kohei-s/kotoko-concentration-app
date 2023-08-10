import NewGameCard from "./NewGameCard.tsx";
import {GameCard} from "./GameLogic/GameCard.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import GameCardFrame from "./GameCardFrame.tsx";

export default function GameCardCollection() {

    const [allGameCards, setAllGameCards] = useState<GameCard[]>([])

    useEffect(
        () => {
            loadAllGameCards()
        }, []
    )

    if (!allGameCards) {
        return "Loading cards..."
    }

    function loadAllGameCards() {
        axios.get<GameCard[]>(
            "/api/game_cards/all"
        )
            .then(response => {
                setAllGameCards(response.data)
            }).catch(console.error)
    }

    return (
        <>
            <h2>Game Cards Collection</h2>
            <NewGameCard></NewGameCard>
            {allGameCards.map(card => <GameCardFrame
                key={card.id}
                gameCard={card}
                onGameCardChange={loadAllGameCards}
                cardSetName={card.cardSetName}
                title={card.title}></GameCardFrame>)}
        </>
    )

}
