import {SafeAreaView, StyleSheet} from "react-native";
import {useContext, useEffect, useState} from "react";
import {CharacterContext} from "../store/character-context";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Home from "./Home";
import Learn from "./Learn";
import LearnDetails from "./LearnDetails";
import ProgressBar from "../components/UI/ProgressBar";

const Stack = createNativeStackNavigator();

export default function MainScreen({ route, navigation }) {
    const charCtx = useContext(CharacterContext)
    const [progress, setProgress] = useState(0);


    useEffect(() => {

            setProgress(prevProgress => {
                const newProgress = prevProgress + 0.1;
                return newProgress >= 1 ? 1 : newProgress;
            });


    }, [charCtx.playingCharacter.age]);

    return (
        <SafeAreaView>
            <ProgressBar progress={progress}/>

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
                <Stack.Screen
                    name="Learn"
                    component={Learn}
                    screenOptions={{}}/>
                <Stack.Screen
                    name="LearnDetails"
                    component={LearnDetails}
                    screenOptions={{}}/>
            </Stack.Navigator>
        </SafeAreaView>
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