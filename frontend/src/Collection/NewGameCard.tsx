import React, {useState} from "react";
import axios from "axios";
import {GameCard} from "../Game/GameCard.ts";
import {Button, Card, CardActions, CardContent, IconButton, Stack, TextField, Typography} from "@mui/material";
import TranslateIcon from '@mui/icons-material/Translate';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import "./NewGameCard.css"
import {Link} from "react-router-dom";

type Props = {
    cardSetName: string
    onClose: () => void
    onSaveCard: () => void
    onAddNewCard: () => void
}
export default function NewGameCard(props: Props) {

    const [title, setTitle] = useState<string>("");
    const [reading, setReading] = useState<string>("");

    function inputTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function inputReading(event: React.ChangeEvent<HTMLInputElement>) {
        setReading(event.target.value)
    }

    function saveGameCard() {
        axios.post(
            "/api/game_cards", {
                "title": title,
                "reading": reading,
                "cardSetName": props.cardSetName
            } as GameCard)
            .then(() => {
                setTitle("")
                setReading("")
                props.onAddNewCard()
                props.onSaveCard()
                props.onClose()
            }).catch(console.error)
    }

    return (
        <>
            <Card className="new-card" sx={{
                maxWidth: 300,
                margin: 3,
                background: "#FDF6E1",
                boxShadow: 0,
                border: 0.5,
                borderColor: "rgba(122,119,119,0.3)",
                borderRadius: '15px'
            }}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom component="div">
                        Create new card
                    </Typography>
                    <Typography component="div">
                        <TextField id="title" label="word" onInput={inputTitle}/>
                    </Typography>
                    <Typography component="div">
                        <TextField id="reading" label="reading" onInput={inputReading}/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack className={"new-card-edit-stack"} direction="row" paddingBottom={3}>
                        <Button id={"new-card-button"} onClick={saveGameCard} sx={{
                            m: 5,
                            color: "#508356",
                            boxShadow: 0,
                            borderRadius: '15px'
                        }}><CheckBoxIcon/></Button>
                        <Button id={"new-card-button"} onClick={props.onClose} sx={{
                            m: 5,
                            color: "#D05F5F",
                            boxShadow: 0,
                            borderRadius: '15px'
                        }}><DoDisturbOnIcon/></Button>
                    </Stack>
                </CardActions>
            </Card>

            <Card className="translation-card" sx={{
                maxWidth: 210,
                maxHeight: 210,
                margin: 4,
                marginLeft: 5,
                background: "#ffffff",
                boxShadow: 0,
                border: 0.5,
                borderColor: "rgba(122,119,119,0.3)",
                borderRadius: '10px'
            }}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom component="div">
                        If you need technical assistance to find a Japanese word you're about to learn, click on a blue button below.
                    </Typography>
                    <div id={"translate-button"}>

                    </div>
                </CardContent>
                <CardActions>
                    <IconButton  size={"small"} sx={{
                        color: "#ffffff",
                        backgroundColor: "#3c7ee8",
                        boxShadow: 0,
                        borderRadius: '10px'
                    }}><Link id={"link-translation"} to="/translation"><TranslateIcon fontSize={"small"}/></Link></IconButton>
                </CardActions>
            </Card>
        </>
    )

}
