import {useState} from "react";
import {KanaCard} from "./KanaCard/KanaCard.ts";
import './FlipCard.css';

type Props = {
    cardsGrid: { cardsGrid: KanaCard[][] }
    isMatched: { isMatched: boolean[][] }
    imagePath: string
    colorStyle: string
    setIsMatched: (isMatched: { isMatched: boolean[][] }) => void;
}
export default function FlipCard(props: Props) {

    const [firstCard, setFirstCard] = useState<{ x: number, y: number }>();
    const [isLocked, setIsLocked] = useState<boolean>(false);

    function flipCard(rowIndex: number, columnIndex: number) {
        if ((props.isMatched.isMatched[rowIndex][columnIndex]) || (isLocked)) {
            return
        }

        const selectedCard = props.cardsGrid.cardsGrid[rowIndex][columnIndex]
        const newIsMatched = JSON.parse(JSON.stringify(props.isMatched)) as { isMatched: boolean[][] }

        if (firstCard) {
            setIsLocked(true)

            if (selectedCard.reading === props.cardsGrid.cardsGrid[firstCard.x][firstCard.y].reading) {
                newIsMatched.isMatched[rowIndex][columnIndex] = true
                newIsMatched.isMatched[firstCard.x][firstCard.y] = true
                props.setIsMatched(newIsMatched)
                setIsLocked(false)
                setFirstCard(undefined)
            } else {
                newIsMatched.isMatched[rowIndex][columnIndex] = true
                props.setIsMatched(newIsMatched)
                setTimeout(() => {
                    newIsMatched.isMatched[rowIndex][columnIndex] = false
                    newIsMatched.isMatched[firstCard.x][firstCard.y] = false
                    props.setIsMatched(newIsMatched)
                    setIsLocked(false)
                    setFirstCard(undefined)
                }, 800)
            }
        } else {
            newIsMatched.isMatched[rowIndex][columnIndex] = true
            props.setIsMatched(newIsMatched)
            setFirstCard({x: rowIndex, y: columnIndex})
        }

    }

    return (
        <div className={"concentration"}>
            {props.cardsGrid.cardsGrid.map((row, rowIndex) => {
                return (row).map((card, columnIndex) => {
                        return <div className={"card"}
                                    key={`${rowIndex}-${columnIndex}`} onClick={() => flipCard(rowIndex, columnIndex)}>
                            <div className={"front" + (props.isMatched.isMatched[rowIndex][columnIndex] ? "" : " flip")}>
                                {(card.reading === "empty") ? <img src="/logos/kotoko-logo.png" alt="start"/> :
                                    <img src={props.imagePath + card.reading + ".png"}
                                         alt={"kana-" + card.reading}/>
                                }
                            </div>
                            <div style={{background: props.colorStyle}} className={"back" + (props.isMatched.isMatched[rowIndex][columnIndex] ? " flip" : "")}>
                            </div>
                        </div>
                    }
                )
            })}
        </div>
    )

}
