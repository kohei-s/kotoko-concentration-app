import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "./KanaCard.ts";
import './KatakanaCard.css';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

export default function KatakanaCard() {

    const [katakanaCards, setKatakanaCards] = useState<{ cardsGrid: KanaCard[][] }>({cardsGrid: [[]]});
    const [isMatched, setIsMatched] = useState<{ isMatched: boolean[][] }>({isMatched: [[]]});
    const [firstCard, setFirstCard] = useState<{ x: number, y: number }>();

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

    function flipCard(rowIndex: number, columnIndex: number) {
        if (isMatched.isMatched[rowIndex][columnIndex]) {
            return
        }

        const selectedCard = katakanaCards.cardsGrid[rowIndex][columnIndex]
        if (firstCard) {
            if (selectedCard.reading === katakanaCards.cardsGrid[firstCard.x][firstCard.y].reading) {
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
                <img width={"150px"} height={"150%"} src="/logos/katakana-logo-red.png" alt="katakana-logo"/>
            </div>
            <div className={"concentration"}>
                {katakanaCards.cardsGrid.map((row, rowIndex) => {
                    return (row).map((card, columnIndex) => {
                            return <div className={"k-card"}
                                        key={`${rowIndex}-${columnIndex}`} onClick={() => flipCard(rowIndex, columnIndex)}>
                                <div className={"front" + (isMatched.isMatched[rowIndex][columnIndex] ? "" : " flip")}>
                                    {(card.reading === "empty") ? <img src="/logos/kotoko-logo.png" alt="start"/> :
                                        <img src={"/katakana-images/k-" + card.reading + ".png"}
                                             alt={"katakana-" + card.reading}/>
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
                <Button color="secondary" onClick={loadKatakanaCards}>
                    restart
                </Button>
            </div>
        </>
    )

}