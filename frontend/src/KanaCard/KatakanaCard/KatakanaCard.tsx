import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "../KanaCard.ts";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import FlipCard from "../../FlipCard.tsx";

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
                <img width={"150px"} height={"150%"} src="/logos/katakana-logo-red.png" alt="katakana-logo"/>
            </div>
            <FlipCard
                cardsGrid={katakanaCards}
                isMatched={isMatched}
                imagePath={"/katakana-images/k-"}/>
            <div>
                <Button color="inherit">
                    <Link to="/">back</Link>
                </Button>
                <Button color="secondary" onClick={loadKatakanaCards}>
                    restart
                </Button>
            </div>
        </>
    )

}