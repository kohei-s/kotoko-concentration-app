import HiraganaCard from "./KanaCard/HiraganaCard/HiraganaCard.tsx";
import {Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage.tsx";
import KatakanaCard from "./KanaCard/KatakanaCard/KatakanaCard.tsx";
import PlayingCard from "./PlayingCard/PlayingCard.tsx";

export default function App() {

    return (
        <>
            <main>
                <Routes>
                    <Route path={"/"} element={<MainPage/>}></Route>
                    <Route path={"/hiragana"} element={<HiraganaCard/>}></Route>
                    <Route path={"/katakana"} element={<KatakanaCard/>}></Route>
                    <Route path={"/playing-card"} element={<PlayingCard/>}></Route>
                </Routes>
            </main>
        </>
    )
}
