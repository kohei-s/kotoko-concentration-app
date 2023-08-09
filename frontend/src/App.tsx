import {Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage.tsx";
import HiraganaCard from "./HiraganaCard/HiraganaCard.tsx";
import KatakanaCard from "./KatakanaCard/KatakanaCard.tsx";
import PlayingCard from "./PlayingCard/PlayingCard.tsx";
import GameCardCollection from "./GameCardCollection.tsx";


export default function App() {


    return (
        <>
            <main>
                <Routes>
                    <Route path={"/"} element={<MainPage/>}></Route>
                    <Route path={"/hiragana"} element={<HiraganaCard/>}></Route>
                    <Route path={"/katakana"} element={<KatakanaCard/>}></Route>
                    <Route path={"/playing-card"} element={<PlayingCard/>}></Route>
                    <Route path={"/card-collection"} element={<GameCardCollection/>}></Route>
                </Routes>
            </main>
        </>
    )
}
