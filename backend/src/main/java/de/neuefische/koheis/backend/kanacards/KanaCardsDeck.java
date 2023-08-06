package de.neuefische.koheis.backend.kanacards;

import org.springframework.stereotype.Component;
import java.util.*;
import static java.util.Collections.shuffle;

@Component
public class KanaCardsDeck {
    private final List<String> hiraganaCharacters = new ArrayList<>(List.of(
            "あ", "い", "う", "え", "お",
            "か", "き", "く", "け", "こ",
            "さ", "し", "す", "せ", "そ",
            "た", "ち", "つ", "て", "と",
            "な", "に", "ぬ", "ね", "の",
            "は", "ひ", "ふ", "へ", "ほ",
            "ま", "み", "む", "め", "も",
            "や", "ゆ", "よ",
            "ら", "り", "る", "れ", "ろ",
            "わ", "を", "ん"
    ));

    private final List<String> katakanaCharacters = new ArrayList<>(List.of(
            "ア", "イ", "ウ", "エ", "オ",
            "カ", "キ", "ク", "ケ", "コ",
            "サ", "シ", "ス", "セ", "ソ",
            "タ", "チ", "ツ", "テ", "ト",
            "ナ", "ニ", "ヌ", "ネ", "ノ",
            "ハ", "ヒ", "フ", "ヘ", "ホ",
            "マ", "ミ", "ム", "メ", "モ",
            "ヤ", "ユ", "ヨ",
            "ラ", "リ", "ル", "レ", "ロ",
            "ワ", "ヲ", "ン"
    ));

    private final List<String> alphabetCharacters = new ArrayList<>(List.of(
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
    ));

    public List<KanaCard> createKanaCards(List<String> listAlphabet, List<String> listKana) {
        List<KanaCard> kanaCards = new ArrayList<>();
        for (String kana : listKana) {
            KanaCard kanaCard = new KanaCard(kana, listAlphabet.get(listKana.indexOf(kana)));
            kanaCards.add(kanaCard);
        }

        return kanaCards;
    }

    public List<KanaCard> getSelectedNumberOfKanaCards(List<KanaCard> kanaCards, int numberOfCards) {
        List<KanaCard> selectedNumberOfKanaCards = new ArrayList<>();
        shuffle(kanaCards);
        for (int i = 0; i < numberOfCards; i++) {
            selectedNumberOfKanaCards.add(kanaCards.get(i));
        }

        return selectedNumberOfKanaCards;
    }

    public List<KanaCard> getRandomFourKanaCards(String kanaType) {
        List<KanaCard> kanaCards;
        if (kanaType.equals("hiragana")) {
            kanaCards = createKanaCards(this.alphabetCharacters, this.hiraganaCharacters);
        } else {
            kanaCards = createKanaCards(this.alphabetCharacters, this.katakanaCharacters);
        }
        return getSelectedNumberOfKanaCards(kanaCards, 4);

    }


    public KanaCard[][] getNineByNineKanaCardsGrid(String kanaType) {
        KanaCard[][] kanaCardsGrid = new KanaCard[3][3];
        KanaCardsDeck deck = new KanaCardsDeck();
        List<KanaCard> kanaCards = deck.getRandomFourKanaCards(kanaType);
        kanaCards.addAll(List.copyOf(kanaCards));
        kanaCards.add(new KanaCard("empty", "empty"));
        shuffle(kanaCards);
        int k = 0;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                kanaCardsGrid[i][j] = kanaCards.get(k);
                k++;
            }
        }

        return kanaCardsGrid;
    }

}
