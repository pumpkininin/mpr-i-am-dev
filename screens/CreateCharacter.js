import { useState, useContext } from "react";
import {Text,View, StyleSheet} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';

import CustomInput from "../components/UI/CustomInput";
import {CharacterContext} from "../store/character-context";
import Character from "../model/Character";
import RectangleButton from "../components/UI/RectangleButton";

const gender = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'Female' },
    { label: 'None', value: 'none' }
];


export default function CreateCharacter({navigation}) {

    const [character, setCharacter] = useState(new Character());
    const [charName, setCharName] = useState("");
    const [genderValue, setGenderValue] = useState("male");
    const [isFocus, setIsFocus] = useState(false);
    const [charNameError, setCharNameError] = useState("");
    const charCtx = useContext(CharacterContext);
    const availableChar = charCtx.availableChar;
    const onCreateCharacter = async () => {
        if (charName === "") {
            setCharNameError("Character name must not be empty")
            return;
        }
        let isInvalidCharName = false;
        for (let aChar of availableChar) {
            if (aChar.name === charName) {
                isInvalidCharName = true;
                break
            }
        }
        if (isInvalidCharName) {
            setCharNameError("Character name " + charName + " already exist");
        } else {
            await charCtx.initNewChar(charName, genderValue);
            navigation.navigate("MainScreen");
        }

    }

    return (
        <View style={styles.container}>
            <CustomInput
                style={styles.charNameInput}
                containerStyle={{ marginHorizontal: 20 }}
                placeholder={'Character name'}
                onChangeText={setCharName}
                error={charNameError}
            />
            <Dropdown data={gender}
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      placeholder={'Select gender'}

                      labelField="label"
                      valueField="value"
                      onChange={item => {
                          setGenderValue(item.value)
                          setIsFocus(false)
                      }}
                      value={genderValue}
                      onFocus={() => setIsFocus(true)}
                      renderLeftIcon={() => {
                          <Ionicons name="transgender-outline" size={16} />
                      }}
            />
            <RectangleButton text={"Create Character"} onPress={onCreateCharacter} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center',
    },
    charNameInput: {

    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        margin: 20,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})