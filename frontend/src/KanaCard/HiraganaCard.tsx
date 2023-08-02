import axios from "axios";
import {useEffect, useState} from "react";
import {KanaCard} from "./KanaCard.ts";

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
        <div>
            {hiraganaCards.cardsGrid.map(cards => (cards).map((card) => <div
                key={card.kana}>{card.kana}{card.reading}</div>))}
        </div>
    )

}
