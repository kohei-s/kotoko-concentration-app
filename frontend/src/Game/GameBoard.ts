import createGameBoard from "./createGameBoard.tsx";
import {useParams} from "react-router-dom";
import {UserInfo} from "../UserInfo.ts";

type Props = {
    userInfo: UserInfo| undefined
}
export default function GameBoard(props: Props) {

    const params = useParams()
    const size: string = params.gameSize as string;
    const name: string = params.gameName as string;



    if ((size === "small") || (size === "medium") || (size === "large")) {
        if ((name === "hiragana") || (name === "katakana") || (name === "playing-cards") || (name === "testSet")) {
            return createGameBoard(size, name, props.userInfo);
        } else {
            return ("Invalid parameters!");
        }

    }
}
