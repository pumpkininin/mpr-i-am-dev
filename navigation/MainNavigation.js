import {StyleSheet} from "react-native";
import {useContext} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import {AuthContext} from "../store/auth-context";
import Lobby from "../screens/Lobby";
import CreateCharacter from "../screens/CreateCharacter";
import MainScreen from "../screens/MainScreen";


const Stack = createNativeStackNavigator();

export default function MainNavigation() {


    const authCtx = useContext(AuthContext);
    return (
        <NavigationContainer style={styles.container}>
            {authCtx.isAuthenticated ? <AuthenticatedStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}

function AuthenticatedStack() {
    return (
            <Stack.Navigator
                style={styles.navigator}
                screenOptions={{
                    headerStyle: { backgroundColor: 'dodgerblue', flex: 1 },
                    headerTintColor: 'white',
                }}>

                <Stack.Screen
                    name="Lobby"
                    component={Lobby}
                    screenOptions={{}}
                    options={{
                        headerShown: false
                    }}/>
                <Stack.Screen
                    name="CreateCharacter"
                    component={CreateCharacter}
                    screenOptions={{}}
                    options={{
                        headerShown: false
                    }}/>
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    screenOptions={{}}
                    options={{
                        headerShown: false
                    }}/>
            </Stack.Navigator>

    )
}

function AuthStack() {
    return (
        <Stack.Navigator
            style={styles.navigator}
            screenOptions={{
                headerStyle: { backgroundColor: 'dodgerblue', flex: 1 },
                headerTintColor: 'white',
            }}>
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                screenOptions={{}}
                options={{
                    headerShown: false
                }}/>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                ScreenOptions={{}}
                options={{
                    headerShown: false
                }}/>
        </Stack.Navigator>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    navigator: {

    }
})