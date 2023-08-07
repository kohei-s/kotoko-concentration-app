import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "../KanaCard.ts";
import {Link} from "react-router-dom";
import {IconButton, Stack} from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import FlipCard from "../../FlipCard.tsx";
import './KatakanaCard.css'

export default function KatakanaCard() {

    const [katakanaCards, setKatakanaCards] = useState<{ cardsGrid: KanaCard[][] }>({cardsGrid: [[]]});
    const [isMatched, setIsMatched] = useState<{ isMatched: boolean[][] }>({isMatched: [[]]});

    useEffect(() => {
        loadKatakanaCards()
    }, [])

    function loadKatakanaCards() {
        axios.get<{ cardsGrid: KanaCard[][], isMatched: boolean[][] }>(
            "/api/kana_cards/katakana")
            .then(response => response.data)
            .then(data => {
                    const responseDataCardsGrid = {cardsGrid: data.cardsGrid}
                    const responseDataBooleanArray = {isMatched: data.isMatched}
                    setKatakanaCards(responseDataCardsGrid)
                    setIsMatched(responseDataBooleanArray)
                }
            )
            .catch(console.error)
    }

    return (
        <>
            <div>
                <img width={"150px"} height={"150%"} src="/logos/katakana-logo-blue.png" alt="katakana-logo"/>
            </div>
            <FlipCard
                cardsGrid={katakanaCards}
                isMatched={isMatched}
                imagePath={"/katakana-images/k-"}
                setIsMatched={setIsMatched}
                colorStyle={"#4D6A9A"}/>
            <div>
                <Stack direction="row" spacing={0.4} justifyContent={"end"}>
                    <IconButton size={"small"}
                                sx={{background: "#D05F5F", boxShadow: 0}}>
                        <Link to="/"><HomeRoundedIcon/></Link>
                    </IconButton>
                    <IconButton size={"small"} onClick={loadKatakanaCards}
                                sx={{background: "#73683F", color: "#FDF6E1", boxShadow: 0}}>
                        <ReplayRoundedIcon/>
                    </IconButton>
                </Stack>
            </div>
        </>
    )

}