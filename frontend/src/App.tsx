import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage.tsx";
import GameCardCollection from "./Collection/GameCardCollection.tsx";
import GameRecord from "./Record/GameRecord.tsx";
import GameBoard from "./Game/GameBoard.ts";


export default function App() {


    return (
        <>
            <main>
                <Routes>
                    <Route path={"/"} element={<MainPage/>}></Route>
                    <Route path={"/game/:gameSize/:gameName"} element={<GameBoard/>}></Route>
                    <Route path={"/card-collection"} element={<GameCardCollection/>}></Route>
                    <Route path={"/game-record"} element={<GameRecord/>}></Route>
                    <Route path={"/*"} element={<Navigate to={"/"}/>}/>
                </Routes>
            </main>
        </>
    )
}
