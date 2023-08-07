import './PlayingCard.css';
import {Link} from "react-router-dom";
import {IconButton, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import './PlayingCard.css'
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import FlipPlayingCard from "./FlipPlayingCard.tsx";

export default function PlayingCard() {

    const gameSize = "small";
    const [playingCards, setPlayingCards] = useState<string[]>([]);
    const [isMatched, setIsMatched] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false])

    useEffect(
        () => {
            loadPlayingCards()
        }, []
    )

    function loadPlayingCards() {
        axios.get<string[]>(
            "api/playing_cards/" + gameSize)
            .then((response) => {
                setPlayingCards(response.data)
            })
            .catch(console.error)
    }


    return (
        <>
            <div>
                <img width={"150px"} height={"150px"} src="/logos/cards-logo.png" alt="cards-logo"/>
            </div>
            <FlipPlayingCard playingCards={playingCards}
                             isMatched={isMatched}
                             setIsMatched={setIsMatched}/>
            <div>
                <Stack direction="row" spacing={0.4} justifyContent={"end"}>
                    <IconButton size={"small"}
                                sx={{background: "#4D6A9A", boxShadow: 0}}>
                        <Link to="/"><HomeRoundedIcon/></Link>
                    </IconButton>
                    <IconButton size={"small"} onClick={loadPlayingCards}
                                sx={{background: "#D05F5F", color: "#FDF6E1", boxShadow: 0}}>
                        <ReplayRoundedIcon/>
                    </IconButton>
                </Stack>
            </div>
        </>
    )

}
