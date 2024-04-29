import {TouchableOpacity, Text, View, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {GlobalStyles} from "../../constants/Color";

export default function RoundedButton({icon, onPressHandler, title, startColor = GlobalStyles.colors.primary500, endColor = GlobalStyles.colors.primary200}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressHandler} style={styles.button}>
                <LinearGradient
                    colors={[startColor, endColor]}
                    style={styles.buttonGrad}>
                    <Ionicons name={icon} style={styles.icon} size={45} color={GlobalStyles.colors.primary50}/>
                </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'transparent', // Set background to transparent
        aspectRatio: 1, // This keeps the button square
        borderRadius: 10, // Adjust the border radius as needed
        borderWidth: 2, // Add border for a more game-like appearance
        borderColor: 'transparent', // Border color
        justifyContent: 'center', // Center align the icon
        alignItems: 'center', // Center align the icon
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5, // Adds a shadow effect for Android (iOS uses shadowOpacity in a similar way)
        marginHorizontal: 20,
        marginVertical: 10,

    },
    title: {
        marginTop: 5,
        color: '#2c3e50',
        fontSize: 20,
    },
    buttonGrad: {
        height: 110,
        width: 110,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
});
