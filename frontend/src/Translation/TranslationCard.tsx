import axios from "axios";
import {Translation} from "./Translation.ts";
import React, {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent, Dialog, DialogActions, DialogTitle, IconButton, Modal,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {styled} from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import "./TranslationCard.css"
import {Conversion} from "./Conversion.ts";
import {GameCard} from "../Game/GameCard.ts";
import {useParams} from "react-router-dom";


type Props = {
    onSaveCard: () => void
}

export default function TranslationCard(props: Props) {

    const params = useParams()
    const setName: string = params.setName as string
    const [translation, setTranslation] = useState<Translation>();
    const [originalWord, setOriginalWord] = useState<string>("");
    const [conversion, setConversion] = useState<Conversion>();
    const [isOpenSelectModal, setIsOpenSelectModal] = useState(false);

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'start',
        color: theme.palette.text.secondary,
    }));

    function getTranslation(original: string, language: string) {
        axios.get<Translation>("/api/translation?original=" + original + "&language=" + language)
            .then(response => response.data)
            .then(data => {
                setTranslation(data)
            })
            .catch(console.error)
    }

    function getConversion() {
        axios.post<Conversion>(
            "/api/converter", translation)
            .then((response) => response.data)
            .then(data => {
                setConversion(data)
                props.onSaveCard()
            })
            .catch(console.error)
    }

    function inputOriginalWord(event: React.ChangeEvent<HTMLInputElement>) {
        setOriginalWord(event.target.value)
    }

    function openSelectModal() {
        setIsOpenSelectModal(true);
    }

    function closeSelectModal() {
        setIsOpenSelectModal(false);
    }

    function selectCharacter(result: string) {
        let title = ""
        if (conversion) {
            if (result === "kanji") {
                title = conversion.kanji
            } else {
                title=  conversion.kana
            }
        }
        axios.post(
            "/api/game_cards", {
                "title": title,
                "reading": conversion?.alphabet,
                "cardSetName": setName
            } as GameCard)
            .then(()=> {
                closeSelectModal()
                props.onSaveCard()
            })
            .catch(console.error)
    }

    return (
        <>
            <div>
                <img width={"150px"} height={"150px"} src={"/logos/translation-logo.png"}
                     alt={"translation-logo"}/>
            </div>
            <div className={"translation"}>
                <Card className="translation-card" sx={{
                    boxShadow: 0, borderColor: "rgba(122,119,119,0.3)",
                    borderRadius: '15px'
                }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            <TextField id="original" label="Enter word" onInput={inputOriginalWord}/>
                        </Typography>
                        <div className={"translate-button"}>
                            <IconButton id={"translate-button"} onClick={() => {
                                getTranslation(originalWord, "EN")
                            }} sx={{boxShadow: 0}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </div>
                        <Typography sx={{fontSize: 13, paddingBottom: 1}} color="text.secondary" gutterBottom
                                    component="div">

                        </Typography>
                        <Typography sx={{mb: 1.5, fontSize: 20, color:"#D05F5F"}} color="text.secondary" component="div">
                            JP: {translation?.japanese}
                        </Typography>
                        <Typography sx={{fontSize: 10, paddingBottom: 1}} color="text.secondary" gutterBottom component="div">
                            If you need to convert this translation into other Japanese characters click the green button below.
                            To create a new card with this translation, click the red button below.
                        </Typography>
                        <Box sx={{width: '100%'}}>
                            <Stack spacing={1}>
                                <Item>kanji: {conversion?.kanji}</Item>
                                <Item>kana: {conversion?.kana}</Item>
                                <Item>reading: {conversion?.alphabet}</Item>
                            </Stack>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Stack className={"new-card-edit-stack"} direction="row" paddingBottom={3}>
                            <Button id={"new-card-button"} onClick={() =>
                                getConversion()
                            } sx={{
                                m: 5,
                                color: "#508356",
                                boxShadow: 0,
                                borderRadius: '15px'
                            }}><ChangeCircleIcon/></Button>
                            <Button id={"new-card-button"} onClick={openSelectModal} sx={{
                                m: 5,
                                color: "#D05F5F",
                                boxShadow: 0,
                                borderRadius: '15px'
                            }}><LibraryAddIcon/></Button>
                        </Stack>
                        <Modal
                            className={"modal-delete-card"}
                            open={isOpenSelectModal}
                            sx={{mt: 20, ml: 6}}
                        >
                            <Dialog open={isOpenSelectModal}>
                                <DialogTitle>
                                    Do you want to create a new card with kanji or kana?
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={() => selectCharacter('kanji')}>
                                        Kanji
                                    </Button>
                                    <Button onClick={() => selectCharacter('kana')}>
                                        Kana
                                    </Button>
                                    <Button onClick={closeSelectModal}>
                                        cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Modal>
                    </CardActions>
                </Card>
            </div>
        </>
    )
}
