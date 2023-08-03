import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "./KanaCard.ts";
import './HiraganaCard.css';

export default function HiraganaCard() {

    const [hiraganaCards, setHiraganaCards] = useState<{ cardsGrid: KanaCard[][] }>({cardsGrid: [[]]});

    useEffect(() => {
        loadHiraganaCards()
    }, [])

    function loadHiraganaCards() {
        axios.get(
            "/api/kana_cards/hiragana")
            .then((response) => {
                const responseData = response.data as { cardsGrid: KanaCard[][] }
                setHiraganaCards(responseData)
            })
            .catch(console.error)
    }

    return (
        <div className={"container"}>
            {hiraganaCards.cardsGrid.map(cards => (cards).map((card) => <div className={"card"}
                key={card.kana}><div>{card.kana}</div><div>{card.reading}</div></div>))}
        </div>
    )

}
