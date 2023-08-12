import {IconButton, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./GameRecord.css"
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function GameRecord() {


    const valueHiragana = 10;
    const valueKatakana = 8;
    const valuePlayingCards = 15;
    const valueGames = 58;

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
                <h5>You have already learned & played with</h5>
                <h4><p>♥</p><span id={"hiragana"}>10 of 46 Hiragana</span></h4>
                <h4><span id={"katakana"}>8 of 46 Katakana</span></h4>
                <h4><span id={"playing-cards"}>15 of 52 Playing Cards</span><p>♥</p></h4>
                <h5>Total {valueGames} games</h5>
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
