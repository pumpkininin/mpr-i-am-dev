import { StyleSheet } from "react-native";
import {useContext} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Home from "../screens/Home";
import {AuthContext} from "../store/auth-context";


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
                    name="Home"
                    component={Home}
                    screenOptions={{}}/>
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
                screenOptions={{}}/>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                ScreenOptions={{}}/>
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