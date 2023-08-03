import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "./KanaCard.ts";
import './HiraganaCard.css';

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
        <div className={"container"}>
            {hiraganaCards.cardsGrid.map((row, rowIndex) => {
                return (row).map((card, columIndex) => {
                        return <div className={"card"}
                                    key={`${rowIndex}-${columIndex}`}>
                            <div className={"front"}>
                                <div>{card.kana}</div>
                                <div>{card.reading}</div>
                            </div>
                            <div className={"back"}>
                            </div>
                        </div>
                    }
                )
            })}
        </div>
    )

}
