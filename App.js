import {SafeAreaView, StyleSheet} from "react-native";
import {useCallback} from "react";
import './firebase'
import {useFonts} from 'expo-font';
import MainNavigation from "./navigation/MainNavigation";
import AuthProvider from "./store/auth-context";
import CharacterProvider from "./store/character-context";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'cyber-display': require('./assets/fonts/CyberDisplay-VGvGx.ttf'),

    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

  return (
      <AuthProvider>
        <CharacterProvider>
            <SafeAreaView style={styles.container}  onLayout={onLayoutRootView}>
                <MainNavigation />
            </SafeAreaView>
        </CharacterProvider>
      </AuthProvider>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        fontFamily: "cyber-display",

    },
});