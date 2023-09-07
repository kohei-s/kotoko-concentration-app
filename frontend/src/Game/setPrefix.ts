export default function setPrefix(setName: string) {
    let prefix: string;
    switch (setName) {
        case "hiragana":
            prefix = "h";
            break;
        case "katakana":
            prefix = "k";
            break;
        case "kanji":
            prefix = "kan";
            break;
        case "animal":
            prefix = "an";
            break;
        default:
            prefix = "c";
    }

    return prefix;
}
