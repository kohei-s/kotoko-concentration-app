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
            {hiraganaCards.cardsGrid.map((row, rowIndex) => {
                return (row).map((card, columIndex) => {
                        return <div className={"card"}
                                    key={`${rowIndex}-${columIndex}`}>
                            <div className={"front"}>
                                <div>{card.kana}</div>
                                <div>{card.reading}</div>
                            </div>
                            <div className={"back"}>
                            </div>
                        </div>
                    }
                )
            })}
        </div>
    )

}
