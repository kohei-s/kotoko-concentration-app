import React, {useState} from "react";
import {GameCard} from "../Game/GameCard.ts";
import axios from "axios";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogTitle,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type Props = {
    gameCard: GameCard
    onGameCardChange: () => void
    title: string
    cardSetName: string
}

export default function GameCardFrame(props: Props) {

    const [title, setTitle] = useState<string>("");
    const [cardSetName, setCardSetName] = useState<string>("");
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    function updateGameCard() {
        axios.put(
            "/api/game_cards/" + props.gameCard.id, {
                "title": title,
                "cardSetName": cardSetName
            } as GameCard)
            .then(props.onGameCardChange)
            .then(() => setIsOpenUpdate(false))
            .catch(console.error)
    }

    function deleteGameCard() {
        axios.delete("/api/game_cards/" + props.gameCard.id)
            .then(props.onGameCardChange)
            .catch(console.error)
    }

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            setTitle(event.target.value)
        } else {
            return props.title
        }
    }

    function changeCardSetName(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            setCardSetName(event.target.value)
        } else {
            return props.cardSetName
        }
    }

    function openEditField() {
        setIsOpenUpdate(true)
    }

    function closeEditField() {
        setIsOpenUpdate(false)
    }

    const openModal = () =>
        setIsOpenModal(true);

    const closeModal = () =>
        setIsOpenModal(false);

    function confirmDelete(result: string) {
        console.log(result)
        if (result === "ok") {
            deleteGameCard()
        }
        closeModal()
    }


    return (
        <div>
            <Card sx={{
                maxWidth: 220,
                margin: 3,
                background: (isOpenUpdate) ? "#ffffff" : "#FDF6E1",
                boxShadow: 0,
                border: 0.5,
                borderColor: "rgba(122,119,119,0.3)",
                borderRadius: '15px'
            }}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom component="div">
                        {(isOpenUpdate) ? "Edit card" : "Game card"}
                    </Typography>
                    <Typography variant="h5" component="div">
                            {(isOpenUpdate) ?
                                <TextField value={title} onInput={changeTitle}
                                           placeholder={props.title}/> : props.title}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary" component="div">
                            {(isOpenUpdate) ?
                                <TextField value={cardSetName} onInput={changeCardSetName}
                                           placeholder={props.cardSetName}/> : props.cardSetName}
                    </Typography>
                </CardContent>
                <CardActions className={"card-button"}>
                    <div className={"button-container"}>
                        {(isOpenUpdate) ?
                            <>
                                <Button onClick={updateGameCard}
                                        sx={{
                                            color: "#508356",
                                            boxShadow: 0,
                                            borderRadius: '5px'
                                        }}><CheckBoxIcon/></Button>
                                <Button onClick={closeEditField}
                                        sx={{
                                            color: "#4D6A9A",
                                            boxShadow: 0,
                                            borderRadius: '5px'
                                        }}><CancelIcon/></Button>
                                <Button onClick={openModal}
                                        sx={{
                                            color: "#D05F5F",
                                            boxShadow: 0,
                                            borderRadius: '5px'
                                        }}><DeleteIcon/></Button>
                            </> : <></>}
                    </div>
                    {(isOpenUpdate) ? <></> :
                        <Button size="small" onClick={openEditField}
                                sx={{color: "#508356", boxShadow: 0, borderRadius: '5px'}}><EditIcon/></Button>}
                    <Modal
                        className={"modal-delete-card"}
                        open={isOpenModal}
                        sx={{mt: 20, ml: 6}}
                    >
                        <Dialog open={isOpenModal}>
                            <DialogTitle>
                                Are you sure you want to delete this card?
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={() => confirmDelete('ok')}>
                                    OK
                                </Button>
                                <Button onClick={() => confirmDelete('cancel')}>
                                    CANCEL
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Modal>
                </CardActions>
            </Card>
        </div>

    )

}
