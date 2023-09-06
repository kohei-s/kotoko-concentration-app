import {GameCard} from "./GameCard.ts";
import setPrefix from "./setPrefix.ts";

export default function createGameCardData(setName: string, diacritics: boolean[]) {

    const alphabetReading = [
        "a", "i", "u", "e", "o",
        "ka", "ki", "ku", "ke", "ko",
        "sa", "shi", "su", "se", "so",
        "ta", "chi", "tsu", "te", "to",
        "na", "ni", "nu", "ne", "no",
        "ha", "hi", "fu", "he", "ho",
        "ma", "mi", "mu", "me", "mo",
        "ya", "yu", "yo",
        "ra", "ri", "ru", "re", "ro",
        "wa", "wo", "n"
    ]

    const diacriticsReading = [
        "ga", "gi", "gu", "ge", "go",
        "za", "ji", "zu", "ze", "zo",
        "da", "zhi", "zhu", "de", "do",
        "ba", "bi", "bu", "be", "bo",
        "pa", "pi", "pu", "pe", "po",
        "kya", "kyu", "kyo",
        "sha", "shu", "sho",
        "cha", "chu", "cho",
        "nya", "nyu", "nyo",
        "hya", "hyu", "hyo",
        "mya", "myu", "myo",
        "rya", "ryu", "ryo",
        "gya", "gyu", "gyo",
        "ja", "ju", "jo",
        "bya", "byu", "byo",
        "pya", "pyu", "pyo"
    ]

    const playingCards = [
        "heart-1", "heart-2", "heart-3", "heart-4", "heart-5", "heart-6", "heart-7",
        "heart-8", "heart-9", "heart-10", "heart-11", "heart-12", "heart-13",
        "spade-1", "spade-2", "spade-3", "spade-4", "spade-5", "spade-6", "spade-7",
        "spade-8", "spade-9", "spade-10", "spade-11", "spade-12", "spade-13",
        "diamond-1", "diamond-2", "diamond-3", "diamond-4", "diamond-5", "diamond-6", "diamond-7",
        "diamond-8", "diamond-9", "diamond-10", "diamond-11", "diamond-12", "diamond-13",
        "club-1", "club-2", "club-3", "club-4", "club-5", "club-6", "club-7",
        "club-8", "club-9", "club-10", "club-11", "club-12", "club-13"
    ]

    const kanjiReading: string[] = [
        "ha", "ko", "ie", "inu", "mori", "mizu", "toki", "hi", "hana", "hito", "sora"
    ]

    const animalReading: string[] = [
        "inu", "hato", "kirin", "neko", "pengin", "raion", "tora", "zou"
    ]


    let listData: string[];
    if ((setName === "hiragana" && diacritics[0]) || (setName === "katakana" && diacritics[1])){
        listData = alphabetReading.concat(diacriticsReading)
    } else if ((setName === "hiragana" && (!diacritics[0])) || (setName === "katakana" && (!diacritics[1]))) {
        listData = alphabetReading;
    } else if (setName === "kanji") {
        listData = kanjiReading;
    } else if (setName === "animal") {
        listData = animalReading;
    } else {
        listData = playingCards;
    }

    const prefix: string = setPrefix(setName);

    const kanaCards: GameCard[] = [];
    let index = 1;
    listData.forEach((data: string) => {
        const gameCard: GameCard = {
            id: prefix + String(index),
            title: data,
            cardSetName: setName,
        };
        index++;
        kanaCards.push(gameCard);
    });

    return kanaCards
}
