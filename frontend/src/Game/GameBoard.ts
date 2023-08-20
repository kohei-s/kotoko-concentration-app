import createGameBoard from "./createGameBoard.tsx";
import {useParams} from "react-router-dom";
import {UserInfo} from "../Security/UserInfo.ts";

type Props = {
    userInfo: UserInfo| undefined
    update: (userInfo:UserInfo) => void
}
export default function GameBoard(props: Props) {

    const params = useParams()
    const size: string = params.gameSize as string;
    const name: string = params.gameName as string;

    if ((size === "small") || (size === "medium") || (size === "large")) {
        if ((name === "hiragana") || (name === "katakana") || (name === "playing-cards") || (name === "kanji")) {

            return createGameBoard({gameSize: size, gameName: name, userInfo: props.userInfo, update: props.update});
        } else {

            return ("Invalid parameters!");
        }
    }
}
