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
    const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);


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

    function deleteGameCard() {
        axios.delete("/api/game_cards/" + props.gameCard.id)
            .then(props.onGameCardChange)
            .catch(console.error)
    }

    function inputTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function inputCardSetName(event: React.ChangeEvent<HTMLInputElement>) {
        setCardSetName(event.target.value)
    }

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            setTitle(event.target.value)
        } else {
            return props.title
        }
    }

    function changeCardSetName(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            setCardSetName(event.target.value)
        } else {
            return props.cardSetName
        }
    }

    function closeAdd() {
        setIsOpenAdd(false)
    }

    function openEditField() {
        setIsOpenUpdate(true)
    }

    function closeEditField() {
        setIsOpenUpdate(false)
    }


    return (
        <>
            <Card sx={{
                maxWidth: 220,
                margin: 3,
                background: (isOpenUpdate) ? "#ffffff" : "#FDF6E1",
                boxShadow: 0,
                border: 0.5,
                borderColor: "rgba(122,119,119,0.3)",
                borderRadius: '15px'
            }}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {(isOpenAdd) ? "New game card" : (isOpenUpdate) ? "Edit card" : "Game card"}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {(isOpenAdd) ?
                            <TextField id="title" label="card title" onInput={inputTitle}/> :
                            (isOpenUpdate) ?
                                <TextField value={title} onInput={changeTitle}
                                           placeholder={props.title}/> : props.title}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {(isOpenAdd) ?
                            <TextField id="set" label="card set name" onInput={inputCardSetName}/> :
                            (isOpenUpdate) ?
                                <TextField value={cardSetName} onInput={changeCardSetName}
                                           placeholder={props.cardSetName}/> : props.cardSetName}
                    </Typography>
                </CardContent>
                <CardActions className={"card-button"}>
                    <div className={"button-container"}>
                        {(isOpenAdd) ?
                            <div>
                                <Button onClick={saveGameCard}
                                        sx={{
                                            m: 5,
                                            maxWidth: 60,
                                            background: "#508356",
                                            boxShadow: 0,
                                            borderRadius: '15px'
                                        }}>Save</Button>
                                <Button onClick={closeAdd}
                                        sx={{
                                            m: 5,
                                            maxWidth: 60,
                                            background: "#508356",
                                            boxShadow: 0,
                                            borderRadius: '15px'
                                        }}><CancelIcon/></Button>
                            </div>
                            : (isOpenUpdate)?
                            <div>
                                <Button onClick={updateGameCard}
                                        sx={{
                                            color: "#508356",
                                            boxShadow: 0,
                                            borderRadius: '5px'
                                        }}><CheckBoxIcon/></Button>
                                <Button onClick={closeEditField}
                                        sx={{
                                            color: "#4D6A9A",
                                            boxShadow: 0,
                                            borderRadius: '5px'
                                        }}><CancelIcon/></Button>
                                <Button onClick={deleteGameCard}
                                        sx={{
                                            color: "#D05F5F",
                                            boxShadow: 0,
                                            borderRadius: '5px'
                                        }}><DeleteIcon/></Button>
                            </div> : <></>}
                    </div>
                    {(isOpenAdd)? <></> : (isOpenUpdate)? <></> :
                    <Button size="small" onClick={openEditField}
                            sx={{color: "#508356", boxShadow: 0, borderRadius: '5px'}}><EditIcon/></Button>}
                </CardActions>
            </Card>


        </>

    )

}
