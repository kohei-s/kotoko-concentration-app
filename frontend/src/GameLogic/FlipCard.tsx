import {useEffect, useState} from "react";
import {GameCard} from "./GameCard.ts";
import axios from "axios";
import './FlipCard.css';
import {IconButton, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

type Props = {
    gameSize: "small" | "medium" | "large"
    gameName: string
    colorStyle: string
    colorStyle2: string
    colorStyle3: string
}
export default function FlipCard(props: Props) {

    const [, setBoardId] = useState<string>("")
    const [playingCards, setPlayingCards] = useState<{ cardsGrid: GameCard[][] }>({cardsGrid: [[]]});
    const [isMatched, setIsMatched] = useState<{ isMatched: boolean[][] }>({isMatched: [[]]});
    const [firstCard, setFirstCard] = useState<{ x: number, y: number }>();
    const [isLocked, setIsLocked] = useState<boolean>(false);

    useEffect(() => {
        loadPlayingCardGame()
    },)

    function loadPlayingCardGame() {
        axios.get<{ boardId: string, cardsGrid: GameCard[][], isMatched: boolean[][] }>(
            "/api/playing_cards?" + "size=" + props.gameSize + "&name=" + props.gameName)
            .then(response => response.data)
            .then(data => {
                    const responseDataBoardId = data.boardId
                    const responseDataCardsGrid = {cardsGrid: data.cardsGrid}
                    const responseDataBooleanArray = {isMatched: data.isMatched}
                    setBoardId(responseDataBoardId)
                    setPlayingCards(responseDataCardsGrid)
                    setIsMatched(responseDataBooleanArray)
                }
            )
            .catch(console.error)
    }

    function flipCard(rowIndex: number, columnIndex: number) {
        if ((isMatched.isMatched[rowIndex][columnIndex]) || (isLocked)) {
            return
        }

        const selectedCard = playingCards.cardsGrid[rowIndex][columnIndex]
        const newIsMatched = JSON.parse(JSON.stringify(isMatched)) as { isMatched: boolean[][] }

        if (firstCard) {
            setIsLocked(true)

            if (selectedCard.title === playingCards.cardsGrid[firstCard.x][firstCard.y].title) {
                newIsMatched.isMatched[rowIndex][columnIndex] = true
                newIsMatched.isMatched[firstCard.x][firstCard.y] = true
                setIsMatched(newIsMatched)
                setIsLocked(false)
                setFirstCard(undefined)
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

    return (
        <>
            <div>
                <img width={"150px"} height={"150px"} src={"/logos/" + props.gameName + "-logo.png"} alt={props.gameName + "-logo"}/>
            </div>
            <div className={"concentration"}>
                {playingCards.cardsGrid.map((row, rowIndex) => {
                    return (row).map((card, columnIndex) => {
                            return <div className={"card"}
                                        key={`${rowIndex}-${columnIndex}`} onClick={() => flipCard(rowIndex, columnIndex)}>

                                <div className={"front" + (isMatched.isMatched[rowIndex][columnIndex] ? "" : " flip")}>

                                    {(card.title === "empty") ? <img src="/logos/kotoko-logo.png" alt="start"/> :
                                        <img
                                            src={props.gameName + "-" + card.title + ".png"}     //name of image data must be changed accordingly
                                            alt={props.gameName + card.title + card.cardSetName}/>
                                    }
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
                                sx={{background: props.colorStyle3, color: "#FDF6E1", boxShadow: 0}}>
                        <ReplayRoundedIcon/>
                    </IconButton>
                </Stack>
            </div>
        </>
    )

}
