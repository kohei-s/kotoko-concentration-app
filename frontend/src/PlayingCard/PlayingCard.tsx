import './PlayingCard.css';
import {Link} from "react-router-dom";
import {IconButton, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import './PlayingCard.css'
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

export default function PlayingCard() {

    const gameSize = "small";
    const [playingCards, setPlayingCards] = useState<string[]>([""]);

    function loadPlayingCards() {
        axios.get<string[]>(
            "api/playing_cards/" + gameSize)
            .then((response) => {
                setPlayingCards(response.data)
            })
            .catch(console.error)
    }

    useEffect(
        () => {
            loadPlayingCards()
        }, []
    )

    return (
        <>
            <div>
                <img width={"150px"} height={"150px"} src="/logos/cards-logo.png" alt="cards-logo"/>
            </div>
            <div className={"playingCard-concentration"}>
                {playingCards.map((playingCard: string) =>
                    <div className={"playingCard"} key={playingCard}>
                        <div className={"front"}>
                            {playingCard}
                        </div>
                        <div className={"back"}>
                        </div>
                    </div>)
                }
            </div>
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
        </>
    )

}
