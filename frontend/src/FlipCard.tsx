import {useState} from "react";
import {KanaCard} from "./KanaCard/KanaCard.ts";
import './FlipCard.css';

type Props = {
    cardsGrid:{ cardsGrid: KanaCard[][] }
    isMatched: { isMatched: boolean[][] }
    imagePath: string
}
export default function FlipCard(props: Props) {

    const [firstCard, setFirstCard] = useState<{ x: number, y: number }>();

    function flipCard(rowIndex: number, columnIndex: number) {
        if (props.isMatched.isMatched[rowIndex][columnIndex]) {
            return
        }

        const selectedCard = props.cardsGrid.cardsGrid[rowIndex][columnIndex]
        if (firstCard) {
            if (selectedCard.reading === props.cardsGrid.cardsGrid[firstCard.x][firstCard.y].reading) {
                props.isMatched.isMatched[rowIndex][columnIndex] = true
                props.isMatched.isMatched[firstCard.x][firstCard.y] = true
                setFirstCard(undefined)
            } else {
                props.isMatched.isMatched[firstCard.x][firstCard.y] = false;
                setFirstCard(undefined);
            }
        } else {
            props.isMatched.isMatched[rowIndex][columnIndex] = true
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
                            <div className={"back" + (props.isMatched.isMatched[rowIndex][columnIndex] ? " flip" : "")}>
                            </div>
                        </div>
                    }
                )
            })}
        </div>
    )

}
