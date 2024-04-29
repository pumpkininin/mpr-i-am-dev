import { useContext, useState } from "react";
import {FlatList, Text, View, StyleSheet, TouchableOpacity, Platform} from "react-native";
import { CharacterContext } from "../store/character-context";
import {Ionicons} from "@expo/vector-icons";
import RectangleButton from "../components/UI/RectangleButton";


export default function Lobby({ navigation }) {

    const charCtx = useContext(CharacterContext);
    const availableChar = charCtx.availableChar;
    const handleSelectChar = async (character) => {

        await charCtx.selectChar(character)
        navigation.navigate("MainScreen")
    }
    return (
        <View style={styles.container}>
            <View style={styles.availableList}>
                <Text style={[{marginBottom: 20, fontSize: 24, fontFamily: "cyber-display", textAlign: "center"}]}>{"Play existing character"}</Text>
                <FlatList
                    style={styles.listChar}
                    data={availableChar}
                    renderItem={
                        (char) => <CharItem character={char.item} handlerSelectChar={() => handleSelectChar(char.item)} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
            <View style={styles.newChar}>
                <Text style={{marginTop: 20, fontSize: 24,fontFamily: "cyber-display",}}>{"Or create new character"}</Text>
                <RectangleButton text={"New Character"} color={"success"} onPress={() => navigation.navigate('CreateCharacter')} />
            </View>
         </View>
    )
}

function CharItem({character, handlerSelectChar, bgColor}) {
    const key = Object.keys(character)[0]
    const char = character[key]
    let genderIcon;
    if (char.gender === "male") {
        genderIcon = "man-outline"
    } else if (char.gender === "female") {
        genderIcon = "female-outline"
    } else {
        genderIcon = "person-outline"
    }
    return (

        <TouchableOpacity style={[styles.charContainer, {backgroundColor: bgColor}]}
        onPress={handlerSelectChar}
        >

            <Ionicons name={genderIcon} size={16} color={'red'} />
            <View style={styles.textContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: "cyber-display" }}>{"Name: "}</Text>
                    <Text style={{ fontFamily: "cyber-display" }}>{char.name}</Text>
                    <Text style={{ fontFamily: "cyber-display" }}>{"   Age: "}</Text>
                    <Text style={{ fontFamily: "cyber-display" }}>{char.age.toFixed(0)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: "cyber-display" }}>{"Last access: " + character.lastAccessed}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: "middle",
        marginVertical: 20
    },
    availableList: {
        flex: 8
    },
    newChar: {
        flex: 2
    },
    charContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#5be9aa",
        padding: 20,
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 10, // Adjust margin as needed
        justifyContent: 'space-around',
        fontFamily: "cyber-display",
    },

})