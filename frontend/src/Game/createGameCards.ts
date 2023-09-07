import {GameCard} from "./GameCard.ts";
import createGameCardData from "./createGameCardData.ts";
import setPrefix from "./setPrefix.ts";

export function createGameCards(setName: string, gameSize: string, diacritics: boolean[]) {

    function shuffleArray(array: GameCard[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const kanaCards: GameCard[] = createGameCardData(setName, diacritics);
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

    const prefix: string = setPrefix(setName);

    const cardPairs: GameCard [] = kanaCards.splice(0, pairing);
    cardPairs.push(...cardPairs.map(card => ({...card})));

    const emptyCard: GameCard = {id: prefix + "0", title: "empty", cardSetName: setName}
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
