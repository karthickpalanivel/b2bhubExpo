import { StyleSheet } from "react-native";
import Navigation from "./src/navigation/Navigation";
import ProfileScreen from "./src/screens/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";


export default function App() {
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
