import {CharacterCard} from "./CharacterCard.ts";

type Props = {
    characterCard: CharacterCard,
}
export default function CharacterCardFrame(props: Props){

    return (
        <div>
            {props.characterCard.character}
        </div>
    );
}
