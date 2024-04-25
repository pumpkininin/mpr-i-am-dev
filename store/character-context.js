import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export const CharacterContext = createContext({
    userId: "",
    charId: "",
    playingCharacter: {},
    availableChar: [],
    selectChar: () => {},
    initNewChar: () => {},
    updateChar: () => {}
})

function CharacterProvider({ children }) {
    const [charId, setCharId] = useState();
    const [playingCharacter, setPlayingCharacter] = useState();
    const [availableChar, setAvailableChar] = useState();

    function selectChar(character) {
        setPlayingCharacter(character)
        setCharId(character.id);

    }

    function initNewChar(character) {
        const uuid = uuidv4();
        setCharId(uuid);
        character.id = uuid;
        setPlayingCharacter(character);
        setAvailableChar(oldChars => [...oldChars, playingCharacter])
    }

    function updateChar(character) {
        setPlayingCharacter(character)
    }

    const values = {
        userId: "",
        charId: charId,
        playingCharacter: playingCharacter,
        availableChar: availableChar,
        selectChar: selectChar,
        initNewChar: initNewChar,
        updateChar: updateChar
    }

    return <CharacterContext.Provider value={values}>{children}</CharacterContext.Provider>
}

export default CharacterProvider;