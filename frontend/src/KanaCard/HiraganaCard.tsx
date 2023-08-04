import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "./KanaCard.ts";
import './HiraganaCard.css';

export default function HiraganaCard() {

    const [hiraganaCards, setHiraganaCards] = useState<{ cardsGrid: KanaCard[][] }>({cardsGrid: [[]]});
    const [isMatched, setIsMatched] = useState<{ isMatched: boolean[][] }>({isMatched: [[]]});
    const [firstCard, setFirstCard] = useState<{ x: number, y: number }>();

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

    function flipCard(rowIndex: number, columnIndex: number) {
        if (isMatched.isMatched[rowIndex][columnIndex]) {
            return
        }

        const selectedCard = hiraganaCards.cardsGrid[rowIndex][columnIndex]

        if (firstCard) {
            if (selectedCard.kana === hiraganaCards.cardsGrid[firstCard.x][firstCard.y].kana) {
                isMatched.isMatched[rowIndex][columnIndex] = true
                isMatched.isMatched[firstCard.x][firstCard.y] = true
                setIsMatched(isMatched)
                setFirstCard(undefined)
            } else {
                isMatched.isMatched[firstCard.x][firstCard.y] = false
                setFirstCard(undefined)
            }
        } else {
            isMatched.isMatched[rowIndex][columnIndex] = true
            setFirstCard({x: rowIndex, y: columnIndex})
        }
    }


    return (
        <div className={"concentration"}>
            {hiraganaCards.cardsGrid.map((row, rowIndex) => {
                return (row).map((card, columnIndex) => {
                        return <div className={"card"}
                                    key={`${rowIndex}-${columnIndex}`} onClick={() => flipCard(rowIndex, columnIndex)}>
                                <div className={"front" + (isMatched.isMatched[rowIndex][columnIndex] ? "" : " flip")}>
                                    <div>{card.kana}</div>
                                    <div>{card.reading}</div>
                                </div>

                                <div className={"back" + (isMatched.isMatched[rowIndex][columnIndex] ? " flip" : "")}>
                                    back
                                </div>
                            </div>

                    }
                )
            })}
        </div>
    )

}
