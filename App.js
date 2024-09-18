import { StyleSheet } from "react-native";
import Navigation from "./src/navigation/Navigation";
import i18n from "./src/language/i18next";
import { LanguageProvider } from "./src/hooks/LanguageContext";

export default function App() {
  return (
    <>
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>
    </>
  );
}

const styles = StyleSheet.create({});
