import { Link } from "react-router-dom";

export default function MainPage() {


    return (
        <>
            <div className={"start"}>
                <img src="/logo2.png" alt="start"/>
            </div>
            <Link to="/hiragana">
                <button>start</button>
            </Link>
        </>
    )
}