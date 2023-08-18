import React, {useState} from "react";
import {GameCard} from "../Game/GameCard.ts";
import axios from "axios";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type Props = {
    gameCard: GameCard
    onGameCardChange: () => void
    title: string
    cardSetName: string
    loadAll: () => void
}

export default function GameCardFrame(props: Props) {

    const [title, setTitle] = useState<string>("");
    const [cardSetName, setCardSetName] = useState<string>("");
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);

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

    function openEditField() {
        setIsOpenUpdate(true)
    }

    function closeEditField() {
        setIsOpenUpdate(false)

    }

    function updateGameCard() {
        axios.put(
            "/api/game_cards/" + props.gameCard.id, {
                "title": title,
                "cardSetName": cardSetName
            } as GameCard)
            .then(() => {
                props.loadAll()
                setIsOpenUpdate(false)
            }).catch(console.error)
    }

    return (
        <>
            <Card sx={{
                maxWidth: 300,
                margin: 3,
                background: (isOpenUpdate)? "#ded8c6" : "#FDF6E1",
                boxShadow: 0,
                border: 0.5,
                borderColor: "rgba(122,119,119,0.3)",
                borderRadius: '15px'
            }}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {(isOpenUpdate)? "Edit": "Game Card"}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {(isOpenUpdate) ? <TextField value={title} onInput={changeTitle} placeholder={props.title}/> : props.title}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {(isOpenUpdate) ?
                            <TextField value={cardSetName} onInput={changeCardSetName} placeholder={props.cardSetName}/> : props.cardSetName}
                    </Typography>
                </CardContent>
                <CardActions className={"card-button"}>
                    {(isOpenUpdate) ?
                        <div className={"button-container"}>
                            <Button onClick={updateGameCard}
                                    sx={{color: "#508356", boxShadow: 0, borderRadius: '5px'}}><CheckBoxIcon/></Button>
                            <Button onClick={closeEditField}
                                    sx={{color: "#4D6A9A", boxShadow: 0, borderRadius: '5px'}}><CancelIcon/></Button>
                            <Button onClick={deleteGameCard}
                                    sx={{color: "#D05F5F", boxShadow: 0, borderRadius: '5px'}}><DeleteIcon/></Button>
                        </div> :
                        <Button size="small" onClick={openEditField}
                                sx={{color: "#508356", boxShadow: 0, borderRadius: '5px'}}><EditIcon/></Button>}
                </CardActions>
            </Card>


        </>

    )

}
