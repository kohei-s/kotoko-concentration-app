import {Link} from "react-router-dom";
import "./MainPage.css"
import {Button, Stack} from "@mui/material";

export default function MainPage() {


    return (
        <>
            <div className={"start"}>
                <img height={"290vm"} src="/logos/kotoko-logo.png" alt="start"/>
            </div>
            <Stack direction="row" spacing={0.5} justifyContent="center">
            <Button variant="contained" sx={{background:"#D05F5F", boxShadow:0, borderRadius:'20px'}}>
                <Link to="/hiragana">あ</Link>
            </Button>
            <Button variant="contained" sx={{background:"#4D6A9A", boxShadow:0, borderRadius:'20px'}}>
                <Link to="/katakana">ア</Link>
            </Button>
            <Button  variant="contained" sx={{background:"#73683F", boxShadow:0, borderRadius:'20px'}}>
                <Link to="/playing-card">♥♠</Link>
            </Button>
            </Stack>
            <Button  variant="contained">
                <Link to="/card-collection">collection</Link>
            </Button>
        </>
    )

}
