import {GameCard} from "../Game/GameCard.ts";
import {useState} from "react";
import {IconButton, Modal} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import "./GameCardCollection.css"
import NewGameCard from "./NewGameCard.tsx";
import GameCardSetTable from "./GameCardSetTable.tsx";
import {GameCardSet} from "./GameCardSet.ts";

type Props = {
    allGameCards: GameCard[]
    loadAllGameCards: () => void
    allCardSets: GameCardSet[]
    allMyGameCards: GameCard[]
    loadAllMyGameCards: () => void
    allMyCardSets: GameCardSet[]
}

export default function GameCardCollection(props: Props) {

    /*
     const [, setAllCardSetNames] = useState<string[]>([]);*/
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!props.allGameCards) {
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
                    <NewGameCard onClose={closeModal} onAddNewCard={props.loadAllMyGameCards}/>
                </div>
            </Modal>
            <GameCardSetTable allCardSets={props.allCardSets} allMyCardSets={props.allMyCardSets}></GameCardSetTable>
        </>
    )

}
