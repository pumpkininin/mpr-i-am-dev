import { createContext, useState, useContext } from "react";
import {AuthContext} from "./auth-context";
import Character from "../model/Character";


export const CharacterContext = createContext({
    email: "",
    charId: "",
    playingCharacter: {},
    availableChar: [],
    selectChar: () => {},
    initNewChar: () => {},
    updateChar: () => {}
})

function CharacterProvider({ children }) {
    const authCtx = useContext(AuthContext);

    const [charId, setCharId] = useState("");
    const [playingCharacter, setPlayingCharacter] = useState(new Character());
    const [availableChar, setAvailableChar] = useState([]);

    function selectChar(character) {
        setPlayingCharacter(character)
        setCharId(character.id);
    }

    function initNewChar() {
        setCharId(playingCharacter.id)
        setAvailableChar(prevArray => [...prevArray, playingCharacter])
    }

    function updateChar(character) {
        const index = availableChar.findIndex((char) => char.name === character.name);
        console.log(index)
        availableChar[index] = character;
        setPlayingCharacter(character)
    }

    const values = {
        email: authCtx.email,
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