import {GameCard} from "../Game/GameCard.ts";
import {useState} from "react";
import {IconButton, Modal} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import "./GameCardCollection.css"
import GameCardSetTable from "./GameCardSetTable.tsx";
import {GameCardSet} from "./GameCardSet.ts";
import NewGameCardSet from "./NewGameCardSet.tsx";

type Props = {
    allMyGameCards: GameCard[]
    loadAllMyGameCards: () => void
    allMyCardSets: GameCardSet[]
}

export default function GameCardCollection(props: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!props.allMyGameCards) {
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
                    <NewGameCardSet onClose={closeModal} onAddNewCard={props.loadAllMyGameCards}/>
                </div>
            </Modal>
            <GameCardSetTable allMyCardSets={props.allMyCardSets}></GameCardSetTable>
        </>
    )

}
