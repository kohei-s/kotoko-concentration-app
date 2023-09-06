import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import GameCardCollection from "./Collection/GameCardCollection.tsx";
import GameRecord from "./Record/GameRecord.tsx";
import GameBoard from "./Game/GameBoard.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import ProtectedRoutes from "./Security/ProtectedRoutes.tsx";
import MainPage from "./MainPage/MainPage.tsx";
import {UserInfo} from "./Security/UserInfo.ts";
import RegisterPage from "./Security/RegisterPage.tsx";
import Setting from "./Setting/Setting.tsx";
import LoginPage from "./Security/LoginPage.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {GameCard} from "./Game/GameCard.ts";
import {GameCardSet} from "./Collection/GameCardSet.ts";
import "./App.css"
import EditGameCard from "./Edit/EditGameCard.tsx";


export default function App() {

    const appTheme = createTheme({
        typography: {
            fontFamily: [
                'Potta One',
                'cursive',
                'Zen Maru Gothic',
                'sans-serif',
            ].join(','),
        }
    })

    const [userName, setUserName] = useState<string>("")
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const [allMyGameCards, setAllMyGameCards] = useState<GameCard[]>([]);
    const [allMyCardSets, setMyAllCardSets] = useState<GameCardSet[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        getAllMySetNamesAndItsCount()
    }, [allMyGameCards]);

    useEffect(() => {
        me()
        loadAllMyGameCards()
        getAllMySetNamesAndItsCount()
    }, [userName]);

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
            .catch(error => {
                console.error(error)
                setUserInfo(undefined)
                setUserName("Anonymous User")
            })
    }

    function update(updatedUserInfo: UserInfo) {
        axios.put<UserInfo>("/api/users/update", updatedUserInfo)
            .then(response => response.data)
            .then(data => {
                setUserInfo(data)
            })
            .catch(console.error)
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setUserName("anonymousUser")
                navigate("/login")
            })
            .catch(console.error)
    }

    function loadAllMyGameCards() {
        axios.get<GameCard[]>(
            "/api/game_cards/myAll"
        )
            .then(response => response.data)
            .then(data => {
                const responseDataCardList = data
                responseDataCardList.reverse()
                setAllMyGameCards(responseDataCardList)
            })
            .catch(console.error)
    }

    function getAllMySetNamesAndItsCount() {
        const listMyAllSetNames = allMyGameCards.map((card) => card.cardSetName)
        const countMyList: { [key: string]: number } = {};
        for (const item of listMyAllSetNames) {
            if (countMyList[item]) {
                countMyList[item] += 1;
            } else {
                countMyList[item] = 1;
            }
        }
        const filteredMyList: GameCardSet[] = [];
        for (const [key, value] of Object.entries(countMyList)) {
            const newMySet: GameCardSet = {name: key, count: value, author: userName};
            filteredMyList.push(newMySet)
        }
        const kanjiSet: GameCardSet = {name: "kanji", count: 11, author: "sample"};
        const animalSet: GameCardSet = {name: "animal", count: 8, author: "sample"}
        filteredMyList.push(kanjiSet)
        filteredMyList.push(animalSet)
        setMyAllCardSets(filteredMyList)
    }


    return (
        <>
            <ThemeProvider theme={appTheme}>
                <Routes>
                    <Route path={"/login"} element={<LoginPage onLogin={login}/>}></Route>
                    <Route path={"/register"} element={<RegisterPage onRegister={register}/>}></Route>
                    <Route element={<ProtectedRoutes user={userName} achievement={userInfo?.achievement}
                                                     logout={logout}/>}>
                        <Route path={"/"} element={<MainPage userInfo={userInfo}/>}></Route>
                        <Route path={"/game/:gameSize/:gameName"}
                               element={<GameBoard userInfo={userInfo} update={update}/>}></Route>
                        <Route path={"/collection"}
                               element={<GameCardCollection allMyGameCards={allMyGameCards}
                                                            loadAllMyGameCards={loadAllMyGameCards}
                                                            allMyCardSets={allMyCardSets}/>}></Route>
                        <Route path={"/edit/:setName/:number"}
                               element={<EditGameCard allMyGameCards={allMyGameCards}
                                                      loadAllMyGameCards={loadAllMyGameCards}/>}></Route>
                        <Route path={"/record"} element={<GameRecord userInfo={userInfo}/>}></Route>
                        <Route path={"/setting"} element={<Setting userInfo={userInfo} update={update}
                                                                   countCardSets={allMyCardSets}/>}></Route>
                        <Route path={"/*"} element={<Navigate to={"/"}/>}/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </>
    )
}
