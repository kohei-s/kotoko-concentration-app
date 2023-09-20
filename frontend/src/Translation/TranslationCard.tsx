import axios from "axios";
import {Translation} from "./Translation.ts";
import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, Stack, TextField, Typography} from "@mui/material";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
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
                <Card className="translation-card" sx={{boxShadow: 0,  borderColor: "rgba(122,119,119,0.3)",
                    borderRadius: '15px'}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom component="div">
                            Translate into Japanese
                        </Typography>
                        <Typography variant="h5" component="div">
                            <TextField id="original" label="your favorite word?" onInput={inputOriginalWord}/>
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary" component="div">
                            Japanese translation: {translation?.japanese}
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
                            }}><DoDisturbOnIcon/></Button>
                        </Stack>
                    </CardActions>
                </Card>
            </div>
        </>
    )
}
