import {useCallback, useEffect, useState} from "react";
import {GameCard} from "./GameCard.ts";
import axios from "axios";
import {IconButton, Stack} from "@mui/material";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import {createGameCards} from "./createGameCards.ts";
import Confetti from 'react-confetti'
import {UserInfo} from "../Security/UserInfo.ts";
import './FlipCard.css';

type Props = {
    gameSize: string
    gameName: string
    colorStyle: string
    colorStyle2: string
    colorStyle3: string
    userInfo: UserInfo | undefined
    update: (userInfo: UserInfo) => void
}
export default function FlipCard(props: Props) {

    const [boardId, setBoardId] = useState<string>("")
    const [gameCards, setGameCards] = useState<{ cardsGrid: GameCard[][] }>({cardsGrid: [[]]});
    const [isMatched, setIsMatched] = useState<{ isMatched: boolean[][] }>({isMatched: [[]]});
    const [firstCard, setFirstCard] = useState<{ x: number, y: number }>();
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [matchCount, setMatchCount] = useState<number>(0);
    const [userData, setUserData] = useState<UserInfo>();
    const [userAchievement, setUserAchievement] = useState<string>("");
    const [userWordbook, setUserWordbook] = useState<string[]>([]);

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
        if (!boardId) {
            loadGameCards()
        }
        setUserData(props.userInfo)
        if (props.userInfo) {
            setUserAchievement(props.userInfo.achievement)
            setUserWordbook(props.userInfo.wordbook)
        }
    }, [loadGameCards, props.userInfo, boardId]);


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
                updateUserInfo()

                if (userData && userData.wordbook) {
                    const wordList = userData.wordbook
                    if (wordList.includes(selectedCard.id)) {
                        return
                    } else {
                        wordList.push(selectedCard.id)
                        setUserWordbook(wordList)
                    }
                } else {
                    console.log("Loading data...")
                }

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
        } else if (props.gameName === "kanji") {
            const src = `/${props.gameName}-images/${props.gameName}-${card.title.slice(2)}.png`;
            const alt = `${props.gameName}${card.title.slice(2)}${card.cardSetName}`;
            return <img src={src} alt={alt}/>;
        } else {
            return card.title;
        }
    }

    function renderGameTitle() {
        if ((props.gameName === "hiragana") || (props.gameName === "katakana") || (props.gameName === "playing-cards")) {
            return <img width={"150px"} height={"150px"} src={"/logos/" + props.gameName + "-logo.png"}
                        alt={props.gameName + "-logo"}/>
        } else {
            return <img width={"150px"} height={"150px"} src={"/logos/custom-logo.png"}
                        alt={props.gameName + "-logo"}/>
        }
    }

    function displayCustomGameName() {
        if ((props.gameName !== "hiragana") && (props.gameName !== "playing-cards") && (props.gameName !== "katakana")) {
            return <div className={"game-name"}>current set: <span>{props.gameName}</span></div>
        }
    }

    function updateUserInfo() {
        if (((props.gameSize === "small") && (matchCount === 3)) || ((props.gameSize === "medium") && (matchCount === 5)) || ((props.gameSize === "large") && (matchCount === 7))) {
            const newAchievement = String(Number(userAchievement) + 1)
            setUserAchievement(newAchievement)
            const updatedUserInfo: UserInfo = {
                username: userData?.username as string,
                achievement: newAchievement,
                wordbook: userWordbook,
                diacritics: userData?.diacritics as boolean[],
                levels: userData?.levels as string[]
            }
            props.update(updatedUserInfo)
        }
    }

    function setClassName() {
        switch (props.gameSize) {
            case "small":
                return "concentration-small";
            case "medium":
                return "concentration-medium";
            default:
                return "concentration-large"
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
                <Stack direction="row" spacing={0.4}>
                    {renderGameTitle()}
                    {displayCustomGameName()}
                </Stack>
                {confetti()}
            </div>
            <div
                className={setClassName()}>
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
                                sx={{background: props.colorStyle3, color: "#FDF6E1", boxShadow: 0}}
                                onClick={loadGameCards}>
                        <ReplayRoundedIcon/>
                    </IconButton>
                </Stack>
            </div>
        </>
    )

}
