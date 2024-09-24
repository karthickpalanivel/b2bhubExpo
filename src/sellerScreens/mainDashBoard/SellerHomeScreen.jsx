import React, { useState, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ProductDisplay from "../sellerComponents/ProductDisplay";
import * as Font from "expo-font";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";
import { ArrowRightStartOnRectangleIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/LanguageContext";
import { LanguageIcon, XCircleIcon } from "react-native-heroicons/outline";
import LanguageList from '../../language/LanguageList.json'
const colors="#E84A5F";
const backgrounds="#FCF8F3";

const SellerHomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [languageModel, setLanguageModel] = useState(false);
  const [yourLanguage, setYourLanguage] = useState("English");
  const [sellerName, setSellerName] = useState("");
  const [activeProduct, setActiveProduct] = useState(25);
  const [newOrders, setNewOrders] = useState(4);
  const [productPublished, setProductPublished] = useState(10);
  const [totalOrders, setTotalOrders] = useState(15);

  const { language, changeLanguage } = useLanguage();

  const show = () => {
    setLanguageModel(true);
  };
  const hide = () => {
    setLanguageModel(false);
  };
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

  const changeLng = (lng) => {
    setYourLanguage(LanguageList[lng].nativeName);
    changeLanguage(LanguageList[lng].shortName);
    hide();
  };
  const navigationToAddProduct = () => {
    navigation.navigate("ModifyProduct");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const kgToTonnes = (num) => {
    return num * 0.001;
  };

  const tonnesToKg = (num) => {
    return num * 1000;
  };

  AsyncStorage.getItem("customerId")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        //console.log("Value:", value);
      } else {
        // No value found
        //console.log("No value found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      //console.error("Error:", error);
    });

  const LanguageModal = ({ visible }) => {
    return (
      <>
        <Modal
          visible={visible}
          animationType="slide"
          onRequestClose={hide}
          transparent
        >
        <SafeAreaView style={styles.safeAreaContent}>
          <View style={styles.languageModalContainer}>
            <View>
              <TouchableOpacity>
                <XCircleIcon
                  size={wp(10)}
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
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <>
          <StatusBar style="dark" backgroundColor="#fff" />
          <View style={styles.container} >
            <View>
              <View style={styles.header}>
                <View>
                  <View style={{ flexDirection: "row", marginVertical: wp(3) }}>
                    <Text style={styles.welcomeText}>{t("welcome")} </Text>
                    <Text style={styles.welcomeText}>{sellerName},</Text>
                  </View>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={show}
                  >
                    <LanguageIcon size={hp(2.8)} color={colors} />
                    <Text style={{ fontSize: wp(3.4), marginLeft: wp(1), fontFamily: "QuicksandSemiBold" }}>{yourLanguage}</Text>
                  </TouchableOpacity>

                 
                </View>
                
                {/* <Image
                  source={{
                    uri: "https://res.cloudinary.com/dve3s278t/image/upload/v1726223190/bc9fd4bd-de9b-4555-976c-8360576c6708_l9xbwx.jpg",
                  }}
                  style={styles.profilePic}
                /> */}
                <View>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={handleLogout}
                  >
                    <ArrowRightStartOnRectangleIcon
                      color={"#333"}
                      size={wp(8)}
                      strokeWidth={wp(0.3)}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                  <Text>{t("logout")}</Text>
                </View>
               
              </View>
              <View>
              <TouchableOpacity
              style={styles.addProductContainer}
              onPress={navigationToAddProduct}
            >
              <Text style={styles.addProductText}>{t("add_new_product")}</Text>
            </TouchableOpacity>
              </View>
              <LanguageModal visible={languageModel} />


              
              <View style={styles.cardsContainer}>
                {/* <View style={[styles.card, { backgroundColor: "#A3D8A2" }]}>
                  <Text style={styles.cardTitle}>{t("active_product")}</Text>
                  <Text style={styles.cardNumber}>
                    {activeProduct > 0
                      ? activeProduct
                      : "Currently no products added"}
                  </Text>
                  <Text style={styles.cardDescription}>↑ 3 in last 7 days</Text>
                </View> */}

                {/* <View style={[styles.card, { backgroundColor: "#F7A7A6" }]}>
                  <Text style={styles.cardTitle}>{t("total_order")}</Text>
                  <Text style={styles.cardNumber}>
                    {totalOrders > 0 ? totalOrders : "None"}
                  </Text>
                   <Text style={styles.cardDescription}>
                    ↓ 1 Less vs last month
                  </Text> 
                </View> */}

                {/* <View style={[styles.card, { backgroundColor: "#F9D276" }]}>
                  <Text style={styles.cardTitle}>{t("pending_publish")}</Text>
                  <Text style={styles.cardNumber}>
                    {productPublished > 0 ? productPublished : "None"}
                  </Text>
                  <Text style={styles.cardDescription}>{t("waiting")}</Text>
                </View> */}

                {/* <View style={[styles.card, { backgroundColor: "#A0C4FF" }]}>
                  <Text style={styles.cardTitle}>{t("new_order")}</Text>
                  <Text style={styles.cardNumber}>
                    {newOrders > 0 ? newOrders : "None"}
                  </Text>
                  <Text style={styles.cardDescription}>
                    {t("no_new_orders")}
                  </Text>
                </View> */}
              </View>
              
            </View>
            

            <ProductDisplay />
           

            
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: wp(5),
    padding: wp("5%"),
    backgroundColor: backgrounds,
    marginBottom:wp(0)
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  welcomeText: {
    fontSize: wp("4%"),
    color: "#333",
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
  },
  nameText: {
    fontSize: wp("6%"),
    // fontWeight: "bold",
    fontFamily: "QuicksandBold",
  },
  profilePic: {
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("7.5%"),
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: wp("42%"),
    height: hp("18%"),
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginBottom: wp("4%"),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: wp("4%"),
    color: "#FFF",
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
  },
  cardNumber: {
    fontSize: wp(5),
    // fontWeight: "bold",
    color: "#FFF",
    marginVertical: hp("1%"),
    fontFamily: "QuicksandSemiBold",
  },
  cardDescription: {
    fontSize: wp("3.5%"),
    color: "#FFF",
    fontFamily: "QuicksandSemiBold",
  },
  addProductContainer: {
    paddingVertical: wp(0.2),
    paddingHorizontal: wp(4),
    height: wp(12),
    backgroundColor: "#283C63",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    elevation: 2,
    margin:wp(5),
  },
  addProductText: {
    color: "white",
    fontSize: wp(3.5),
    fontFamily: "QuicksandBold",
  },

  // language modal styles

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
    borderColor:backgrounds,
    borderWidth:wp(0.5)
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
    borderTopColor:backgrounds,
    borderTopWidth:wp(0.1)
  },

  languageText: {
    fontSize: hp(2.5),
    color: "white",
    borderBottomWidth: 0.2,
    borderColor: "white",
    fontFamily: "QuicksandSemiBold",
  },
});

export default SellerHomeScreen;
