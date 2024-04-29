import React, { useState, useEffect, useRef, useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RectangleButton from "../components/UI/RectangleButton";
import DailyRewardOverlay from "../components/UI/DailyRewardOverlay";
import {CharacterContext} from "../store/character-context";

export default function DoExerciseScreen({navigation}) {
    const charCtx = useContext(CharacterContext)
    const [count, setCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [points, setPoints] = useState(0);
    const timerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft === 0) {
                    clearInterval(timerRef.current);
                    setPoints(count);
                } else {
                    return prevTimeLeft - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    const handlePress = () => {
        setIsVisible(true)
        setCount(prevCount => prevCount + 1);
    };

    const handleReset = async () => {
        setIsVisible(false)
        const char = charCtx.playingCharacter;
        if (char instanceof CharacterContext) {
            let health;
            char.health += 1;
            await charCtx.updateChar(char)
        }
        setCount(0);
        setTimeLeft(30);
        setPoints(0);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft === 0) {
                    clearInterval(timerRef.current);
                    setPoints(count);
                } else {
                    return prevTimeLeft - 1;
                }
            });
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Press the screen as many times as you can!</Text>
            <Text style={styles.timer}>Time left: {timeLeft} seconds</Text>
            <Text style={styles.count}>Count: {count}</Text>
            <RectangleButton text={"Press me"} onPress={handlePress} />
            {timeLeft === 0 && (
                <DailyRewardOverlay title={"Excercise reward"} isVisible={isVisible} onClose={handleReset} text={`You got ${count} times left`} rewards={"Increase health by 1"}/>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    timer: {
        fontSize: 18,
        marginBottom: 10,
    },
    count: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 20,
        marginBottom: 10,
    },
    resetButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
