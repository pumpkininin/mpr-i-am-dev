import {CharacterContext} from "../store/character-context";
import { useContext, useState, useEffect } from "react";
import {View, Button, StyleSheet, TouchableOpacity, FlatList, Text, Animated} from "react-native";
import DailyRewardOverlay from "../components/UI/DailyRewardOverlay";
import Character from "../model/Character";
import RoundedButton from "../components/UI/RoundedButton";
import RectangleButton from "../components/UI/RectangleButton";
import ProgressBar from "../components/UI/ProgressBar";
import dailyRewardOverlay from "../components/UI/DailyRewardOverlay";


export default function Home({navigation}) {
    const charCtx = useContext(CharacterContext);
    const lastAccessed = charCtx.lastAccessed;
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [progress, setProgress] = useState(charCtx.progress);
    const [age, setAge] = useState(charCtx.playingCharacter.age);
    const buttonArr = [
        {
            "icon":"book-outline",
            "title": "Learn",
            "route":"Learn"
        },
        {
            "icon": "information-circle-outline",
            "title": "Your profile",
            "route":"Profile"
        },
        {
            "icon": "barbell-outline",
            "title": "Do exercise",
            "route":"DoExercise"
        },
        {
            "icon": "briefcase-outline",
            "title": "Find job",
            "route":"Find-job"
        }
    ]
    useEffect(() => {
        // Update the age state when it changes in the context
        setAge(charCtx.playingCharacter.age);
    }, [charCtx.playingCharacter.age]);

    useEffect(() => {
        // Calculate progress based on age
        console.log(charCtx.progress)
        setProgress(charCtx.progress);
    }, [charCtx.progress]);

    useEffect(() => {
        if (isLastAccessedYesterday) {
            setIsOverlayVisible(true);
        }
    }, []);

    const toggleOverlay = () => {
        let char = charCtx.playingCharacter;
        if (char instanceof Character) {
            let hasCoin = false;
            for (item of char.inventory) {
                if (item.name === "cash") {
                    hasCoin = true;
                }
            }
            if (hasCoin) {
                const foundedItem = char.inventory.find(item => {
                    return item.name === "cash";
                })
                foundedItem.quantity += 1000;
            } else {
                char.inventory.push({
                    name: "cash",
                    quantity: 1000,
                })
            }
            charCtx.updateChar(char)
            charCtx.updateLastAccessed()
        }
        setIsOverlayVisible(!isOverlayVisible);
    };

    const skip5YearsHandler = async () => {
        let char = charCtx.playingCharacter;
        if (char instanceof Character) {
            char.age += 5;
            await charCtx.updateChar(char);
        }
    }

    const isYesterday = (date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear();
    };

    const lastAccessedDate = new Date(lastAccessed);
    const isLastAccessedYesterday = isYesterday(lastAccessedDate);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Text style={[{marginBottom: 20, fontSize: 24, fontFamily: "cyber-display", textAlign: "center"}]}>{`Your age are at ${Math.floor(age)}`}</Text>
            <ProgressBar  progress={progress}/>
            <FlatList
                style={styles.list}
                data={buttonArr}
                renderItem={
                    (item) => {
                        return <RoundedButton
                            icon={item.item.icon}
                            title={item.item.title}
                            onPressHandler={
                                () => {
                                    navigation.navigate(item.item.route)
                                }
                            }/>
                    }
                }
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
            />
            {
                charCtx.playingCharacter.age < 5 &&
                <RectangleButton text={"Skip 5 years"} onPress={skip5YearsHandler} />
            }
            <DailyRewardOverlay title={"Daily reward"} isVisible={isOverlayVisible} onClose={toggleOverlay} text={"You got daily reward for today"} reward={"Earn $1000"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginHorizontal: 40
    }
})