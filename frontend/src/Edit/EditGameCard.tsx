import GameCardFrame from "./GameCardFrame.tsx";
import {GameCard} from "../Game/GameCard.ts";
import {IconButton, Modal} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import NewGameCard from "../Collection/NewGameCard.tsx";
import {useState} from "react";
import "./EditGameCard.css"
import {useParams} from "react-router-dom";

type Props = {
    allMyGameCards: GameCard[]
    loadAllMyGameCards: () => void
}

export default function EditGameCard(props: Props) {

    const params = useParams()
    const setName: string = params.setName as string
    const number: string = params.number as string

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    function openAddModal() {
        setIsAddModalOpen(true)
    }

    function closeAddModal() {
        setIsAddModalOpen(false)
    }

    return (
        <>
            <div className={"edit"}>
                <img width={"150px"} height={"150px"} src={"/logos/edit-logo.png"}
                     alt={"edit-logo"}/>
            </div>
            <div className={"set-name"}>
                Name: <span>{setName}</span> <br/> Number: <span>{number}</span>
                <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                            onClick={openAddModal} sx={{color: "#4D6A9A", boxShadow: 0, ml: 12}}>
                    <AddCircle fontSize={"large"}/>
                </IconButton>
            </div>
            {props.allMyGameCards.filter(card => card.cardSetName === setName).map(card => <GameCardFrame
                key={card.id}
                gameCard={card}
                onGameCardChange={props.loadAllMyGameCards}
                cardSetName={card.cardSetName}
                title={card.title}
            ></GameCardFrame>)}
            <Modal
                className={"modal-new-card"}
                open={isAddModalOpen}
                sx={{mt: 20, ml: 6}}
            >
                <div>
                    <NewGameCard onClose={closeAddModal} onAddNewCard={props.loadAllMyGameCards}/>
                </div>
            </Modal>
        </>
    )
}