import {GameCard} from "../Game/GameCard.ts";
import {useState} from "react";
import GameCardFrame from "./GameCardFrame.tsx";
import {IconButton, Modal} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import "./GameCardCollection.css"
import NewGameCard from "./NewGameCard.tsx";

type Props = {
    allNonDefaultGameCards: GameCard[]
    loadAllNonDefaultGameCards: () => void
}

export default function GameCardCollection(props: Props) {

    /*
     const [, setAllCardSetNames] = useState<string[]>([]);*/
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!props.allNonDefaultGameCards) {
        return "Loading cards..."
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
                    <NewGameCard onClose={closeModal}
                                 onAddNewCard={props.loadAllNonDefaultGameCards}/>
                </div>
            </Modal>
            {props.allNonDefaultGameCards.map(card => <GameCardFrame
                key={card.id}
                gameCard={card}
                onGameCardChange={props.loadAllNonDefaultGameCards}
                cardSetName={card.cardSetName}
                title={card.title}
            ></GameCardFrame>)}
        </>
    )

}
