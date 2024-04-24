import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useState, useContext} from "react";
import CustomInput from "../components/UI/CustomInput";
import {AuthContext} from "../store/auth-context";


export default function SignIn({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const authCtx = useContext(AuthContext)

    const handleSignUp = async () => {
        const auth = getAuth();
        setPasswordError('')
        setEmailError('')
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                authCtx.authenticate(user.accessToken)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode.includes('email')) {
                    setEmailError(errorMessage)
                } else {
                    setPasswordError(errorMessage)
                }
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
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
                style={styles.loginButton}
                onPress={handleSignUp}
            >
                <Text style={styles.buttonText}>Signin</Text>
            </TouchableOpacity>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText} onPress={() => navigation.navigate('SignUp')}>Signup</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        alignSelf: "center",
        margin: 40,
        fontWeight: "bold",
    },
    loginButton: {
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
    optionContainer: {
        margin: 20,
        alignItems: "center",
    },
    optionText: {
        textDecorationStyle: 'dashed'

    }
})