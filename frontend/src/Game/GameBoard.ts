import createGameBoard from "./createGameBoard.tsx";
import {useParams} from "react-router-dom";
import {UserInfo} from "../Security/UserInfo.ts";

type Props = {
    userInfo: UserInfo | undefined
    update: (userInfo: UserInfo) => void
}
export default function GameBoard(props: Props) {

    const params = useParams()
    const size: string = params.gameSize as string;
    const name: string = params.gameName as string;

    try {
        return createGameBoard({gameSize: size, gameName: name, userInfo: props.userInfo, update: props.update});
    } catch (e) {
        console.log(e)
        return ("Invalid parameters!");
    }

}
