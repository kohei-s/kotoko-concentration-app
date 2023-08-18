import NewGameCard from "./NewGameCard.tsx";
import {GameCard} from "../Game/GameCard.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import ReactModal from "react-modal";
import GameCardFrame from "./GameCardFrame.tsx";
import "./GameCardCollection.css"
import {IconButton, Tooltip} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

export default function GameCardCollection() {

    const [allNonDefaultGameCards, setAllNonDefaultGameCards] = useState<GameCard[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(
        () => {
            loadAllNonDefaultGameCards()
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

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }



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

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlay"
            >
                <NewGameCard cancel={closeModal}/>
            </ReactModal>


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
