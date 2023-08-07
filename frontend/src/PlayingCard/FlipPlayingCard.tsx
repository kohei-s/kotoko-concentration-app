import {useState} from "react";

type Props = {
    playingCards: string[]
    isMatched: boolean[]
    setIsMatched: (isMatched: boolean[]) => void;

}
export default function FlipPlayingCard(props: Props){

    const [firstCard, setFirstCard] = useState<string>("");
    const [isLocked, setIsLocked] = useState<boolean>(false);

    function flipPlayingCard(index: number) {
        if ((props.isMatched[index]) || (isLocked)) {
            return
        }

        const selectedCard = props.playingCards[index]
        const newIsMatched = JSON.parse(JSON.stringify(props.isMatched)) as boolean[]

        if (firstCard) {
            setIsLocked(true)

            if (selectedCard.charAt(2)===firstCard.charAt(2)) {
                newIsMatched[props.playingCards.indexOf(firstCard)] = true
                newIsMatched[index] = true
                props.setIsMatched(newIsMatched)
                setIsLocked(false)
                setFirstCard("")
            } else {
                newIsMatched[index] = true
                props.setIsMatched(newIsMatched)
                 setTimeout(() => {
                    newIsMatched[index] = false
                    newIsMatched[props.playingCards.indexOf(firstCard)] = false
                    props.setIsMatched(newIsMatched)
                    setIsLocked(false)
                    setFirstCard("")
                }, 800)
            }
        } else {
            newIsMatched[index] = true
            props.setIsMatched(newIsMatched)
            setFirstCard(selectedCard)
        }

    }
    return(
        <>
            <div className={"playingCard-concentration"}>
                {props.playingCards.map((playingCard: string, index: number) =>
                    <div className={"playingCard"} key={playingCard} onClick={() => flipPlayingCard(index)}>
                        <div className={"front" + (props.isMatched[index]? "" : " flip")}>
                            <img
                                src={"/playing-cards-images/c-" + ((playingCard.slice(0, 1) === "♥") ? "h" : "s") + "-" + playingCard.charAt(2) + ".png"}
                                alt={"cards-" + playingCard}/>
                        </div>
                        <div className={"back" + (props.isMatched[index]? " flip" : "")}>
                        </div>
                    </div>)
                }
            </div>
        </>
    )
}