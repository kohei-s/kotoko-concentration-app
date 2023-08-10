import "./MainPage.css"
import {Button, IconButton, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function MainPage() {


    return (
        <>

            <div className={"start"}>
                <img height={"290vm"} src="/logos/kotoko-logo.png" alt="start"/>
            </div>
            <Stack direction="row" spacing={0.5} justifyContent="center">
                <Tooltip title="Hiragana">
                    <Button variant="contained" sx={{background: "#D05F5F", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to="/hiragana">あ</Link>
                    </Button>
                </Tooltip>
                <Tooltip title="Katakana">
                    <Button variant="contained" sx={{background: "#4D6A9A", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to="/katakana">ア</Link>
                    </Button>
                </Tooltip>
                <Tooltip title="Playing Card">
                <Button variant="contained" sx={{background: "#73683F", boxShadow: 0, borderRadius: '15px'}}>
                    <Link to="/playing-card">♥♠</Link>
                </Button>
                </Tooltip>
                <Tooltip title="Custom Card">
                <Button variant="contained" sx={{background: "#508356", boxShadow: 0, borderRadius: '15px'}}>
                    <Link to="/custom">★</Link>
                </Button>
                </Tooltip>
            </Stack>
            <div className={"menu"}>
                <Stack direction="row" spacing={1.0} justifyContent={"end"}>
                    <Tooltip title="Card Collection">
                        <IconButton size="small"
                                    sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0, borderRadius: '50px'}}>
                            <Link to="/card-collection"><MenuBookIcon/></Link>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Game Record">
                        <IconButton size="small"
                                    sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0, borderRadius: '50px'}}>
                            <Link to="/game-record"><EmojiEventsIcon/></Link>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </div>
        </>
    )

}
