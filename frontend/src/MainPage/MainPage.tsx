import {Button, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import "./MainPage.css"

export default function MainPage() {

    return (
        <>
            <div className={"start"}>
                <img height={"290vm"} src="/logos/kotoko-logo.png" alt="start"/>
            </div>
            <Stack direction="row" spacing={0.5} justifyContent="center">
                <Tooltip title="Hiragana">
                    <Button variant="contained" sx={{background: "#D05F5F", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to="/game/small/hiragana">あ</Link>
                    </Button>
                </Tooltip>
                <Tooltip title="Katakana">
                    <Button variant="contained" sx={{background: "#4D6A9A", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to="/game/small/katakana">ア</Link>
                    </Button>
                </Tooltip>
                <Tooltip title="Playing Card">
                    <Button variant="contained" sx={{background: "#73683F", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to="/game/small/playing-cards">♥♠</Link>
                    </Button>
                </Tooltip>
                <Tooltip title="Custom Card">
                    <Button variant="contained" sx={{background: "#508356", boxShadow: 0, borderRadius: '15px'}}>
                        <Link to="/game/small/testSet">★</Link>
                    </Button>
                </Tooltip>
            </Stack>
        </>
    )

}
