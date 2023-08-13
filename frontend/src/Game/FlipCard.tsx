import {useCallback, useEffect, useState} from "react";
import {GameCard} from "./GameCard.ts";
import axios from "axios";
import './FlipCard.css';
import {IconButton, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import {createGameCards} from "./createGameCards.ts";
import Confetti from 'react-confetti'

type Props = {
    gameSize: string
    gameName: string
    colorStyle: string
    colorStyle2: string
    colorStyle3: string
}
export default function FlipCard(props: Props) {

    const [boardId, setBoardId] = useState<string>("")
    const [gameCards, setGameCards] = useState<{ cardsGrid: GameCard[][] }>({cardsGrid: [[]]});
    const [isMatched, setIsMatched] = useState<{ isMatched: boolean[][] }>({isMatched: [[]]});
    const [firstCard, setFirstCard] = useState<{ x: number, y: number }>();
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [matchCount, setMatchCount] = useState<number>(0);


    const loadGameCards = useCallback(() => {
        if ((props.gameName === "hiragana") || (props.gameName === "katakana") || (props.gameName === "playing-cards")) {
            const cardsData = createGameCards(props.gameName, props.gameSize);
            const setId = cardsData.id
            const cardGridData = {cardsGrid: cardsData.cardGrid}
            const isMatchedData = {isMatched: cardsData.isMatched}
            setBoardId(setId)
            setGameCards(cardGridData)
            setIsMatched(isMatchedData)
            setMatchCount(0)
        } else {
            axios.get<{ boardId: string, cardsGrid: GameCard[][], isMatched: boolean[][] }>(
                "/api/game_cards?" + "size=" + props.gameSize + "&name=" + props.gameName)
                .then(response => response.data)
                .then(data => {
                        const responseDataBoardId = data.boardId
                        const responseDataCardsGrid = {cardsGrid: data.cardsGrid}
                        const responseDataBooleanArray = {isMatched: data.isMatched}
                        setBoardId(responseDataBoardId)
                        setGameCards(responseDataCardsGrid)
                        setIsMatched(responseDataBooleanArray)
                        setMatchCount(0)
                    }
                )
                .catch(console.error)
        }
    }, [props.gameName, props.gameSize]);

    useEffect(() => {
        loadGameCards()
    }, [loadGameCards]);

    function flipCard(rowIndex: number, columnIndex: number) {
        if ((isMatched.isMatched[rowIndex][columnIndex]) || (isLocked)) {
            return
        }

        const selectedCard = gameCards.cardsGrid[rowIndex][columnIndex]
        const newIsMatched = JSON.parse(JSON.stringify(isMatched)) as { isMatched: boolean[][] }

        if (firstCard) {
            setIsLocked(true)

            if (selectedCard.title === gameCards.cardsGrid[firstCard.x][firstCard.y].title) {
                newIsMatched.isMatched[rowIndex][columnIndex] = true
                newIsMatched.isMatched[firstCard.x][firstCard.y] = true
                setIsMatched(newIsMatched)
                setIsLocked(false)
                setFirstCard(undefined)
                setMatchCount(matchCount + 1)
            } else {
                newIsMatched.isMatched[rowIndex][columnIndex] = true
                setIsMatched(newIsMatched)
                setTimeout(() => {
                    newIsMatched.isMatched[rowIndex][columnIndex] = false
                    newIsMatched.isMatched[firstCard.x][firstCard.y] = false
                    setIsMatched(newIsMatched)
                    setIsLocked(false)
                    setFirstCard(undefined)
                }, 800)
            }
        } else {
            newIsMatched.isMatched[rowIndex][columnIndex] = true
            setIsMatched(newIsMatched)
            setFirstCard({x: rowIndex, y: columnIndex})
        }
    }

    function renderCardImage(card: GameCard) {
        if (card.title === "empty") {
            return <img src="/logos/kotoko-logo.png" alt="start"/>;
        } else if (props.gameName === "hiragana" || props.gameName === "katakana" || props.gameName === "playing-cards") {
            const src = `/${props.gameName}-images/${props.gameName}-${card.title}.png`;
            const alt = `${props.gameName}${card.title}${card.cardSetName}`;
            return <img src={src} alt={alt}/>;
        } else {
            return card.title;
        }
    }

    function confetti() {
        if (((props.gameSize === "small") && (matchCount === 4)) || ((props.gameSize === "medium") && (matchCount === 6)) || ((props.gameSize === "large") && (matchCount === 8))) {
            return <Confetti width={390} height={300}></Confetti>
        }
    }

    return (
        <>
            <div>
                <img width={"150px"} height={"150px"} src={"/logos/" + props.gameName + "-logo.png"}
                     alt={props.gameName + "-logo"}/>
                {confetti()}
            </div>
            <div className={"concentration"}>
                {gameCards.cardsGrid.map((row, rowIndex) => {
                    return row.map((card, columnIndex) => {
                        if (!card) {
                            return null;
                        }
                            return <div className={"card"}
                                        key={`${rowIndex}-${columnIndex}` + boardId}
                                        onClick={() => flipCard(rowIndex, columnIndex)}>

                                <div className={"front" + (isMatched.isMatched[rowIndex][columnIndex] ? "" : " flip")}>
                                    {renderCardImage(card)}
                                </div>
                                <div style={{background: props.colorStyle}}
                                     className={"back" + (isMatched.isMatched[rowIndex][columnIndex] ? " flip" : "")}>
                                </div>
                            </div>
                        }
                    )
                })}
            </div>
            <div>
                <Stack direction="row" spacing={0.4} justifyContent={"end"}>
                    <IconButton size={"small"}
                                sx={{background: props.colorStyle2, boxShadow: 0}}>
                        <Link to="/"><HomeRoundedIcon/></Link>
                    </IconButton>
                    <IconButton size={"small"}
                                sx={{background: props.colorStyle3, color: "#FDF6E1", boxShadow: 0}}
                                onClick={loadGameCards}>
                        <ReplayRoundedIcon/>
                    </IconButton>
                </Stack>
            </div>
        </>
    )

}
