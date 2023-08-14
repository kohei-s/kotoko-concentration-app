import createGameBoard from "./createGameBoard.tsx";
import {useParams} from "react-router-dom";

export default function GameBoard(){

    const params = useParams()
    const size: string = params.gameSize as string;
    const name: string = params.gameName as string;

    if ((size === "small") || (size === "medium") || (size === "large")){
        if ((name === "hiragana")||(name === "katakana")||(name === "playing-cards")||(name === "testSet"))
        return createGameBoard(size, name);
    } else {
        return ("Invalid parameters!");
    }

}
