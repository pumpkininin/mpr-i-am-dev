import React, { useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {GlobalStyles} from "../../constants/Color";

export default function RectangleButton({text, startColor = GlobalStyles.colors.primary500, endColor = GlobalStyles.colors.primary800, onPress}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonParent}>
                    <LinearGradient
                        colors={[startColor, endColor]}
                        style={styles.buttonGrad}>
                        <Text style={styles.buttonText}>{text}</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGrad: {
        height: 50,
        width: 200,
        borderRadius: 10,
        position: 'absolute',
        bottom: 5,
        justifyContent: 'center',
    },
    buttonParent: {
        height: 50,
        width: 200,
        borderRadius: 10,
        backgroundColor: '#024e51',
        justifyContent: 'center',

    },
    buttonText: {
        color: '#ffffff', // Text color
        fontWeight: 'bold', // Optional: make text bold
        fontSize: 18,
        fontFamily: "cyber-display",
        alignSelf: 'center', // Center text vertically
        padding: "auto"
    },
});