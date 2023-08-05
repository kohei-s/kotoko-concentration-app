import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "./KanaCard.ts";
import './HiraganaCard.css';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

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
            if (selectedCard.reading === hiraganaCards.cardsGrid[firstCard.x][firstCard.y].reading) {
                setIsMatched(prevState => ({
                    ...prevState,
                    isMatched: {
                        ...prevState.isMatched,
                        [rowIndex]: {
                            ...prevState.isMatched[rowIndex],
                            [columnIndex]: true,
                        },
                        [firstCard.x]: {
                            ...prevState.isMatched[firstCard.x],
                            [firstCard.y]: true,
                        },
                    },
                }));
                setFirstCard(undefined)
            } else {
                isMatched.isMatched[firstCard.x][firstCard.y] = false;
                setFirstCard(undefined);
            }
        } else {
            isMatched.isMatched[rowIndex][columnIndex] = true
            setFirstCard({x: rowIndex, y: columnIndex})
        }
    }


    return (
        <>
            <div>

                <img width={"150px"} height={"150px"} src="/logos/hiragana-logo-blue.png" alt="hiragana-logo"/>

            </div>
            <div className={"concentration"}>
                {hiraganaCards.cardsGrid.map((row, rowIndex) => {
                    return (row).map((card, columnIndex) => {
                            return <div className={"h-card"}
                                        key={`${rowIndex}-${columnIndex}`} onClick={() => flipCard(rowIndex, columnIndex)}>
                                <div className={"front" + (isMatched.isMatched[rowIndex][columnIndex] ? "" : " flip")}>
                                    {(card.reading === "empty") ? <img src="/logos/kotoko-logo.png" alt="start"/> :
                                        <img src={"/hiragana-images/h-" + card.reading + ".png"}
                                             alt={"hiragana-" + card.reading}/>
                                    }
                                </div>
                                <div className={"back" + (isMatched.isMatched[rowIndex][columnIndex] ? " flip" : "")}>
                                </div>
                            </div>
                        }
                    )
                })}
            </div>
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
