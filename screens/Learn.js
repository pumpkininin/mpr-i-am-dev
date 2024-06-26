import {CharacterContext} from "../store/character-context";
import { useContext, useState, useEffect } from "react";
import {View, StyleSheet, TouchableOpacity, FlatList, Text} from "react-native";
import RoundedButton from "../components/UI/RoundedButton";

export default function Learn({navigation}) {
    const charCtx = useContext(CharacterContext);
    const lastAccessed = charCtx.lastAccessed;
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const buttonArr = [
        {
            "icon":"calculator-outline",
            "title": "Math",
            "params":"19"
        },
        {
            "icon": "code-working-outline",
            "title": "Coding",
            "params": "18"
        },
        {
            "icon": "book-outline",
            "title": "Literature",
            "params": "10"
        },
        {
            "icon": "earth-outline",
            "title": "General knowledge",
            "params": "9"
        }
    ]


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Text style={styles.header}>Choose subject you want to learn and do the test to increase your skill point at that subject!</Text>
            <FlatList
                style={styles.list}
                data={buttonArr}
                renderItem={
                    (item) => {
                        return <RoundedButton
                            icon={item.item.icon}
                            title={item.item.title}
                            onPressHandler={() => {
                                navigation.navigate('LearnDetails', {subjectId : item.item.params})
                            }}/>
                    }
                }
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontFamily: 'cyber-display',
        fontSize: 24,
        margin: 20,
        textAlign: "center"
    },
    list: {
        flex: 1,
        marginHorizontal: 40
    }
})