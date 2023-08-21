import FlipCard from "./FlipCard.tsx";
import {UserInfo} from "../Security/UserInfo.ts";

type Props = {
    update: (userInfo: UserInfo) => void
    gameSize: string
    gameName: string
    userInfo: UserInfo | undefined
}
export default function createGameBoard(props: Props) {

    function setColorStyle (index: number, gameName: string) {
        const hiraganaColors: string[] = ["#D05F5F", "#73683F", "#4D6A9A"];
        const katakanaColors: string[] = ["#4D6A9A", "#D05F5F", "#73683F"];
        const playingCardsColors: string[] = ["#73683F", "#4D6A9A", "#D05F5F"];
        const customColors: string[] = ["#587c18","#233d67", "#834242"];

        switch (gameName){
            case "hiragana":
                return hiraganaColors[index];
            case "katakana":
                return katakanaColors[index];
            case "playing-cards":
                return playingCardsColors[index];
            default:
                return customColors[index];
        }
    }

    return <FlipCard
                gameSize={props.gameSize}
                gameName={props.gameName}
                colorStyle={setColorStyle(0, props.gameName)}
                colorStyle2={setColorStyle(1, props.gameName)}
                colorStyle3={setColorStyle(2, props.gameName)}
                userInfo={props.userInfo}
                update={props.update}/>;

}
