import {UserInfo} from "../Security/UserInfo.ts";
import {useEffect, useState} from "react";
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import "./Setting.css"


type Props = {
    userInfo: UserInfo | undefined
    update: (userInfo: UserInfo) => void
    allCardSetNames: string[]
}
export default function Setting(props: Props) {

    const [userData, setUserData] = useState<UserInfo>();
    const [userLevels, setUserLevels] = useState<string[]>([]);
    const [hiraganaLevel, setHiraganaLevel] = useState<string>("small");
    const [katakanaLevel, setKatakanaLevel] = useState<string>("small");
    const [playingCardsLevel, setPlayingCardsLevel] = useState<string>("small");
    const [customLevel, setCustomLevel] = useState<string>("small");
    const [selectedCustomGame, setSelectedCustomGame] = useState<string>("animal")

    useEffect(() => {
        setUserData(props.userInfo)
        if (props.userInfo) {
            setUserLevels(props.userInfo.levels)
            setSelectedCustomGame(props.userInfo.selectedCardSet)
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

    const changeSelectedCustomGame = (event: SelectChangeEvent) => {
        setSelectedCustomGame(event.target.value)
    }

    function setUserLevelText(index: number) {
        switch (userLevels[index]) {
            case "large":
                return "Advanced";
            case "medium":
                return "Intermediate";
            default:
                return "Beginner";
        }
    }

    function updateLevels() {
        const newLevels: string[] = [hiraganaLevel, katakanaLevel, playingCardsLevel, customLevel]
        setUserLevels(newLevels)
        const updatedUserInfo: UserInfo = {
            username: userData?.username as string,
            achievement: userData?.achievement as string,
            wordbook: userData?.wordbook as string[],
            diacritics: userData?.diacritics as boolean[],
            levels: newLevels,
            selectedCardSet: userData?.selectedCardSet as string
        }
        props.update(updatedUserInfo)
    }

    function updateCustomGame() {
        const updatedUserInfo: UserInfo = {
            username: userData?.username as string,
            achievement: userData?.achievement as string,
            wordbook: userData?.wordbook as string[],
            diacritics: userData?.diacritics as boolean[],
            levels: userData?.levels as string[],
            selectedCardSet: selectedCustomGame
        }
        props.update(updatedUserInfo)

    }


    return (
        <>
        {console.log(props.allCardSetNames)}
            <div>
                <img width={"150px"} height={"150px"} src={"/logos/setting-logo.png"}
                     alt={"setting-logo"}/>
            </div>
            <div className={"selector"}>
                <h3>Custom Game</h3>
                <FormControl sx={{m: 1, width: 225, textAlign: "center"}}>
                    <InputLabel id="Custom-game">Card Set</InputLabel>
                    <Select
                        labelId="Custom-game"
                        id="Custom-game"
                        value={selectedCustomGame}
                        label="Card set"
                        onChange={changeSelectedCustomGame}
                    >
                        {props.allCardSetNames.map(setName => <MenuItem
                            key={setName}
                            value={setName}
                        >{setName}</MenuItem>)}
                    </Select>
                    <FormHelperText>current set: {selectedCustomGame}</FormHelperText>
                </FormControl>
                <IconButton id={"save"} size="small" disableRipple={true} sx={{
                    maxWidth: 60,
                    color: "#FDF6E1",
                    background: "#508356",
                    boxShadow: 0,
                    borderRadius: '10px',
                }} onClick={() => {
                    updateCustomGame()
                }}>
                    <CheckIcon/>
                </IconButton>
            </div>
            <div className={"selector"}>
                <h3 id={"level"}>Game Level</h3>
                <FormControl sx={{m: 1, width: 225, textAlign: "center"}}>
                    <InputLabel id="Hiragana-level">HIRAGANA</InputLabel>
                    <Select
                        labelId="Hiragana-level"
                        id="Hiragana-level"
                        value={hiraganaLevel}
                        label="Hiargana"
                        onChange={changeHiraganaLevel}
                    >
                        <MenuItem value={"small"}>Beginner (3x3)</MenuItem>
                        <MenuItem value={"medium"}>Intermediate (3x4)</MenuItem>
                        <MenuItem value={"large"}>Advanced (4x4)</MenuItem>
                    </Select>
                    <FormHelperText>current level: {setUserLevelText(0)}</FormHelperText>
                </FormControl>
                <FormControl sx={{m: 1, width: 225, textAlign: "center"}}>
                    <InputLabel id="Katakana-level">KATAKANA</InputLabel>
                    <Select
                        labelId="Katakana-level"
                        id="Katakana-level"
                        value={katakanaLevel}
                        label="Katakana"
                        onChange={changeKatakanaLevel}
                    >
                        <MenuItem value={"small"}>Beginner (3x3)</MenuItem>
                        <MenuItem value={"medium"}>Intermediate (3x4)</MenuItem>
                        <MenuItem value={"large"}>Advanced (4x4)</MenuItem>
                    </Select>
                    <FormHelperText>current level: {setUserLevelText(1)}</FormHelperText>
                </FormControl>
                <FormControl sx={{m: 1, width: 225, textAlign: "center"}}>
                    <InputLabel id="PlayingCards-level">CARDS</InputLabel>
                    <Select
                        labelId="PlayingCards-level"
                        id="PlayingCards-level"
                        value={playingCardsLevel}
                        label="PlayingCards"
                        onChange={changePlayingCardsLevel}
                    >
                        <MenuItem value={"small"}>Beginner (3x3)</MenuItem>
                        <MenuItem value={"medium"}>Intermediate (3x4)</MenuItem>
                        <MenuItem value={"large"}>Advanced (4x4) </MenuItem>
                    </Select>
                    <FormHelperText>current level: {setUserLevelText(2)}</FormHelperText>
                </FormControl>
                <FormControl sx={{m: 1, width: 225, textAlign: "center"}}>
                    <InputLabel id="Cuctom-level">CUSTOM</InputLabel>
                    <Select
                        labelId="Custom-level"
                        id="Custom-level"
                        value={customLevel}
                        label="Custom"
                        onChange={changeCustomLevel}
                    >
                        <MenuItem value={"small"}>Beginner (3x3)</MenuItem>
                        <MenuItem value={"medium"}>Intermediate (3x4)</MenuItem>
                        <MenuItem value={"large"}>Advanced (4x4)</MenuItem>
                    </Select>
                    <FormHelperText>current
                        level: {setUserLevelText(3)}</FormHelperText>
                </FormControl>
                <IconButton id={"save"} size="small" disableRipple={true} sx={{
                    maxWidth: 60,
                    color: "#FDF6E1",
                    background: "#508356",
                    boxShadow: 0,
                    borderRadius: '10px',
                    marginBottom: '50px'
                }} onClick={() => {
                    updateLevels()
                }}>
                    <CheckIcon/>
                </IconButton>
            </div>
        </>
    );
}
