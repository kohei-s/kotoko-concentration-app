import {GameCard} from "../Game/GameCard.ts";
import axios from "axios";
import React, {useEffect, useState} from "react";
import GameCardFrame from "./GameCardFrame.tsx";
import {Button, Card, CardActions, CardContent, IconButton, Modal, Stack, TextField, Typography} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import "./GameCardCollection.css"

export default function GameCardCollection() {

    const [allNonDefaultGameCards, setAllNonDefaultGameCards] = useState<GameCard[]>([]);
    const [, setAllCardSetNames] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [cardSetName, setCardSetName] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(
        () => {
            loadAllNonDefaultGameCards()
            getAllSetNames()
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
                const responseDataCardList = data.filter(card =>
                    card.cardSetName !== "hiragana" && card.cardSetName !== "katakana" && card.cardSetName !== "playing-cards")
                setAllNonDefaultGameCards(responseDataCardList)
            }).catch(console.error)
    }

    function getAllSetNames() {
        const listSetNames = allNonDefaultGameCards.map((card) => card.cardSetName)
        const uniqueSetNames = new Set(listSetNames)
        setAllCardSetNames(Array.from(uniqueSetNames))
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
                loadAllNonDefaultGameCards()
            })
            .catch(console.error)
            .finally(closeModal)
    }

    function inputTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function inputCardSetName(event: React.ChangeEvent<HTMLInputElement>) {
        setCardSetName(event.target.value)
    }

    const openModal = () =>
        setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false)
    };


    return (
        <>
            <div className={"collection"}>
                <img width={"150px"} height={"150px"} src={"/logos/collection-logo.png"}
                     alt={"collection-logo"}/>
            </div>
            <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                        onClick={openModal} sx={{color: "#4D6A9A", boxShadow: 0}}>
                <AddCircle fontSize={"large"}/>
            </IconButton>
            <Modal
                className={"modal-new-card"}
                open={isModalOpen}
                sx={{mt: 20, ml: 6}}
            >
                <Card className="new-card" sx={{
                    maxWidth: 220,
                    margin: 3,
                    background: "#FDF6E1",
                    boxShadow: 0,
                    border: 0.5,
                    borderColor: "rgba(122,119,119,0.3)",
                    borderRadius: '15px'
                }}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Create new game card
                        </Typography>
                        <Typography variant="h5" component="div">
                            <TextField id="title" label="card title?" onInput={inputTitle}/>
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            <TextField id="set" label="set name?" onInput={inputCardSetName}/>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Stack className={"new-card-stack"} direction="row" paddingBottom={3}>
                            <Button id={"new-card-button"} onClick={saveGameCard} sx={{
                                m: 5, maxWidth: 60, color: "#508356", boxShadow: 0, borderRadius: '15px'
                            }}><CheckBoxIcon/></Button>
                            <Button id={"new-card-button"} onClick={closeModal} sx={{
                                m: 5, maxWidth: 60, color: "#D05F5F", boxShadow: 0, borderRadius: '15px'
                            }}><DoDisturbOnIcon/></Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Modal>

            {/*<NewGameCard onClose={closeModal} loadCards={loadAllNonDefaultGameCards}/>*/}

            {/*<FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select game set</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cardSetName}
                    label="Set name"
                    // onChange={handleChange}
                >
                    {allCardSetNames.map(cardSetName => <MenuItem key={cardSetName}>{cardSetName}</MenuItem>)}

                </Select>
            </FormControl>*/}


            {allNonDefaultGameCards.map(card => <GameCardFrame
                key={card.id}
                gameCard={card}
                onGameCardChange={loadAllNonDefaultGameCards}
                cardSetName={card.cardSetName}
                title={card.title}
            ></GameCardFrame>)}

        </>
    )

}
