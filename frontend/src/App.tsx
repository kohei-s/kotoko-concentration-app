import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import GameCardCollection from "./Collection/GameCardCollection.tsx";
import GameRecord from "./Record/GameRecord.tsx";
import GameBoard from "./Game/GameBoard.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import LoginPage from "./LoginPage.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import MainPage from "./MainPage/MainPage.tsx";
import Header from "./Header.tsx";
import "./App.css"

export default function App() {

    const [user, setUser] = useState<string>("")
    const navigate = useNavigate()

    function login(username: string, password: string) {
        axios.post("/api/users/login", null, {auth: {username, password}})
            .then((response) => {
                setUser(response.data as string)
                navigate("/")
            })
            .catch(console.error)
    }

    function me() {
        axios.get("/api/users/me")
            .then(response => {
                setUser(response.data as string)
            })
            .catch(console.error)
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {setUser("anonymousUser")})
            .catch(console.error)
    }

    useEffect(() => {
        me()
    }, [user])


    return (
        <>
            <Header user={user} onLogout={logout}></Header>
            <Routes>
                <Route path={"/login"} element={<LoginPage onLogin={login}></LoginPage>}></Route>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/"} element={<MainPage/>}></Route>
                    <Route path={"/game/:gameSize/:gameName"} element={<GameBoard/>}></Route>
                    <Route path={"/card-collection"} element={<GameCardCollection/>}></Route>
                    <Route path={"/game-record"} element={<GameRecord/>}></Route>
                    <Route path={"/*"} element={<Navigate to={"/"}/>}/>
                </Route>
            </Routes>
        </>
    )
}
