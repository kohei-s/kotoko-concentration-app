import {FormEvent, useState} from "react";
import "./RegisterPage.css"

type Props = {
    onRegister: (username: string, password: string) => void
}
export default function RegisterPage(props: Props) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function onRegister(event: FormEvent) {
        event.preventDefault()
        props.onRegister(username, password)
    }

    return (
        <>
            <form onSubmit={onRegister}>
                <input value={username} onChange={event => setUsername(event.target.value)} placeholder={"Username"}/>
                <input value={password} onChange={event => setPassword(event.target.value)} placeholder={"Password"}
                       type="password"/>
                <button style={{color: "#69d1ca", backgroundColor: "#f8e619", borderColor: "#69d1ca"}}>REGISTER</button>
            </form>
            <div className="link">
                ☺︎ Welcome to the KoToKo!
            </div>
        </>
    )
}
