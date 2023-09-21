import axios from "axios";
import {Translation} from "./Translation.ts";
import React, {useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent, IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import "./TranslationCard.css"

export default function TranslationCard() {

    const [translation, setTranslation] = useState<Translation>();
    const [originalWord, setOriginalWord] = useState<string>("");

    function getTranslation(original: string, language: string) {
        axios.get<Translation>("/api/translation?original=" + original + "&language=" + language)
            .then(response => response.data)
            .then(data => {
                setTranslation(data)
            })
            .catch(console.error)
    }

    function inputOriginalWord(event: React.ChangeEvent<HTMLInputElement>) {
        setOriginalWord(event.target.value)
    }

    function displayTranslation() {
        getTranslation(originalWord, "EN");
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
                        <Typography sx={{fontSize: 15, paddingBottom: 1}} color="text.secondary" gutterBottom component="div">
                            What is the japanese word for
                        </Typography>
                        <Typography variant="h5" component="div">
                            <TextField id="original" label="your favorite word?" onInput={inputOriginalWord}/>
                        </Typography>
                        <div className={"translate-button"}>
                            <IconButton id={"translate-button"} onClick={displayTranslation} sx={{boxShadow: 0}}>
                                <ChangeCircleIcon/>
                            </IconButton>
                        </div>
                        <Typography sx={{mb: 1.5, fontSize: 20}} color="text.secondary" component="div">
                            {translation?.japanese}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Stack className={"new-card-edit-stack"} direction="row" paddingBottom={3}>
                            <Button id={"new-card-button"} onClick={displayTranslation} sx={{
                                m: 5,
                                color: "#508356",
                                boxShadow: 0,
                                borderRadius: '15px'
                            }}><ChangeCircleIcon/></Button>
                            <Button id={"new-card-button"} sx={{
                                m: 5,
                                color: "#D05F5F",
                                boxShadow: 0,
                                borderRadius: '15px'
                            }}><LibraryAddIcon/></Button>
                        </Stack>
                    </CardActions>
                </Card>
            </div>
        </>
    )
}
