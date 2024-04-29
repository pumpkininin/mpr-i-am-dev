import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { CharacterContext } from '../store/character-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Learn from './Learn';
import LearnDetails from './LearnDetails';
import Profile from './Profile';
import DoExerciseScreen from "./DoExerciseScreen";

const Stack = createNativeStackNavigator();

export default function MainScreen({ route, navigation }) {
    const charCtx = useContext(CharacterContext);

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
                    screenOptions={{}}
                    options={{
                        headerShown: false
                    }}/>
                <Stack.Screen
                    name="Learn"
                    component={Learn}
                    screenOptions={{}}
                    />
                <Stack.Screen
                    name="LearnDetails"
                    component={LearnDetails}
                    screenOptions={{}}
                    />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    screenOptions={{}}
                    />
                <Stack.Screen
                    name="DoExercise"
                    component={DoExerciseScreen}
                    screenOptions={{}}
                />
            </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: "center"
    },
    navigator: {

    }
});
