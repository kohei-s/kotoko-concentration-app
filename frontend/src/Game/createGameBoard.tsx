import FlipCard from "./FlipCard.tsx";
import {UserInfo} from "../UserInfo.ts";

type Props = {
    update: (userInfo: UserInfo) => void
    gameSize: string
    gameName: string
    userInfo: UserInfo | undefined
}
export default function createGameBoard(props: Props) {

    return <FlipCard
                gameSize={props.gameSize}
                gameName={props.gameName}
                colorStyle={(props.gameName==="hiragana")? "#D05F5F": (props.gameName==="katakana")? "#4D6A9A": (props.gameName==="playing-cards")? "#73683F": "#587c18"}
                colorStyle2={(props.gameName==="hiragana")? "#73683F": (props.gameName==="katakana")? "#D05F5F" : (props.gameName==="playing-cards")? "#4D6A9A" : "#233d67"}
                colorStyle3={(props.gameName==="hiragana")? "#4D6A9A" : (props.gameName==="katakana")? "#73683F" : (props.gameName==="playing-cards")? "#D05F5F" : "#834242"}
                userInfo={props.userInfo}
                update={props.update}/>;

}
