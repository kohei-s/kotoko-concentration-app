import {Button, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import {UserInfo} from "../UserInfo.ts";
import "./MainPage.css"

type Props = {
    userInfo?: UserInfo
}

export default function MainPage(props: Props) {

    if (!props.userInfo) {
        return "Loading data..."
    }

    const userData = props.userInfo
    let hiraganaLevel: string;
    let katakanaLevel: string;
    let playingCardLevel: string;
    let customLevel: string;

    if (userData.levels.length===0) {
        hiraganaLevel = "small"
        katakanaLevel = "small"
        playingCardLevel = "small"
        customLevel = "small"
    } else {
        hiraganaLevel = userData.levels[0]
        katakanaLevel = userData.levels[1]
        playingCardLevel = userData.levels[2]
        customLevel = userData.levels[3]
    }

    return (
        <>
            <div className={"start"}>
                <img height={"290vm"} src="/logos/kotoko-logo.png" alt="start"/>
            </div>
            <Stack direction="row" spacing={0.5} justifyContent="center">
                <Tooltip title="Hiragana">
                    <Button variant="contained" sx={{background: "#D05F5F", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to={"/game/" + hiraganaLevel + "/hiragana"}>あ</Link>
                    </Button>
                </Tooltip>
                <Tooltip title="Katakana">
                    <Button variant="contained" sx={{background: "#4D6A9A", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to={"/game/" + katakanaLevel + "/katakana"}>ア</Link>
                    </Button>
                </Tooltip>
                <Tooltip title="Playing Card">
                    <Button variant="contained" sx={{background: "#73683F", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to={"/game/" + playingCardLevel + "/playing-cards"}>♥♠</Link>
                    </Button>
                </Tooltip>
                <Tooltip title="Custom Card">
                    <Button variant="contained" sx={{background: "#508356", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to={"/game/" + customLevel + "/testSet"}>★</Link>
                    </Button>
                </Tooltip>
            </Stack>
        </>
    )

}
