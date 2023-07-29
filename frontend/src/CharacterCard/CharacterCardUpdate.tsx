import React, {ChangeEvent, FormEvent} from "react";
import {TextField} from "@mui/material";

type Props = {
    character: string,
    setCharacter: (event: string) => void,
    submit: (event: FormEvent<HTMLFormElement>) => void
    cancel: () => void
    delete: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function CharacterCardUpdate(props: Props) {

    const handleCharacterChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCharacter(event.target.value)
    }


    return (
        <>
            <form onSubmit={props.submit}>
                <TextField
                    required
                    id="outlined-required"
                    label="Character"
                    value={props.character}
                    onChange={handleCharacterChange}
                />
                <button>Save</button>
                <button onClick={props.cancel}>Cancel</button>
                <button onClick={props.delete}>Delete</button>
            </form>
        </>
    )
}
