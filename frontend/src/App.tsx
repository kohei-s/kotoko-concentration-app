import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import GameCardCollection from "./Collection/GameCardCollection.tsx";
import GameRecord from "./Record/GameRecord.tsx";
import GameBoard from "./Game/GameBoard.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import LoginPage from "./Security/LoginPage.tsx";
import ProtectedRoutes from "./Security/ProtectedRoutes.tsx";
import MainPage from "./MainPage/MainPage.tsx";
import Header from "./Header/Header.tsx";
import "./App.css"

export default function App() {

    const [userName, setUserName] = useState<string>("")
    const [userInfo, setUserInfo] = useState<string[]>([])
    const navigate = useNavigate()

    function login(username: string, password: string) {
        axios.post("/api/users/login", null, {auth: {username, password}})
            .then((response) => {
                const userInfo: string[] = response.data as string[]
                setUserInfo(userInfo)
                const name: string = userInfo.username as string
                setUserName(name)
                navigate("/")
            })
            .catch(console.error)
    }

    function me() {
        axios.get("/api/users/me")
            .then(response => {
                const userInfo: string[] = response.data as string[]
                setUserInfo(userInfo)
                const name: string = userInfo.username as string
                setUserName(name)
                navigate("/")
            })
            .catch(console.error)
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {setUserName("anonymousUser")})
            .catch(console.error)
    }

    useEffect(() => {
        me()
    }, [userName])


    return (
        <>
            <Header user={userName} onLogout={logout}></Header>
            <Routes>
                <Route path={"/login"} element={<LoginPage onLogin={login}></LoginPage>}></Route>
                <Route element={<ProtectedRoutes user={userName}/>}>
                    <Route path={"/"} element={<MainPage/>}></Route>
                    <Route path={"/game/:gameSize/:gameName"} element={<GameBoard/>}></Route>
                    <Route path={"/card-collection"} element={<GameCardCollection/>}></Route>
                    <Route path={"/game-record"} element={<GameRecord userInfo={userInfo}/>}></Route>
                    <Route path={"/*"} element={<Navigate to={"/"}/>}/>
                </Route>
            </Routes>
        </>
    )
}
