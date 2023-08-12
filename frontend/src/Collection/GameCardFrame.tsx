import React, {useState} from "react";
import {GameCard} from "../Game/GameCard.ts";
import axios from "axios";

type Props = {
    gameCard: GameCard
    onGameCardChange: () => void
    title: string
    cardSetName: string
}

export default function GameCardFrame(props: Props) {

    const [title, setTitle] = useState<string>("");
    const [cardSetName, setCardSetName] = useState<string>("");

    function deleteGameCard(){
        axios.delete("/api/game_cards/" + props.gameCard.id)
            .then(props.onGameCardChange)
            .catch(console.error)
    }

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function changeCardSetName(event: React.ChangeEvent<HTMLInputElement>) {
        setCardSetName(event.target.value)
    }

    function updateGameCard() {
        axios.put(
            "/api/game_cards/" + props.gameCard.id, {
                "title": title,
                "cardSetName": cardSetName
            } as GameCard)
            .then(() => {
                setTitle("")
                setCardSetName("")
            }).catch(console.error)
    }

    return (
        <div>
            <div>{props.title}</div>
            <input value={title} onInput={changeTitle}/>
            <div>{props.cardSetName}</div>
            <input value={cardSetName} onInput={changeCardSetName}/>
            <button onClick={updateGameCard}>update</button>
            <button onClick={deleteGameCard}>🗑️</button>
        </div>
    )

}
