import {Stack} from "@mui/material";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./GameRecord.css"
import {UserInfo} from "../UserInfo.ts";

type Props = {
    userInfo?: UserInfo
}

export default function GameRecord(props: Props) {

    if (!props.userInfo){
        return "Lade..."
    }

    const userData = props.userInfo
    const user: string = userData.username
    const userAchievement: string = userData.achievement
    const uniqueWords: string[] = [...new Set(userData.wordbook)]

    const valueHiragana: number = uniqueWords.filter(word  => word.startsWith("h")).length
    const valueKatakana: number = uniqueWords.filter(word => word.startsWith("k")).length
    const valuePlayingCards: number = uniqueWords.filter(word => word.startsWith("c")).length


    return (
        <>
            <div>
                <img width={"150px"} height={"150px"} src={"/logos/records-logo.png"}
                     alt={"records-logo"}/>
            </div>
            <Stack direction="row" spacing={1.5} justifyContent={"end"} paddingBottom={3}>
                <div style={{width: 85, height: 85}}>
                    <CircularProgressbar value={valueHiragana} maxValue={46} text={`${valueHiragana}`} background
                                         backgroundPadding={6}
                                         styles={buildStyles({
                                             backgroundColor: "#D05F5F",
                                             textColor: "#fff",
                                             pathColor: "#fff",
                                             trailColor: "transparent"
                                         })}/>
                </div>
                <div style={{width: 85, height: 85}}>
                    <CircularProgressbar value={valueKatakana} maxValue={46} text={`${valueKatakana}`} background
                                         backgroundPadding={6}
                                         styles={buildStyles({
                                             backgroundColor: "#4D6A9A",
                                             textColor: "#fff",
                                             pathColor: "#fff",
                                             trailColor: "transparent"
                                         })}/>
                </div>
                <div style={{width: 85, height: 85}}>
                    <CircularProgressbar value={valuePlayingCards} maxValue={52} text={`${valuePlayingCards}`}
                                         background backgroundPadding={6}
                                         styles={buildStyles({
                                             backgroundColor: "#73683F",
                                             textColor: "#fff",
                                             pathColor: "#fff",
                                             trailColor: "transparent"
                                         })}/>
                </div>
            </Stack>
            <div>
                <h5>Keep up the good work ☺︎ {user}!!</h5>
                <h5>You have already learned & played with</h5>
                <h4><p>♥</p><span id={"hiragana"}>{valueHiragana} of 46 Hiragana</span></h4>
                <h4><span id={"katakana"}>{valueKatakana} of 46 Katakana</span></h4>
                <h4><span id={"playing-cards"}>{valuePlayingCards} of 52 Playing Cards</span><p>♥</p></h4>
                <h5>Total {userAchievement} games</h5>
            </div>
        </>
    )

}
