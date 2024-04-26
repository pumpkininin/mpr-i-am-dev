import {Text, TouchableOpacity, StyleSheet} from "react-native";

export default function RectangleButton({text, color, onPress}) {
    return (
        <TouchableOpacity
            style={styles.rectangleBtn}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rectangleBtn: {
        width: 100,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
})