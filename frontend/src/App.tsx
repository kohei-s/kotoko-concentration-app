import HiraganaCard from "./KanaCard/HiraganaCard.tsx";
import {Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage.tsx";
import KatakanaCard from "./KanaCard/KatakanaCard.tsx";

export default function App() {

    return (
        <>
            <main>
                <Routes>
                    <Route path={"/"} element={<MainPage/>}></Route>
                    <Route path={"/hiragana"} element={<HiraganaCard/>}></Route>
                    <Route path={"/katakana"} element={<KatakanaCard/>}></Route>
                </Routes>
            </main>
        </>
    );
}
