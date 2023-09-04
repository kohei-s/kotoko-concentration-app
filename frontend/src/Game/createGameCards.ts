import {GameCard} from "./GameCard.ts";

export function createGameCards(setName: string, gameSize: string, diacritics: boolean[]) {

    function shuffleArray(array: GameCard[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

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
        "pya", "pyu", "pyo",
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

    let listData: string[];
    if ((setName === "hiragana" && diacritics[0]) || (setName === "katakana" && diacritics[1])){
        listData = alphabetReading.concat(diacriticsReading)
    } else if ((setName === "hiragana" && (!diacritics[0])) || (setName === "katakana" && (!diacritics[1]))) {
        listData = alphabetReading;
    } else {
        listData = playingCards;
    }

    let prefix: string;
    switch (setName) {
        case "hiragana":
            prefix = "h";
            break;
        case "katakana":
            prefix = "k";
            break;
        default:
            prefix = "c";
    }

    const kanaCards: GameCard[] = [];
    const admin = "admin";
    let index = 1;
    listData.forEach((data: string) => {
        const gameCard: GameCard = {
            id: prefix + String(index),
            title: data,
            cardSetName: setName,
            authorId: admin
        };
        index++;
        kanaCards.push(gameCard);
    });

    shuffleArray(kanaCards)

    const rowAndColumn: number[] = [];
    let pairing;
    switch (gameSize) {
        case "small":
            rowAndColumn[0] = 4;
            rowAndColumn[1] = 4;
            pairing = 4;
            break;
        case "medium":
            rowAndColumn[0] = 3;
            rowAndColumn[1] = 4;
            pairing = 6;
            break;
        default:
            rowAndColumn[0] = 4;
            rowAndColumn[1] = 4;
            pairing = 8;
    }

    const cardPairs: GameCard [] = kanaCards.splice(0, pairing);
    cardPairs.push(...cardPairs.map(card => ({...card})));

    const emptyCard: GameCard = {id: prefix + "0", title: "empty", cardSetName: setName, authorId: admin}
    if (gameSize === "small") {
        cardPairs.push(emptyCard);
    }

    shuffleArray(cardPairs)

    const cardGrid: GameCard[][] = [];
    const isMatched: boolean[][] = [];
    let m = 0;
    for (let i = 0; i < rowAndColumn[0]; i++) {
        cardGrid[i] = [];
        isMatched[i] = [];
        for (let j = 0; j < rowAndColumn[1]; j++) {
            cardGrid[i][j] = cardPairs[m];
            isMatched[i][j] = false;
            m++;
        }
    }

    const id = prefix + String(Math.floor(Math.random() * (10000 + 1)));

    return {id, cardGrid, isMatched}

}
