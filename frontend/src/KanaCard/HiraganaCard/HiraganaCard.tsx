import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "../KanaCard.ts";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import FlipCard from "../../FlipCard.tsx";

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
                <img width={"150px"} height={"150px"} src="/logos/hiragana-logo-blue.png" alt="hiragana-logo"/>
            </div>
            <FlipCard cardsGrid={hiraganaCards}
                      isMatched={isMatched}
                      imagePath={"/hiragana-images/h-"}/>
            <div>
                <Button color="inherit">
                    <Link to="/">back</Link>
                </Button>
                <Button onClick={loadHiraganaCards}>
                    restart
                </Button>
            </div>
        </>
    )

}
