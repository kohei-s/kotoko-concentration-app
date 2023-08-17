import React, {useState} from "react";
import {GameCard} from "../Game/GameCard.ts";
import axios from "axios";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";

type Props = {
    gameCard: GameCard
    onGameCardChange: () => void
    title: string
    cardSetName: string
}

export default function GameCardFrame(props: Props) {

    const [title, setTitle] = useState<string>("");
    const [cardSetName, setCardSetName] = useState<string>("");

    function deleteGameCard() {
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
        <>
            <Card sx={{maxWidth: 300, margin: 3, background: "#FDF6E1", boxShadow: 0, border: 0.5, borderColor: "rgba(122,119,119,0.3)", borderRadius: '15px'}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Game Card
                    </Typography>
                    <Typography variant="h5" component="div">
                        title: {props.title}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        set: {props.cardSetName}
                    </Typography>
                    <Typography variant="body2">
                        explanation of the card set
                    </Typography>
                </CardContent>
                <CardActions>
                    <TextField value={title} onInput={changeTitle}/>
                    <TextField value={cardSetName} onInput={changeCardSetName}/>
                    <Button size="small" variant="contained" onClick={updateGameCard} sx={{background: "#547758", boxShadow: 0, borderRadius: '5px'}}>update</Button>
                    <Button size="small" variant="contained" onClick={deleteGameCard} sx={{background: "#834242", boxShadow: 0, borderRadius: '5px'}}>delete</Button>
                </CardActions>
            </Card>


        </>

    )

}
