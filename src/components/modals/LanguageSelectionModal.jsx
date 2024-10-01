import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";
import { useTranslation } from "react-i18next";
import LanguageList from "../../language/LanguageList.json";
import { useLanguage } from "../../hooks/LanguageContext";
import * as Font from "expo-font";
import { XCircleIcon, LanguageIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import i18next from "i18next";

const colors = "#E84A5F";
const backgrounds = "#FCF8F3";

const LanguageSelectionModal = ({
  visible,
  setVisible,
  language,
  setLanguage,
}) => {
  //declartion of variables and hooks

  const navigation = useNavigation();
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require("../../assets/fonts/Quicksand Regular.ttf"),
        QuicksandBold: require("../../assets/fonts/Quicksand Bold.ttf"),
        QuicksandSemiBold: require("../../assets/fonts/Quicksand SemiBold.ttf"),
        QuicksandLight: require("../../assets/fonts/Quicksand Light.ttf"),
      });
      setIsLoading(false);
    }
    loadFonts();
  }, []);

  //utilities

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const changeLng = () => {
    setLanguage(LanguageList[lng].nativeName);
    changeLanguage(LanguageList[lng].shortName);
    hide();
  };

  //Main component return values
  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <Modal
          transparent={true}
          visible={visible}
          onRequestClose={() => hide()}
          animationType="slide"
        >
          <SafeAreaView style={styles.safeAreaContent}>
            <View style={styles.languageModalContainer}>
              <View>
                <TouchableOpacity>
                  <XCircleIcon
                    size={wp(8)}
                    color="white"
                    style={styles.iconX}
                    onPress={hide}
                  />
                </TouchableOpacity>

                <FlatList
                  data={Object.keys(LanguageList)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.languageContainer}
                      onPress={() => changeLng(item)}
                    >
                      <Text style={styles.languageText}>
                        {LanguageList[item].nativeName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
};

export default LanguageSelectionModal;

const styles = StyleSheet.create({
  safeAreaContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: wp(100),
    height: hp(100),
    borderTopRightRadius: wp(3),
    borderTopLeftRadius: wp(3),
  },

  languageModalContainer: {
    width: wp(80),
    backgroundColor: colors,
    elevation: 4,
    borderRadius: wp(3),
    borderColor: backgrounds,
    borderWidth: wp(0.5),
  },

  iconX: {
    position: "absolute",
    right: -10,
    top: -10,
  },

  languageContainer: {
    alignItems: "center",
    padding: hp(2),
    borderRadius: 4,
    borderTopColor: backgrounds,
    borderTopWidth: wp(0.1),
  },

  languageText: {
    fontSize: hp(2.5),
    color: "white",
    borderBottomWidth: 0.2,
    borderColor: "white",
    fontFamily: "QuicksandSemiBold",
  },
});
