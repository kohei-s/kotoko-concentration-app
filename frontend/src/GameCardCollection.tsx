import NewGameCard from "./NewGameCard.tsx";
import {GameCard} from "./GameLogic/GameCard.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import GameCardFrame from "./GameCardFrame.tsx";

export default function GameCardCollection() {

    const [allNonDefaultGameCards, setAllNonDefaultGameCards] = useState<GameCard[]>([])

    useEffect(
        () => {
            loadAllNonDefaultGameCards()
        }, []
    )

    if (!allNonDefaultGameCards) {
        return "Loading cards..."
    }

    function loadAllNonDefaultGameCards() {
        axios.get<GameCard[]>(
            "/api/game_cards/all"
        )
            .then(response => response.data)
            .then(data => {
                const responseDataCardList  =  data.filter(card =>
                    card.cardSetName!=="hiragana" && card.cardSetName!=="katakana" && card.cardSetName!=="playing-cards")
                setAllNonDefaultGameCards(responseDataCardList)
            }).catch(console.error)
    }


    return (
        <>
            <h2>Game Cards Collection</h2>
            <NewGameCard></NewGameCard>
            {allNonDefaultGameCards.map(card => <GameCardFrame
                key={card.id}
                gameCard={card}
                onGameCardChange={loadAllNonDefaultGameCards}
                cardSetName={card.cardSetName}
                title={card.title}></GameCardFrame>)}
        </>
    )

}
