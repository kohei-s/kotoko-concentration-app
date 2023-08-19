import React, {FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import "./LoginPage.css"
import {Button, TextField, Typography} from "@mui/material";

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
            <div className={"login-form"}>
                <Typography component="div">
                    <TextField id="username" label="username" onInput={(event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)}}
                               placeholder={"Username"}/>
                </Typography>
                <Typography component="div">
                    <TextField id="passwort" label="passwort" onInput={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}}
                               placeholder={"Password"} type={"password"}/>
                </Typography>
                <Button variant="contained" onClick={onLogin} sx={{
                    maxWidth: 100,
                    margin: 5,
                    background: "#69d1ca",
                    boxShadow: 0,
                    borderRadius: '15px'
                }}>Login</Button>
                <div>
                    <Link to="/register" className="link">☺︎ Not registered yet?</Link>
                </div>
            </div>
        </>
    )
}
