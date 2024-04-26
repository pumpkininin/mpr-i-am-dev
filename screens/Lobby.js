import { useContext } from "react";
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { CharacterContext } from "../store/character-context";
import Icon from "react-native-ionicons";
import RectangleButton from "../components/UI/RectangleButton";


export default function Lobby({ navigation }) {
    const charCtx = useContext(CharacterContext);
    const availableChar = charCtx.availableChar;

    return (
        <View style={styles.container}>
            <Text>{"Play existing character"}</Text>
            <FlatList data={availableChar} renderItem={(char) => <CharItem character={char} />} />
            <Text>{"Or create new character"}</Text>
            <RectangleButton text={"New Character"} color={"success"} onPress={() => navigation.navigate('CreateCharacter')} />
        </View>
    )
}

function CharItem({character}) {
    function handleSelectCharacter() {
        const charCtx = useContext(CharacterContext);
        charCtx.selectChar(character)
    }
    return (
        <TouchableOpacity style={styles.charContainer}
        onPress={handleSelectCharacter}
        >
            <Icon name="person-outline"/>
            <Text>{character.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: "middle"
    },
})