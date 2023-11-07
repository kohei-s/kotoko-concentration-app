import React, {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import NewGameCard from "./NewGameCard.tsx";

type Props = {
    onClose: () => void;
    onAddNewCard: () => void
}

export default function NewGameCardSet(props: Props) {
    const [cardSetName, setCardSetName] = useState<string>("");
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
    function inputCardSetName(event: React.ChangeEvent<HTMLInputElement>) {
        setCardSetName(event.target.value)
    }
    function openHelpModal() {
        setIsHelpModalOpen(true)
    }

    function closeHelpModal() {
        setIsHelpModalOpen(false)
    }

    function openNewCardModal() {
        setIsNewCardModalOpen(true)
    }

    function closeNewCardModal() {
        setIsNewCardModalOpen(false)
    }

    return (
        <>
            <Card className="new-card" sx={{
                maxWidth: 300,
                margin: 3,
                background: "#FDF6E1",
                boxShadow: 0,
                border: 0.5,
                borderColor: "rgba(122,119,119,0.3)",
                borderRadius: '15px'
            }}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom component="div">
                        Create new set
                        <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                                    onClick={openHelpModal} sx={{color: "#a5a7d7", boxShadow: 0}}>
                            <HelpOutlineIcon fontSize={"small"}/>
                        </IconButton>
                    </Typography>
                    <Modal
                        className={"modal-help"}
                        open={isHelpModalOpen}
                        sx={{mt: 10, ml: 4, mr: 4, marginBottom: 35, backgroundColor: "#ffffff"}}
                    >
                        <Box>
                            <Button id={"close-modal"} onClick={closeHelpModal}
                                    sx={{
                                        mt: 5,
                                        mb: 2,
                                        color: "#ffffff",
                                        boxShadow: 0
                                    }}><CancelIcon/></Button>
                            <Typography sx={{ml: 3, color: "#ffffff"}}>
                                Create new card set
                            </Typography>
                            <Typography sx={{mr: 3, ml: 3, mt: 2, color: "#ffffff"}}>
                                In order to create a new card set,
                                you need to name the set first.
                                Next, add it's very first card with a word and it's reading.
                            </Typography>
                        </Box>
                    </Modal>
                    <Typography component="div">
                        <TextField id="set" label="name of set" onInput={inputCardSetName}/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack className={"new-card-edit-stack"} direction="row" paddingBottom={3}>
                        <Button id={"new-card-button"} onClick={openNewCardModal} sx={{
                            m: 5,
                            color: "#508356",
                            boxShadow: 0,
                            borderRadius: '15px'
                        }}><CheckBoxIcon/></Button>

                        <Modal
                            className={"modal-new-card"}
                            open={isNewCardModalOpen}
                            sx={{mt: 20, ml: 6}}
                        >
                            <div>
                                <NewGameCard cardSetName={cardSetName} onClose={closeNewCardModal} onSaveCard={props.onClose} onAddNewCard={props.onAddNewCard}/>
                            </div>
                        </Modal>

                        <Button id={"new-card-button"} onClick={props.onClose} sx={{
                            m: 5,
                            color: "#D05F5F",
                            boxShadow: 0,
                            borderRadius: '15px'
                        }}><DoDisturbOnIcon/></Button>
                    </Stack>
                </CardActions>
            </Card>
        </>
    )
}