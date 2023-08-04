import HiraganaCard from "./KanaCard/HiraganaCard.tsx";
import {Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage.tsx";

export default function App() {

    return (
        <>
            <main>
                <Routes>
                    <Route path={"/"} element={<MainPage/>}></Route>
                    <Route path={"/hiragana"} element={<HiraganaCard/>}></Route>
                </Routes>
            </main>
        </>
    );
}
