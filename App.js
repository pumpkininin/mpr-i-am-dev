import {SafeAreaView, StyleSheet} from "react-native";
import './firebase'
import MainNavigation from "./navigation/MainNavigation";
import AuthProvider from "./store/auth-context";
import CharacterProvider from "./store/character-context";


export default function App() {
  return (
      <AuthProvider>
        <CharacterProvider>
            <SafeAreaView style={styles.container}>
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
    },
});