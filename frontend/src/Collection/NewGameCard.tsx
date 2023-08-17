import React, {useState} from "react";
import axios from "axios";
import {GameCard} from "../Game/GameCard.ts";
import {Button, TextField} from "@mui/material";
import "./NewGameCard.css"

export default function NewGameCard() {

    const [title, setTitle] = useState<string>("");
    const [cardSetName, setCardSetName] = useState<string>("");

    function inputTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function inputCardSetName(event: React.ChangeEvent<HTMLInputElement>) {
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
            <div className="new-card">
                <div>Create new card</div>
                <TextField id="title" label="card title" onInput={inputTitle}/>
                <TextField id="set" label= "card set name" onInput={inputCardSetName}/>
                <Button variant="contained" onClick={saveGameCard}>Save</Button>
            </div>
        </>
    )

}
