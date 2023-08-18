import {GameCard} from "../Game/GameCard.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import GameCardFrame from "./GameCardFrame.tsx";
import {IconButton, Modal, Tooltip} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import "./GameCardCollection.css"

export default function GameCardCollection() {

    const [allNonDefaultGameCards, setAllNonDefaultGameCards] = useState<GameCard[]>([]);
    const [allCardSetNames, setAllCardSetNames] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardSetName, setCardSetname] = useState<string>("");

    const gameCard1: GameCard = {id: "0", title: "test", cardSetName: "testSet"};

    useEffect(
        () => {
            loadAllNonDefaultGameCards()
            getAllSetNames()
        }, [getAllSetNames]
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

    const openModal = () =>
        setIsModalOpen(true);

    const closeModal = () =>
        setIsModalOpen(false);


    return (
        <>
            <div className={"collection"}>
                <img width={"150px"} height={"150px"} src={"/logos/collection-logo.png"}
                     alt={"collection-logo"}/>
            </div>
            <Tooltip title="Create new card">
                <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                            onClick={openModal} sx={{color: "#4D6A9A", boxShadow: 0}}>
                    <AddCircle fontSize={"large"}/>
                </IconButton>
            </Tooltip>
            <Modal
                className={"modal"}
                open={isModalOpen}
                sx={{mt:20, ml: 6}}
            >
                <GameCardFrame title={""}
                gameCard={gameCard1}
                onGameCardChange={loadAllNonDefaultGameCards}
                cardSetName={""}
                loadAll={loadAllNonDefaultGameCards}/>
            </Modal>


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
                loadAll={loadAllNonDefaultGameCards}
            ></GameCardFrame>)}

        </>
    )

}
