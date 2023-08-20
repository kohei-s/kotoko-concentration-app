import {GameCard} from "../Game/GameCard.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import GameCardFrame from "./GameCardFrame.tsx";
import {IconButton, Modal} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import "./GameCardCollection.css"
import NewGameCard from "./NewGameCard.tsx";

export default function GameCardCollection() {

    const [allNonDefaultGameCards, setAllNonDefaultGameCards] = useState<GameCard[]>([]);
    const [, setAllCardSetNames] = useState<string[]>([]);
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

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

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
                <div>
                    <NewGameCard onClose={closeModal} onAddNewCard={loadAllNonDefaultGameCards}/>
                </div>
            </Modal>
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
