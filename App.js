import {SafeAreaView, StyleSheet} from "react-native";
import './firebase'
import MainNavigation from "./navigation/MainNavigation";
import AuthProvider from "./store/auth-context";


export default function App() {
  return (
      <AuthProvider>
          <SafeAreaView style={styles.container}>
              <MainNavigation />
          </SafeAreaView>
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