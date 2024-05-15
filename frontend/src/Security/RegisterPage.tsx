import React, {FormEvent, useState} from "react";
import "./RegisterPage.css"
import {Button, TextField, Typography} from "@mui/material";

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
            <div className={"register-form"}>
                <Typography component="div">
                    <TextField id="register-username" label="username" onInput={(event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)}}
                               placeholder={"Username"}/>
                </Typography>
                <Typography component="div">
                    <TextField id="register-password" label="password" onInput={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}}
                               placeholder={"Password"} type={"password"}/>
                </Typography>
                <Button variant="contained" onClick={onRegister} disableRipple={true} sx={{
                    maxWidth: 100,
                    margin: 5,
                    background: "#55a8a2",
                    boxShadow: 0,
                    borderRadius: '15px'
                }}>Register</Button>
                <div className="link">
                    ☺︎ Welcome to the KoToKo!
                </div>
            </div>
        </>
    )
}
