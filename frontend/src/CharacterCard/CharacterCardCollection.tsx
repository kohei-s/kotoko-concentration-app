import {CharacterCard} from "./CharacterCard.ts";
import CharacterCardFrame from "./CharacterCardFrame.tsx";


type Props ={
    characterCards: CharacterCard[],
}

export default function CharacterCardCollection (props:Props){
    return(
        <div>
            <h2>Character Cards</h2>
            {props.characterCards.map(characterCard => <CharacterCardFrame key={characterCard.id} characterCard={characterCard}/>)}
        </div>
    );
}
