import {CharacterCard} from "./CharacterCard.ts";
import CharacterCardFrame from "./CharacterCardFrame.tsx";


type Props ={
    characterCards: CharacterCard[],
    update: (characterCardId: string) => void
}

export default function CharacterCardCollection (props:Props){
    return(
        <div className={"characterCollectionContainer"}>
            <h2>Character Cards</h2>
            {props.characterCards.map(characterCard => <CharacterCardFrame key={characterCard.id} characterCard={characterCard} update={()=> props.update(characterCard.id)}/>)}
        </div>
    );
}
