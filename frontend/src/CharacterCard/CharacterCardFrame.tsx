import {CharacterCard} from "./CharacterCard.ts";
import {Card, CardContent, Typography} from "@mui/material";

type Props = {
    characterCard: CharacterCard,
    update: () => void
}
export default function CharacterCardFrame(props: Props) {

    return (
        <Card onClick={props.update} className={"characterCardFrame"}>
            <CardContent>
                <Typography>
                    {props.characterCard.character}
                </Typography>
            </CardContent>
        </Card>
    );
}
