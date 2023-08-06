import {Link} from "react-router-dom";
import "./MainPage.css"
import {Button} from "@mui/material";

export default function MainPage() {

    return (
        <>
            <div className={"start"}>
                <img height={"280vm"} src="/logos/kotoko-logo.png" alt="start"/>
            </div>
            <Button color="inherit">
                <Link to="/hiragana">hiragana</Link>
            </Button>
            <Button color="inherit">
                <Link to="/katakana">katakana</Link>
            </Button>
            <Button color="inherit">
                <Link to="/playing-card">card</Link>
            </Button>
        </>
    )

}
