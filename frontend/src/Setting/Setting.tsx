import {UserInfo} from "../UserInfo.ts";
import {useEffect, useState} from "react";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import "./Setting.css"

type Props = {
    userInfo: UserInfo | undefined
    update: (userInfo: UserInfo) => void
}
export default function Setting(props: Props) {

    const [userData, setUserData] = useState<UserInfo>();
    const [userLevels, setUserLevels] = useState<string[]>([]);
    const [hiraganaLevel, setHiraganaLevel] = useState<string>("");
    const [katakanaLevel, setKatakanaLevel] = useState<string>("");
    const [playingCardsLevel, setPlayingCardsLevel] = useState<string>("");
    const [customLevel, setCustomLevel] = useState<string>("");

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
        setUserLevels(newLevels)
        const updatedUserInfo: UserInfo = {
            username: userData?.username as string,
            achievement: userData?.achievement as string,
            wordbook: userData?.wordbook as string[],
            diacritics: userData?.diacritics as boolean[],
            levels: newLevels
        }
        props.update(updatedUserInfo)
    }

    return (
        <>
            <div>
                <img width={"150px"} height={"150px"} src={"/logos/setting-logo.png"}
                     alt={"setting-logo"}/>
            </div>
            <div className={"selector"}>
                <FormControl sx={{ m: 1, minWidth: 120}}>
                    <InputLabel id="Hiragana-level">HIRAGANA</InputLabel>
                    <Select
                        labelId="Hiragana-level"
                        id="Hiragana-level"
                        value={hiraganaLevel}
                        label="Hiargana"
                        onChange={changeHiraganaLevel}
                    >
                        <MenuItem value={"small"}>Beginner (3x3 cards)</MenuItem>
                        <MenuItem value={"medium"}>Intermediate (3x4 cards)</MenuItem>
                        <MenuItem value={"large"}>Advanced (4x4 cards)</MenuItem>
                    </Select>
                    <FormHelperText>current level:  {(userLevels[0]==="small")? "Beginner": (userLevels[0]==="medium")? "Intermediate": "Advanced"}</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="Katakana-level">KATAKANA</InputLabel>
                    <Select
                        labelId="Katakana-level"
                        id="Katakana-level"
                        value={katakanaLevel}
                        label="Katakana"
                        onChange={changeKatakanaLevel}
                    >
                        <MenuItem value={"small"}>Beginner (3x3 cards)</MenuItem>
                        <MenuItem value={"medium"}>Intermediate (3x4 cards)</MenuItem>
                        <MenuItem value={"large"}>Advanced (4x4 cards)</MenuItem>
                    </Select>
                    <FormHelperText>current level:  {(userLevels[1]==="small")? "Beginner": (userLevels[1]==="medium")? "Intermediate": "Advanced"}</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="PlayingCards-level">CARDS</InputLabel>
                    <Select
                        labelId="PlayingCards-level"
                        id="PlayingCards-level"
                        value={playingCardsLevel}
                        label="PlayingCards"
                        onChange={changePlayingCardsLevel}
                    >
                        <MenuItem value={"small"}>Beginner (3x3 cards)</MenuItem>
                        <MenuItem value={"medium"}>Intermediate (3x4 cards)</MenuItem>
                        <MenuItem value={"large"}>Advanced (4x4 cards) </MenuItem>
                    </Select>
                    <FormHelperText>current level:  {(userLevels[2]==="small")? "Beginner": (userLevels[2]==="medium")? "Intermediate": "Advanced"}</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="Cuctom-level">CUSTOM</InputLabel>
                    <Select
                        labelId="Custom-level"
                        id="Custom-level"
                        value={customLevel}
                        label="Custom"
                        onChange={changeCustomLevel}
                    >
                        <MenuItem value={"small"}>Beginner (3x3 cards)</MenuItem>
                        <MenuItem value={"medium"}>Intermediate (3x4 cards)</MenuItem>
                        <MenuItem value={"large"}>Advanced (4x4 cards)</MenuItem>
                    </Select>
                    <FormHelperText>current level:  {(userLevels[3]==="small")? "Beginner": (userLevels[3]==="medium")? "Intermediate": "Advanced"}</FormHelperText>
                </FormControl>
                <Button id={"save"} variant="contained" size="medium" sx={{ m: 10, maxWidth: 60, background: "#508356", boxShadow: 0, borderRadius: '15px'}} onClick={() => {
                    updateLevels()
                }}>
                    Save
                </Button>
            </div>
        </>
    );
}
