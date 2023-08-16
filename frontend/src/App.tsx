import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import GameCardCollection from "./Collection/GameCardCollection.tsx";
import GameRecord from "./Record/GameRecord.tsx";
import GameBoard from "./Game/GameBoard.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import ProtectedRoutes from "./Security/ProtectedRoutes.tsx";
import MainPage from "./MainPage/MainPage.tsx";
import {UserInfo} from "./UserInfo.ts";
import RegisterPage from "./Security/RegisterPage.tsx";
import Setting from "./Setting/Setting.tsx";
import LoginPage from "./Security/LoginPage.tsx";
import "./App.css"

export default function App() {

    const [userName, setUserName] = useState<string>("")
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const navigate = useNavigate()

    function login(username: string, password: string) {
        axios.post<string>
        ("/api/users/login", null, {auth: {username, password}})
            .then(response => response.data)
            .then(data => {
                const name: string = data
                setUserName(name)
                navigate("/")
            })
            .catch(console.error)
    }

    function register(username: string, password: string) {
        const newUser = {"username": `${username}`, "password": `${password}`}
        axios.post<string>
        ("/api/users/register", newUser)
            .then(response => {
                console.log(response)
                navigate("/")
            })
            .catch(console.error)
    }

    function me() {
        axios.get<UserInfo>("/api/users/me")
            .then(response => response.data)
            .then(data => {
                const name: string = data.username
                setUserInfo(data)
                setUserName(name)
                navigate("/")
            })
            .catch(error=> {
                console.error(error)
                setUserInfo(undefined)
                setUserName("Anonymous User")
            })
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setUserName("anonymousUser")
                navigate("/login")
            })
            .catch(console.error)
    }

    useEffect(() => {
        me()
    },[userName])


    return (
        <>
            <Routes>
                <Route path={"/login"} element={<LoginPage onLogin={login}/>}></Route>
                <Route path={"/register"} element={<RegisterPage onRegister={register}/>}></Route>
                <Route element={<ProtectedRoutes user={userName} logout={logout}/>}>
                    <Route path={"/"} element={<MainPage userInfo={userInfo}/>}></Route>
                    <Route path={"/game/:gameSize/:gameName"} element={<GameBoard userInfo={userInfo}/>}></Route>
                    <Route path={"/card-collection"} element={<GameCardCollection/>}></Route>
                    <Route path={"/game-record"} element={<GameRecord userInfo={userInfo}/>}></Route>
                    <Route path={"/setting"} element={<Setting userInfo={userInfo}/>}></Route>
                    <Route path={"/*"} element={<Navigate to={"/"}/>}/>
                </Route>
            </Routes>
        </>
    )
}
