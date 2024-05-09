import {SafeAreaView, Text, View, StyleSheet, StatusBar, TouchableOpacity, ImageBackground} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState, useContext} from "react";
import CustomInput from "../components/UI/CustomInput";

import {AuthContext} from "../store/auth-context";
import {GlobalStyles} from "../constants/Color";

const image = {uri: "https://xclcamps.com/wp-content/uploads/coding-difference-1.jpg"}

export default function SignUp({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const authCtx = useContext(AuthContext);

    const errorCodeMap = {
        "auth/email-already-in-use": "Your email is already in use",
        "auth/invalid-email": "Invalid email address",
        "auth/operation-not-allowed": "Operation is not allowed",
        "auth/weak-password": "Weak password. Your password have to contain more than 6 characters long",
    }

    const handleSignUp = async () => {
        const auth = getAuth();
        setPasswordError('')
        setEmailError('')
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                authCtx.authenticate(email,user.accessToken)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode.includes('email')) {
                    setEmailError(errorCodeMap[errorCode])
                } else {
                    setPasswordError(errorCodeMap[errorCode])
                }
            });
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>

            <Text style={styles.title}>Sign Up</Text>
            <CustomInput
                containerStyle={{ marginHorizontal: 20 }}
                placeholder={'Email'}
                onChangeText={setEmail}
                error={emailError}
            />
            <CustomInput
                containerStyle={{ marginHorizontal: 20, marginTop: 10 }}
                placeholder={'Password'}
                onChangeText={setPassword}
                error={passwordError}
                secureTextEntry
            />
            <TouchableOpacity
                style={[styles.loginButton, {backgroundColor: GlobalStyles.colors.primary500}]}
                onPress={handleSignUp}
            >
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText} onPress={() => navigation.navigate('SignIn')}>Sign In?</Text>
            </View>
            </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center',
        fontFamily: "cyber-display",

    },
    title: {
        fontSize: 32,
        alignSelf: "center",
        margin: 40,
        fontWeight: "bold",
        color: "#ffffff",
        fontFamily: "cyber-display",
    },
    loginButton: {
        width: 100,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 22,
        color: 'white',
        fontFamily: "cyber-display",
    },
    optionContainer: {
        margin: 20,
        alignItems: "center",
    },
    optionText: {
        textDecorationStyle: 'dashed',
        fontFamily: "cyber-display",
        color: "#fff",
        fontSize: 18
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
})