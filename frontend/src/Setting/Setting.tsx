import {UserInfo} from "../UserInfo.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import "./Setting.css"

type Props = {
    userInfo: UserInfo | undefined
}
export default function Setting(props: Props) {


    const [userData, setUserData] = useState<UserInfo>();
    const [userLevels, setUserLevels] = useState<string[]>([]);
    const [hiraganaLevel, setHiraganaLevel] = useState<string>("");
    const [katakanaLevel, setKatakanaLevel] = useState<string>("");
    const [playingCardsLevel, setPlayingCardsLevel] = useState<string>("");
    const [customLevel, setCustomLevel] = useState<string>("");

    function updateUserLevels(updatedUserInfo: UserInfo) {
        axios.put<UserInfo>("/api/users/update", updatedUserInfo)
            .then(response => response.data)
            .then(data => {
                setUserData(data)
            })
            .catch(console.error)
    }

    useEffect(() => {
        setUserData(props.userInfo)
        if (props.userInfo) {
            setUserLevels(props.userInfo.levels)
        }
    }, [props.userInfo]);

    const changeHiraganaLevel = (event: SelectChangeEvent) => {
        setHiraganaLevel(event.target.value)
    }

    const changeKatakanaLevel = (event: SelectChangeEvent) => {
        setKatakanaLevel(event.target.value)
    }

    const changePlayingCardsLevel = (event: SelectChangeEvent) => {
        setPlayingCardsLevel(event.target.value)
    }

    const changeCustomLevel = (event: SelectChangeEvent) => {
        setCustomLevel(event.target.value)
    }

    function updateLevels() {
        const newLevels: string[] = [hiraganaLevel, katakanaLevel, playingCardsLevel, customLevel]
        console.log(newLevels)
        setUserLevels(newLevels)
        console.log(userLevels)


        const updatedUserInfo: UserInfo = {
            username: userData?.username as string,
            achievement: userData?.achievement as string,
            wordbook: userData?.wordbook as string[],
            diacritics: userData?.diacritics as boolean[],
            levels: userLevels
        }
        updateUserLevels(updatedUserInfo)
    }

    return (
        <>
            <div className={"selector"}>
                <p id={"title"}>Select Game Level</p>
                <FormControl fullWidth>
                    <InputLabel id="Hiragana-level">Hiragana</InputLabel>
                    <Select
                        labelId="Hiragana-level"
                        id="Hiragana-level"
                        value={hiraganaLevel}
                        label="Hiargana"
                        onChange={changeHiraganaLevel}
                    >
                        <MenuItem value={"small"}>Beginner</MenuItem>
                        <MenuItem value={"medium"}>Intermediate</MenuItem>
                        <MenuItem value={"large"}>Advanced</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="Katakana-level">Katakana</InputLabel>
                    <Select
                        labelId="Katakana-level"
                        id="Katakana-level"
                        value={katakanaLevel}
                        label="Katakana"
                        onChange={changeKatakanaLevel}
                    >
                        <MenuItem value={"small"}>Beginner</MenuItem>
                        <MenuItem value={"medium"}>Intermediate</MenuItem>
                        <MenuItem value={"large"}>Advanced</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="PlayingCards-level">Playing Cards</InputLabel>
                    <Select
                        labelId="PlayingCards-level"
                        id="PlayingCards-level"
                        value={playingCardsLevel}
                        label="PlayingCards"
                        onChange={changePlayingCardsLevel}
                    >
                        <MenuItem value={"small"}>Beginner</MenuItem>
                        <MenuItem value={"medium"}>Intermediate</MenuItem>
                        <MenuItem value={"large"}>Advanced</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="Cuctom-level">Custom</InputLabel>
                    <Select
                        labelId="Custom-level"
                        id="Custom-level"
                        value={customLevel}
                        label="Custom"
                        onChange={changeCustomLevel}
                    >
                        <MenuItem value={"small"}>Beginner</MenuItem>
                        <MenuItem value={"medium"}>Intermediate</MenuItem>
                        <MenuItem value={"large"}>Advanced</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" size="small" onClick={() => {
                    updateLevels()
                }}>
                    Save Setting
                </Button>
            </div>
        </>
    );
}
