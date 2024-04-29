import {addDoc, collection, getFirestore, getDocs, query, where, updateDoc, doc} from "firebase/firestore";
import {characterConverter} from "../model/Character";

const db = getFirestore();

export async function initCharacer(email, character) {
    const ref = collection(db, "users", email, "characters").withConverter(characterConverter);

    return await addDoc(ref, character);
}

export async function getCharacterByColId(email, charId) {
    const q = query(collection(db,"users", email, "characters"), where("id", "==", charId)).withConverter(characterConverter);
    return getDocs(q);
}

export async function getCharacterByDocId(email, docId) {
    const res = query(collection(db,"users", email, "characters"), where("id", "==", docId)).withConverter(characterConverter)
    return getDocs(res);

}

export async function getAll(email) {
    const ref = collection(db, "users", email, "characters").withConverter(characterConverter);
    return await getDocs(ref);
}

export async function updateCharacter(email, docId, updatedCharacter) {
    const characterRef = doc(db, "users", email, "characters", docId).withConverter(characterConverter)

    try {
        await updateDoc(characterRef, characterConverter.toFirestore(updatedCharacter));
        console.log("Character updated successfully!");
        const res = await getCharacterByDocId(email, updatedCharacter.id)
        let char = {}
        res.forEach(item => {
            char = characterConverter.fromFirestore(item)
        })
        return char;
    } catch (error) {
        console.error("Error updating character:", error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

export async function updateLastAccessed(email, docId, lastAccessed) {
    const characterRef = doc(db,"users", email, "characters", docId).withConverter(characterConverter);

    try {
        const res = await updateDoc(characterRef, { lastAccessed });
        console.log("Last accessed updated successfully!");
        return res;
    } catch (error) {
        console.error("Error updating last accessed:", error);
        throw error;
    }
}