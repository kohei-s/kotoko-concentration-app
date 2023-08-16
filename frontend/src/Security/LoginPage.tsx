import {FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import "./LoginPage.css"

type Props = {
    onLogin: (username: string, password: string) => void
}

export default function LoginPage(props: Props) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function onLogin(event: FormEvent) {
        event.preventDefault()
        props.onLogin(username, password)
    }


    return (
        <>
            <form onSubmit={onLogin}>
                <input value={username} onChange={event => setUsername(event.target.value)} placeholder={"Username"}/>
                <input value={password} onChange={event => setPassword(event.target.value)} placeholder={"Password"}
                       type="password"/>
                <button style={{color: "#f8e619", backgroundColor: "#69d1ca", borderColor: "#f8e619"}}>LOGIN</button>
            </form>
            <div>
                <Link to="/register" className="link">☺︎ Not registered yet?</Link>
            </div>
        </>
    )
}
