import {Link} from "react-router-dom";
import "./MainPage.css"
export default function MainPage() {


    return (
        <>
            <div className={"start"}>
                <Link to="/hiragana">
                    <img height={"280vm"} src="/kotoko-logo.png" alt="start"/>
                </Link>
            </div>
        </>
    )
}