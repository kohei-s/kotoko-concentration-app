import {useState} from "react";
import axios from "axios";
import {GameCard} from "./GameLogic/GameCard.ts";

export default function NewGameCard() {

    const [title, setTitle] = useState<string>("");
    const [cardSetName, setCardSetName] = useState<string>("");

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function changeCardSetName(event: React.ChangeEvent<HTMLInputElement>) {
        setCardSetName(event.target.value)
    }

    function saveGameCard() {
        axios.post(
            "/api/game_cards", {
                "title": title,
                "cardSetName": cardSetName
            } as GameCard)
            .then(() => {
                setTitle("")
                setCardSetName("")
            }).catch(console.error)
    }

    return (
        <>
            <div className="">
                <input type="text" value={title} onInput={changeTitle}/>
                <input type="text" value={cardSetName} onInput={changeCardSetName}/>
                <button onClick={saveGameCard}>Save</button>
            </div>
        </>
    )

}
