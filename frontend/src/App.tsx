import React, {FormEvent, useEffect, useState} from "react";
import ReactModal from "react-modal";
import axios from "axios"
import {CharacterCard} from "./CharacterCard/CharacterCard.ts";
import CharacterCardCollection from "./CharacterCard/CharacterCardCollection.tsx";
import CharacterCardUpdate from "./CharacterCard/CharacterCardUpdate.tsx";
import {IconButton} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {KanaCards} from "./KanaCards.ts";

export default function App() {

    const [character, setCharacter] = useState<string>("")
    const [selectedCharacter, setSelectedCharacter] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [playingCards, setPlayingCards] = useState<string[]>([""]);
    const [hiraganaCards, setHiraganaCards] = useState<KanaCards[]>([]);
    const [katakanaCards, setKatakanaCards] = useState<KanaCards[]>([]);
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

    function loadHiraganaCards() {
        axios.get<KanaCards[]>(
            "/api/kana_cards/hiragana")
            .then((response) => {
                setHiraganaCards(response?.data)
            })
            .catch(console.error)

    }

    function loadKatakanaCards() {
        axios.get<KanaCards[]>(
            "/api/kana_cards/katakana")
            .then((response) => {
                setKatakanaCards(response?.data)
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
            loadHiraganaCards()
            loadKatakanaCards()
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

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        void axios.delete("/api/character_cards/" + id)
            .then(() => loadCharacterCards())
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
            <header>
                <h2>Cards</h2>
            </header>
            <main>
                <CharacterCardCollection characterCards={characterCards}
                                         update={initializeUpdateComponent}></CharacterCardCollection>
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
                        submit={handleSubmit}
                        setCharacter={setSelectedCharacter}
                        character={selectedCharacter}
                        cancel={closeModalAdd}
                        delete={handleDelete}
                    ></CharacterCardUpdate>
                </ReactModal>
                <ReactModal
                    isOpen={isModalUpdateOpen}
                    onRequestClose={closeModalUpdate}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <CharacterCardUpdate
                        submit={handleUpdate}
                        setCharacter={setSelectedCharacter}
                        character={selectedCharacter}
                        cancel={closeModalUpdate}
                        delete={handleDelete}
                    ></CharacterCardUpdate>
                </ReactModal>
            </main>
            <h2>Playing Cards</h2>
            <div>
                {playingCards}
            </div>
            <h2>Hiragana Cards</h2>
            {Object.entries(hiraganaCards)}
            <h2>Katakana Cards</h2>
            {Object.entries(katakanaCards)}



        </>
    );
}
