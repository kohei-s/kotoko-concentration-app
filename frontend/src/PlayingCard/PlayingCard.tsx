import FlipCard from "../GameLogic/FlipCard.tsx";

export default function PlayingCard() {

    return (
        <>
            <FlipCard
                gameSize={"small"}
                gameName={"playing-cards"}
                colorStyle={"#73683F"}
                colorStyle2={"#4D6A9A"}
                colorStyle3={"#D05F5F"}/>
        </>
    )

}
