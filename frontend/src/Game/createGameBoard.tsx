import FlipCard from "./FlipCard.tsx";
import {UserInfo} from "../UserInfo.ts";

type Props = {
    update: (userInfo: UserInfo) => void
    gameSize: string
    gameName: string
    userInfo: UserInfo | undefined
}
export default function createGameBoard(props: Props) {

    switch (props.gameName) {
        case "hiragana":
            return <FlipCard
                gameSize={props.gameSize}
                gameName={props.gameName}
                colorStyle={"#D05F5F"}
                colorStyle2={"#73683F"}
                colorStyle3={"#4D6A9A"}
                userInfo={props.userInfo}
                update={props.update}/>;
        case "katakana":
            return <FlipCard
                gameSize={props.gameSize}
                gameName={props.gameName}
                colorStyle={"#4D6A9A"}
                colorStyle2={"#D05F5F"}
                colorStyle3={"#73683F"}
                userInfo={props.userInfo}
                update={props.update}/>;
        case "playing-cards":
            return <FlipCard
                gameSize={props.gameSize}
                gameName={props.gameName}
                colorStyle={"#73683F"}
                colorStyle2={"#4D6A9A"}
                colorStyle3={"#D05F5F"}
                userInfo={props.userInfo}
                update={props.update}/>;
        default:
            return <FlipCard
                gameSize={props.gameSize}
                gameName={props.gameName}
                colorStyle={"#587c18"}
                colorStyle2={"#233d67"}
                colorStyle3={"#834242"}
                userInfo={props.userInfo}
                update={props.update}/>;
    }

}
