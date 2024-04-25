import { useContext } from "react";
import {FlatList, Text, View} from "react-native";
import { CharacterContext } from "../store/character-context";
import Icon from "react-native-ionicons";


export default function Lobby({ navigation }) {
    const charCtx = useContext(CharacterContext);
    const availableChar = charCtx.availableChar;
    return (
        <View style={styles.container}>
            <FlatList data={availableChar} renderItem={} />
        </View>
    )
}

function CharItem(character) {
    function handleSelectCharacter(character) {
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