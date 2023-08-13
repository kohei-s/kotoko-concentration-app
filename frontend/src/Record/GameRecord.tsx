import {IconButton, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "./GameRecord.css"

type Props = {
    userInfo: string[]
}

export default function GameRecord(props: Props) {

    const userData: string[] = props.userInfo
    const user: string = userData.username as string
    const userAchievement: string = userData.achievement as string
    const uniqueWords: string[] = [...new Set(userData.wordbook)] as string[]

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
                <Stack direction="row" spacing={0.4} justifyContent={"end"} paddingTop={5}>
                    <IconButton size={"small"}
                                sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0}}>
                        <Link to="/"><HomeRoundedIcon/></Link>
                    </IconButton>
                    <Tooltip title="Card Collection">
                        <IconButton size="small"
                                    sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0, borderRadius: '50px'}}>
                            <Link to="/card-collection"><MenuBookIcon/></Link>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </div>
        </>
    )

}
