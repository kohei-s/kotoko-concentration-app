import NewGameCard from "./NewGameCard.tsx";
import {GameCard} from "../GameLogic/GameCard.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import GameCardFrame from "./GameCardFrame.tsx";
import {IconButton, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

export default function GameCardCollection() {

    const [allNonDefaultGameCards, setAllNonDefaultGameCards] = useState<GameCard[]>([])

    useEffect(
        () => {
            loadAllNonDefaultGameCards()
        }, []
    )

    if (!allNonDefaultGameCards) {
        return "Loading cards..."
    }

    function loadAllNonDefaultGameCards() {
        axios.get<GameCard[]>(
            "/api/game_cards/all"
        )
            .then(response => response.data)
            .then(data => {
                const responseDataCardList  =  data.filter(card =>
                    card.cardSetName!=="hiragana" && card.cardSetName!=="katakana" && card.cardSetName!=="playing-cards")
                setAllNonDefaultGameCards(responseDataCardList)
            }).catch(console.error)
    }


    return (
        <>
            <div>
                <Stack direction="row" spacing={0.4} justifyContent={"end"}>
                    <IconButton size={"small"}
                                sx={{background: "#D05F5F", boxShadow: 0}}>
                        <Link to="/"><HomeRoundedIcon/></Link>
                    </IconButton>
                    <IconButton size={"small"}
                                sx={{background: "#4D6A9A", boxShadow: 0, borderRadius: '15px'}}>
                        <ReplayRoundedIcon/>
                    </IconButton>
                </Stack>
            </div>
            <div>
                <img width={"150px"} height={"150px"} src={"/logos/collection-logo.png"}
                     alt={"collection-logo"}/>
            </div>
            <NewGameCard></NewGameCard>
            {allNonDefaultGameCards.map(card => <GameCardFrame
                key={card.id}
                gameCard={card}
                onGameCardChange={loadAllNonDefaultGameCards}
                cardSetName={card.cardSetName}
                title={card.title}></GameCardFrame>)}
        </>
    )

}
