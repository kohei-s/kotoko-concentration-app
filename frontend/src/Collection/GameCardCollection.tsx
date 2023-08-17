import NewGameCard from "./NewGameCard.tsx";
import {GameCard} from "../Game/GameCard.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import GameCardFrame from "./GameCardFrame.tsx";
import "./GameCardCollection.css"

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
            <div>
                <img width={"150px"} height={"150px"} src={"/logos/collection-logo.png"}
                     alt={"collection-logo"}/>
            </div>
            <NewGameCard/>
            COLLECTION
            {allNonDefaultGameCards.map(card => <GameCardFrame
                key={card.id}
                gameCard={card}
                onGameCardChange={loadAllNonDefaultGameCards}
                cardSetName={card.cardSetName}
                title={card.title}></GameCardFrame>)}

        </>
    )

}
