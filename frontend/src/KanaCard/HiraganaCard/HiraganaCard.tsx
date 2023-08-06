import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "../KanaCard.ts";
import {IconButton, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import FlipCard from "../../FlipCard.tsx";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import './HiraganaCard.css'

export default function HiraganaCard() {

    const [hiraganaCards, setHiraganaCards] = useState<{ cardsGrid: KanaCard[][] }>({cardsGrid: [[]]});
    const [isMatched, setIsMatched] = useState<{ isMatched: boolean[][] }>({isMatched: [[]]});

    useEffect(() => {
        loadHiraganaCards()
    }, [])

    function loadHiraganaCards() {
        axios.get<{ cardsGrid: KanaCard[][], isMatched: boolean[][] }>(
            "/api/kana_cards/hiragana")
            .then(response => response.data)
            .then(data => {
                    const responseDataCardsGrid = {cardsGrid: data.cardsGrid}
                    const responseDataBooleanArray = {isMatched: data.isMatched}
                    setHiraganaCards(responseDataCardsGrid)
                    setIsMatched(responseDataBooleanArray)
                }
            )
            .catch(console.error)
    }

    return (
        <>
            <div>
                <img width={"150px"} height={"150px"} src="/logos/hiragana-logo.png" alt="hiragana-logo"/>
            </div>
            <FlipCard cardsGrid={hiraganaCards}
                      isMatched={isMatched}
                      imagePath={"/hiragana-images/h-"}
                      colorStyle={"#D05F5F"}/>
            <div>
                <Stack direction="row" spacing={0.4} justifyContent={"end"}>
                    <IconButton size={"small"}
                                sx={{background: "#73683F", boxShadow: 0}}>
                        <Link to="/"><HomeRoundedIcon/></Link>
                    </IconButton>
                    <IconButton size={"small"} onClick={loadHiraganaCards}
                                sx={{background: "#4D6A9A", color: "#FDF6E1", boxShadow: 0}}>
                        <ReplayRoundedIcon/>
                    </IconButton>
                </Stack>
            </div>
        </>
    )

}
