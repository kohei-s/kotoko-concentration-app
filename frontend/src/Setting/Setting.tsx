import {UserInfo} from "../Security/UserInfo.ts";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem, Modal,
    Select,
    SelectChangeEvent, Typography
} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import {CardSet} from "./CardSet.ts";
import "./Setting.css"


type Props = {
    userInfo: UserInfo | undefined
    update: (userInfo: UserInfo) => void
    countCardSets: CardSet[]
}
export default function Setting(props: Props) {

    const [userData, setUserData] = useState<UserInfo>();
    const [userLevels, setUserLevels] = useState<string[]>([]);
    const [userDiacritics, setUserDiacritics] = useState<boolean[]>([]);
    const [hiraganaLevel, setHiraganaLevel] = useState<string>("small");
    const [katakanaLevel, setKatakanaLevel] = useState<string>("small");
    const [playingCardsLevel, setPlayingCardsLevel] = useState<string>("small");
    const [customLevel, setCustomLevel] = useState<string>("small");
    const [selectedCustomGame, setSelectedCustomGame] = useState<string>("");
    const [countCardSets, setCountCardSets] = useState<CardSet[]>([]);
    const [hiraganaDiacritics, setHiraganaDiacritics] = useState<boolean>(false);
    const [katakanaDiacritics, setKatakanaDiacritics] = useState<boolean>(false);
    const [isCustomGameModalOpen, setIsCustomGameModalOpen] = useState(false);
    const [isLevelsModalOpen, setIsLevelsModalOpen] = useState(false);
    const [isDiacriticsModalOpen, setIsDiacriticsModalOpen] = useState(false);

    useEffect(() => {
        setCountCardSets(props.countCardSets)
        setUserData(props.userInfo)
        if (props.userInfo) {
            setUserLevels(props.userInfo.levels)
            setSelectedCustomGame(props.userInfo.selectedCardSet)
            setUserDiacritics(props.userInfo.diacritics)
        }
    }, [props.userInfo, props.countCardSets]);

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

    const changeHiraganaDiacritics = (event: SelectChangeEvent) => {
        if (event.target.value === "on") {
            setHiraganaDiacritics(true)
        } else {
            setHiraganaDiacritics(false)
        }
    }

    const changeKatakanaDiacritics = (event: SelectChangeEvent) => {
        if (event.target.value === "on") {
            setKatakanaDiacritics(true)
        } else {
            setKatakanaDiacritics(false)
        }
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

    function setUserDiacriticsText(index: number) {
        switch (userDiacritics[index]) {
            case true:
                return "on";
            default:
                return "off";
        }
    }

    function updateDiacritics() {
        const newDiacritics: boolean[] = [hiraganaDiacritics, katakanaDiacritics]
        setUserDiacritics(newDiacritics)
        const updatedUserInfo: UserInfo = {
            username: userData?.username as string,
            achievement: userData?.achievement as string,
            wordbook: userData?.wordbook as string[],
            diacritics: newDiacritics,
            levels: userData?.levels as string[],
            selectedCardSet: userData?.selectedCardSet as string
        }
        props.update(updatedUserInfo)
    }

    function openCustomGameModal() {
        setIsCustomGameModalOpen(true)
    }

    function closeCustomGameModal() {
        setIsCustomGameModalOpen(false)
    }

    function openLevelsModal() {
        setIsLevelsModalOpen(true)
    }

    function closeLevelsModal() {
        setIsLevelsModalOpen(false)
    }

    function openDiacriticsModal() {
        setIsDiacriticsModalOpen(true)
    }

    function closeDiacriticsModal() {
        setIsDiacriticsModalOpen(false)
    }

    return (
        <>
            <div>
                <img width={"150px"} height={"150px"} src={"/logos/setting-logo.png"}
                     alt={"setting-logo"}/>
            </div>
            <div className={"selector"}>
                <h3>Custom Game
                    <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                                onClick={openCustomGameModal} sx={{color: "#a5a7d7", boxShadow: 0}}>
                        <HelpOutlineIcon fontSize={"small"}/>
                    </IconButton>
                </h3>
                <Modal
                    className={"modal-message"}
                    open={isCustomGameModalOpen}
                    sx={{mt: 10, ml: 4, mr: 4, marginBottom: 35, backgroundColor: "#ffffff"}}
                >
                    <Box>
                        <Button id={"close-modal"} onClick={closeCustomGameModal}
                                sx={{
                                    mt: 5,
                                    mb: 2,
                                    color: "#ffffff",
                                    boxShadow: 0
                                }}><CancelIcon/></Button>
                        <Typography sx={{ml: 3, color: "#ffffff"}}>
                            Minimum number of cards
                        </Typography>
                        <Typography sx={{mr: 3, ml: 3, mt: 2, color: "#ffffff"}}>
                            In order to play with your own cards, you must have
                            at least 4 different cards each set for beginner level,
                            6 for intermediate level and 8 for advanced level.
                        </Typography>
                    </Box>
                </Modal>
                <FormControl sx={{m: 1, width: 225, textAlign: "center"}}>
                    <Select
                        labelId="Custom-game"
                        id="Custom-game"
                        value={selectedCustomGame}
                        onChange={changeSelectedCustomGame}
                    >
                        {countCardSets.filter(setName => setName.count > 4)
                            .map(setName => <MenuItem
                                key={setName.name}
                                value={setName.name}
                            >{setName.name} ({setName.count})</MenuItem>)}
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
                <h3 id={"entry"}>Game Level
                    <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                                onClick={openLevelsModal} sx={{color: "#a5a7d7", boxShadow: 0}}>
                        <HelpOutlineIcon fontSize={"small"}/>
                    </IconButton>
                </h3>
                <Modal
                    className={"modal-level"}
                    open={isLevelsModalOpen}
                    sx={{mt: 10, ml: 4, mr: 4, marginBottom: 35, backgroundColor: "#ffffff"}}
                >
                    <Box>
                        <Button id={"close-modal"} onClick={closeLevelsModal}
                                sx={{
                                    mt: 5,
                                    mb: 2,
                                    color: "#ffffff",
                                    boxShadow: 0
                                }}><CancelIcon/></Button>
                        <Typography sx={{ml: 3, color: "#ffffff"}}>
                            Three levels of game
                        </Typography>
                        <Typography sx={{mr: 3, ml: 3, mt: 2, color: "#ffffff"}}>
                            Concentration with 3x3 cards for beginner, 3X4 cards for intermediate and 4x4 cards for
                            advanced player.
                        </Typography>
                    </Box>
                </Modal>
                <FormControl sx={{m: 1, width: 225, textAlign: "center"}}>
                    <InputLabel id="Hiragana-level">HIRAGANA</InputLabel>
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
                        <MenuItem value={"small"}>Beginner</MenuItem>
                        <MenuItem value={"medium"}>Intermediate</MenuItem>
                        <MenuItem value={"large"}>Advanced</MenuItem>
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
                        <MenuItem value={"small"}>Beginner</MenuItem>
                        <MenuItem value={"medium"}>Intermediate</MenuItem>
                        <MenuItem value={"large"}>Advanced</MenuItem>
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
                        <MenuItem value={"small"}>Beginner</MenuItem>
                        <MenuItem value={"medium"}>Intermediate</MenuItem>
                        <MenuItem value={"large"}>Advanced</MenuItem>
                    </Select>
                    <FormHelperText>current
                        level: {setUserLevelText(3)}</FormHelperText>
                </FormControl>
                <IconButton id={"save"} size="small" disableRipple={true} sx={{
                    maxWidth: 60,
                    color: "#FDF6E1",
                    background: "#508356",
                    boxShadow: 0,
                    borderRadius: '10px'
                }} onClick={() => {
                    updateLevels()
                }}>
                    <CheckIcon/>
                </IconButton>
            </div>
            <div className={"selector"}>
                <h3 id={"entry"}>Expansion cards
                    <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                                onClick={openDiacriticsModal} sx={{color: "#a5a7d7", boxShadow: 0}}>
                        <HelpOutlineIcon fontSize={"small"}/>
                    </IconButton>
                </h3>
                <Modal
                    className={"modal-diacritics"}
                    open={isDiacriticsModalOpen}
                    sx={{mt: 10, ml: 4, mr: 4, marginBottom: 35, backgroundColor: "#ffffff"}}
                >
                    <Box>
                        <Button id={"close-modal"} onClick={closeDiacriticsModal}
                                sx={{
                                    mt: 5,
                                    mb: 2,
                                    color: "#ffffff",
                                    boxShadow: 0
                                }}><CancelIcon/></Button>
                        <Typography sx={{ml: 3, color: "#ffffff"}}>
                            Diacritics of Hiragana and Katakana
                        </Typography>
                        <Typography sx={{mr: 3, ml: 3, mt: 2, color: "#ffffff"}}>
                            You can expand your knowledge of Hiragana and Katakana with diacritics cards.
                        </Typography>
                    </Box>
                </Modal>
                <FormControl sx={{m: 1, width: 225, textAlign: "center"}}>
                    <InputLabel id="Hiragana-diacritics">HIRAGANA</InputLabel>
                    <Select
                        labelId="Hiragana-diacritics"
                        id="Hiragana-diacritics"
                        value={(hiraganaDiacritics)? "on":"off"}
                        label="Hiargana"
                        onChange={changeHiraganaDiacritics}
                    >
                        <MenuItem value={"on"}>ON</MenuItem>
                        <MenuItem value={"off"}>OFF</MenuItem>
                    </Select>
                    <FormHelperText>current setting: {setUserDiacriticsText(0)}</FormHelperText>
                </FormControl>
                <FormControl sx={{m: 1, width: 225, textAlign: "center"}}>
                    <InputLabel id="Katakana-diacritics">KATAKANA</InputLabel>
                    <Select
                        labelId="Katakana-diacritics"
                        id="Katakana-diacritics"
                        value={(katakanaDiacritics)? "on":"off"}
                        label="Katakana"
                        onChange={changeKatakanaDiacritics}
                    >
                        <MenuItem value={"on"}>ON</MenuItem>
                        <MenuItem value={"off"}>OFF</MenuItem>
                    </Select>
                    <FormHelperText>current setting: {setUserDiacriticsText(1)}</FormHelperText>
                </FormControl>
                <IconButton id={"save"} size="small" disableRipple={true} sx={{
                    maxWidth: 60,
                    color: "#FDF6E1",
                    background: "#508356",
                    boxShadow: 0,
                    borderRadius: '10px',
                    marginBottom: '50px'
                }} onClick={() => {
                    updateDiacritics()
                }}>
                    <CheckIcon/>
                </IconButton>
            </div>
        </>
    );
}
