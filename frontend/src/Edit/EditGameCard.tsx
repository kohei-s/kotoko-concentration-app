import GameCardFrame from "../Collection/GameCardFrame.tsx";
import {GameCard} from "../Game/GameCard.ts";
import {IconButton, Modal} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import NewGameCard from "../Collection/NewGameCard.tsx";
import {useState} from "react";

type Props = {
    allMyGameCards: GameCard[]
    loadAllMyGameCards: () => void
}

export default function EditGameCard(props: Props) {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    function openAddModal() {
        setIsAddModalOpen(true)
    }

    function closeAddModal() {
        setIsAddModalOpen(false)
    }

    return (
        <>
            <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                        onClick={openAddModal} sx={{color: "#4D6A9A", boxShadow: 0}}>
                <AddCircle fontSize={"large"}/>
            </IconButton>
            <Modal
                className={"modal-new-card"}
                open={isAddModalOpen}
                sx={{mt: 20, ml: 6}}
            >
                <div>
                    <NewGameCard onClose={closeAddModal} onAddNewCard={props.loadAllMyGameCards}/>
                </div>
            </Modal>
            {props.allMyGameCards.map(card => <GameCardFrame
                key={card.id}
                gameCard={card}
                onGameCardChange={props.loadAllMyGameCards}
                cardSetName={card.cardSetName}
                title={card.title}
            ></GameCardFrame>)}
        </>
    )
}