import { createContext, useState, useContext, useEffect } from "react";
import {AuthContext} from "./auth-context";
import Character from "../model/Character";
import {getAll, initCharacer, updateCharacter, updateLastAccessed} from "../util/db-utils"
import { v4 as uuidv4 } from 'uuid';



export const CharacterContext = createContext({
    email: "",
    charId: "",
    playingCharacter: {},
    availableChar: [],
    lastAccessed: "",
    progress: "",
    loadAvailableChars: () => {},
    selectChar: () => {},
    initNewChar: () => {},
    getCharacter: () => {},
    updateLastAccessed: () => {},
    updateChar: async () => {}
})

function CharacterProvider({ children }) {
    const authCtx = useContext(AuthContext);

    const [charId, setCharId] = useState("");
    const [email, setEmail] = useState("");
    const [playingCharacter, setPlayingCharacter] = useState();
    const [availableChar, setAvailableChar] = useState([]);
    const [lastAccessed, setLastAccessed] = useState(new Date());
    const [progress, setProgress] = useState(0);

    useEffect( () => {
        if (authCtx.isAuthenticated) {
            setEmail(authCtx.email)
            loadAvailableChars(email);
        }
    }, [authCtx.isAuthenticated]);


    useEffect(() => {
        const interval = setInterval(async () => {
            console.log("interval", interval);
            await increaseAge();
        }, 60000); // 1 minute

        return () => clearInterval(interval);
    }, [playingCharacter]); // Run only when playingCharacter changes

    async function increaseAge() {
        if (!playingCharacter) return; // If no character is selected, do nothing

        const updatedCharacter = playingCharacter;
        updatedCharacter.age += parseFloat((1 / 12).toFixed(2)); // Increase age by 1/12 every minute
        const progressValue = playingCharacter.age
        await updateChar(updatedCharacter);
        setProgress((progressValue - Math.floor(progressValue)).toFixed(2));
    }
    async function selectChar(character) {
        const segment = Object.keys(character)[0]
        const selectedChar = character[segment];
        setCharId(segment)
        setPlayingCharacter(selectedChar)

    }

    async function loadAvailableChars() {
        const email = await authCtx.email;
        const allChars = await getAll(email)
            .then(data => {
                let arr = [];
                data.forEach(item => {
                    let ob = {}
                    const seg = item._document.key.path.lastSegment()
                    ob[seg] = item.data()
                    arr.push(ob);
                });
                return arr; // Always return an array
            })
            .catch(err => {
                console.error("Error occurred while fetching data:", err);
                return [];
            });
        setAvailableChar(allChars);
    }

    async function initNewChar(name, gender) {
        let newChar = new Character();
        newChar.id = uuidv4();
        newChar.name = name;
        newChar.gender = gender;
        const res = await initCharacer(email, newChar);
        await loadAvailableChars(); // Reload available characters
        setPlayingCharacter(newChar);
        setCharId(res.id);
    }

    async function updateChar(character) {
        const index = availableChar.findIndex((char) => char.name === character.name);
        const res = await updateCharacter(email, charId, character)
        availableChar[index] = res;
        setPlayingCharacter(res)
    }

    async function updateLastAccessedTime() {
        setLastAccessed(new Date());
        try {
            // Update lastAccessed in the database
            await updateLastAccessed(email, charId, new Date());
        } catch (error) {
            console.error("Error updating last accessed:", error);
            // Handle error gracefully, display a message to the user, etc.
        }
    }

    async function getCharacter() {
        const res = await getCharacterByColId(playingCharacter.id);
    }

    const values = {
        email: email,
        charId: charId,
        playingCharacter: playingCharacter,
        availableChar: availableChar,
        progress: progress,
        loadAvailableChars: loadAvailableChars,
        selectChar: selectChar,
        initNewChar: initNewChar,
        updateLastAccessed: updateLastAccessedTime,
        updateChar: updateChar
    }

    return <CharacterContext.Provider value={values}>{children}</CharacterContext.Provider>
}

export default CharacterProvider;