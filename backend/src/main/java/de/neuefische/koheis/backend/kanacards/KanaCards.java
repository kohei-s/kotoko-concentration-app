package de.neuefische.koheis.backend.kanacards;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class KanaCards {
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
            "wa", "o", "n"
    ));

    public Map<String, String> createKanaCards(List<String> listAlphabet, List<String> listKana) {
        Map<String, String> kanaCards = new HashMap<>();
        for (String alphabet : listAlphabet) {
            kanaCards.put(alphabet, listKana.get(listAlphabet.indexOf(alphabet)));
        }

        return kanaCards;
    }

    public Map<String, String> getRandomNumberOfKanaCards(Map<String, String> kanaCards, int numberOfCards) {
        Map<String, String> randomNumberOfCards = new HashMap<>();
        Set<String> alphabetSet = kanaCards.keySet();
        List<String> alphabetList = new ArrayList<>();
        for (String alphabet : alphabetSet) {
            alphabetList.add(alphabet);
        }
        for (int i = 0; i < numberOfCards; i++) {
            randomNumberOfCards.put(alphabetList.get(i), kanaCards.get(alphabetList.get(i)));
        }

        return randomNumberOfCards;
    }

    public Map<String, String> getRandomFourHiraganaCards() {
        Map<String, String> kanaCards = createKanaCards(this.alphabetCharacters, this.hiraganaCharacters);

        return getRandomNumberOfKanaCards(kanaCards, 4);
    }

    public Map<String, String> getRandomFourKatakanaCards() {
        Map<String, String> kanaCards = createKanaCards(this.alphabetCharacters, this.katakanaCharacters);

        return getRandomNumberOfKanaCards(kanaCards, 4);
    }

}
