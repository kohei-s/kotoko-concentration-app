import {FormEvent, useEffect, useState} from "react";
import ReactModal from "react-modal";
import axios from "axios"
import {CharacterCard} from "./CharacterCard/CharacterCard.ts";
import CharacterCardCollection from "./CharacterCard/CharacterCardCollection.tsx";
import CharacterCardUpdate from "./CharacterCard/CharacterCardUpdate.tsx";
import {IconButton} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

export default function App() {
    const [character, setCharacter] = useState<string>("")
    const [selectedCharacter, setSelectedCharacter] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [playingCards, setPlayingCards] = useState<string[]>([""]);
    const [characterCards, setCharacterCards] = useState<CharacterCard[]>([]);
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
    const gameSize = "large";

    function loadPlayingCards() {
        axios.get<string[]>(
            "/api/playing_cards/" + gameSize)
            .then((response) => {
                setPlayingCards(response.data)
            })
            .catch(console.error)
    }

    function loadCharacterCards() {
        axios.get<CharacterCard[]>(
            "/api/character_cards")
            .then((response) => {
                setCharacterCards(response?.data)
            })
            .catch(console.error)
    }

    useEffect(
        () => {
            loadPlayingCards()
            loadCharacterCards()
        }, []
    )

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        void axios.post<CharacterCard>("/api/character_cards", {
                "character": character
            }
        ).then(() => {
                setCharacter("")
            }
        ).catch(console.error)
            .then(loadCharacterCards)
            .then(closeModalAdd)
    }

    function handleUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        void axios.put<CharacterCard>(
            "api/character_cards/" + id, {
                "character": selectedCharacter
            }
        ).then(() => loadCharacterCards())
            .then(closeModalUpdate)
    }

    function initializeUpdateComponent(characterCardId: string) {

        const selectedCharacterCard: CharacterCard | undefined = characterCards.find(item => item.id === characterCardId)

        if (selectedCharacterCard !== undefined) {
            setSelectedCharacter(selectedCharacterCard.character)
            setId(selectedCharacterCard.id)
        } else {
            throw DOMException
        }
        setIsModalUpdateOpen(true)
        openModalUpdate()
    }

    function openModalAdd() {
        setIsModalAddOpen(true)
    }

    function closeModalAdd() {
        setIsModalAddOpen(false)
        setSelectedCharacter("")
    }

    function openModalUpdate() {
        setIsModalUpdateOpen(true)
    }

    function closeModalUpdate() {
        setIsModalUpdateOpen(false)
        setSelectedCharacter("")
    }


    return (
        <>
            <div>
                <h1>Cards</h1>
                <div>

                    <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                                onClick={openModalAdd}><AddCircle
                        fontSize={"large"}/></IconButton>

                    <ReactModal
                        isOpen={isModalAddOpen}
                        onRequestClose={closeModalAdd}
                        className="modal"
                        overlayClassName="overlay"
                    >
                        <CharacterCardUpdate
                            setCharacter={setSelectedCharacter}
                            submit={handleSubmit}
                            character={selectedCharacter}
                            cancel={closeModalAdd}/>
                    </ReactModal>
                    <ReactModal
                        isOpen={isModalUpdateOpen}
                        onRequestClose={closeModalUpdate}
                        className="modal"
                        overlayClassName="overlay"
                    >
                        <CharacterCardUpdate
                            setCharacter={setSelectedCharacter}
                            submit={handleUpdate}
                            character={selectedCharacter}
                            cancel={closeModalUpdate}/>
                    </ReactModal>
                    <CharacterCardCollection characterCards={characterCards}
                                             update={initializeUpdateComponent}></CharacterCardCollection>

                </div>
                <h2>Playing Cards</h2>
                <div>
                    {playingCards}
                </div>
            </div>
        </>
    );
}
