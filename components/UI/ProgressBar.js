import { useState, useEffect } from "react";
import {View, Text, StyleSheet, Animated, Easing} from "react-native";

export default function ProgressBar({progress}) {
    const [animatedProgress, setAnimatedProgress] = useState(new Animated.Value(0));
    const [progressValue, setProgressValue] = useState(new Animated.Value(0));
    const [width, setWidth] = useState(0);
    useEffect( () => {
        setProgressValue(new Animated.Value((progress - Math.floor(progress))*100))
        setWidth((progress)*300)
        console.log(width)
        Animated.timing(animatedProgress, {
            toValue: progressValue,
            duration: 2000,
            useNativeDriver: false,
            easing: Easing.linear,
        }).start();
    }, [progress]);

    return (
        <View style={styles.container}>
            <View style={[styles.bar, { width: width}]} />
            <Text style={{textAlign: "center"}} >{`${width/3}%`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 30,
        backgroundColor: '#ccc',
        borderRadius: 10,
        width: 300,
        margin: 20
    },
    bar: {
        height: 30,
        backgroundColor: '#333',
        borderRadius: 10,
        borderWidth: 1,
    },
});