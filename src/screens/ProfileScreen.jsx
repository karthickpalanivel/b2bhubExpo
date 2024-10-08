import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Modal,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CompanyData } from "../data/CompanyData";

import {
  BuildingOffice2Icon,
  CogIcon,
  XCircleIcon,
  GiftIcon,
  TruckIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/outline";
import {
  IdentificationIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  LanguageIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import AppLoaderAnimation from "../components/loaders/AppLoaderAnimation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FloatingNavigationButton from "../components/button/FloatingNavigationButton";
import * as Font from "expo-font";
import { useTranslation } from "react-i18next";
import LanguageList from "../language/LanguageList.json";
import { useLanguage } from "../hooks/LanguageContext";


const colors="#E84A5F";
const backgrounds="#FCF8F3";

const ProfileScreen = () => {

  const navigation = useNavigation();
  const { language, changeLanguage } = useLanguage();
  const [companyName, setCompanyName] = useState("Your Company");
  const [phone, setPhone] = useState("9856743210");
  const [modalVisible, setModalVisible] = useState(false);
  const [yourLanguage, setYourLanguage] = useState(LanguageList[language].nativeName);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require("../assets/fonts/Quicksand Regular.ttf"),
        QuicksandBold: require("../assets/fonts/Quicksand Bold.ttf"),
        QuicksandSemiBold: require("../assets/fonts/Quicksand SemiBold.ttf"),
        QuicksandLight: require("../assets/fonts/Quicksand Light.ttf"),
      });
      setIsLoading(false);
    }
    loadFonts();
  }, []);

  const handleLogout = () => {
    navigation.navigate("Login");
    AsyncStorage.setItem("loginstate", "false");
    // console.log("Logout button clicked");
  };

  
  useEffect(()=>{
    async function getItems(){
      AsyncStorage.getItem("companyname")
      .then((value) => {
        if (value !== null) {
          setCompanyName(value);
        } else {
          console.log("No value found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  
    AsyncStorage.getItem("phone")
      .then((value) => {
        if (value !== null) {
          setPhone(value);
        } else {
          console.log("No value found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    getItems()
 }, [])



  

  const goback = () => {
    navigation.navigate("Home");
  };

  const whatsappSupportTeam = "http://wa.me/+14155238886?text=Hi%20";

  const connectionToWhatsapp = async () => {
    try {
      const canOpen = await Linking.canOpenURL(whatsappSupportTeam);
      if (!canOpen) {
        throw new Error("Whatsapp is not installed on your device");
      }
      await Linking.openURL(whatsappSupportTeam);
    } catch (err) {
      console.log("Error occured with whatsapp", err);
    }
  };

  const supportTeamMail = "mailto:support@b2bhubindia.com";

  const connectionToMail = async () => {
    try {
      const canOpen = await Linking.canOpenURL(supportTeamMail);
      if (!canOpen) {
        throw new Error("Error occured");
      }
      await Linking.openURL(supportTeamMail);
    } catch (err) {
      console.log(err);
    }
  };

  // logic from backend need to be applied

  //language logic written here
  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);

  const changeLng = (lng) => {
    // i18next
    //   .changeLanguage(lng)
    //   .then(() => {
    setYourLanguage(LanguageList[lng].nativeName);
    //     hide();
    //   })
    //   .catch((err) => console.log("Error changing language:", err));
    changeLanguage(LanguageList[lng].shortName);
    hide();
  };

  const languageName = (languageShortName) =>{
    return 
  }

  const LanguageModal = ({ visible }) => {
    return (
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

        {/* <Text
              style={{
                fontSize: hp(3),
                textAlign: "center",
                marginTop: wp(5),
                color: "white",
                fontFamily: "QuicksandSemiBold",
              }}
            >
              {languageHeader}
            </Text>
            <TouchableOpacity
              style={styles.languageContainer}
              onPress={tamilLanguage}
            >
              <Text style={styles.languageText}>தமிழ்</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageContainer}
              onPress={teluguLanguage}
            >
              <Text style={styles.languageText}>తెలుగు</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageContainer}
              onPress={hindiLanguage}
            >
              <Text style={styles.languageText}>हिन्दी</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageContainer}
              onPress={englishLanguage}
            >
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity> */}
      </Modal>
    );
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View style={styles.container}>
          <StatusBar style="light" backgroundColor={colors}/>
          <ScrollView>
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={goback}>
                <ArrowLeftIcon
                  size={hp(2.5)}
                  strokeWidth={4.5}
                  color={"#fff"}
                />
              </TouchableOpacity>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "5%",
                  }}
                >
                  <BuildingOffice2Icon color={"white"} size={hp(5)} />
                  <Text style={styles.companyName}>{companyName}</Text>
                </View>
                <View>
                  <Text style={styles.phoneNumber}>+91 {phone}</Text>
                </View>
              </View>
              <View style={styles.profileImageContainer}>
                <Image
                  source={require("../assets/profileImage.png")}
                  style={styles.avatarImage}
                />
              </View>
            </View>

            <View style={styles.businessContainer}>
              <Text style={styles.business}>{t("business_information")}</Text>
            </View>
            <View style={styles.detailsContainer}>
              {/* accounts button */}
              <Pressable
                style={[
                  styles.profileScreenDetailsContainer,
                  { borderTopLeftRadius: 9, borderTopRightRadius: 9 },
                ]}
                onPress={() => navigation.navigate("AccountDetails")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <IdentificationIcon color={colors} size={hp(5)} />
                  <Text style={styles.contextName}>{t("accounts")}</Text>
                </View>
                <ChevronRightIcon
                  color={colors}
                  size={hp(2.5)}
                  strokeWidth={4.5}
                />
              </Pressable>

              {/* Delivery Details button */}

              <Pressable
                style={[
                  styles.profileScreenDetailsContainer,
                  { borderBottomLeftRadius: 9, borderBottomRightRadius: 9 },
                ]}
                onPress={() => navigation.navigate("DeliveryDetails")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TruckIcon color={colors} size={hp(5)} />
                  <Text style={styles.contextName}>{t("orders")}</Text>
                </View>
                <ChevronRightIcon
                  color={colors}
                  size={hp(2.5)}
                  strokeWidth={4.5}
                />
              </Pressable>

              {/* Rewards and offers button */}

              {/* <Pressable
          style={[styles.profileScreenDetailsContainer]}
          onPress={() => navigation.navigate("OfferRewardsDetails")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <GiftIcon color={"#4870F4"} size={hp(5)} />
            <Text style={styles.contextName}>Rewards & Offers</Text>
          </View>
          <ChevronRightIcon
            color={"#4870F4"}
            size={hp(2.5)}
            strokeWidth={4.5}
          />
        </Pressable> */}

              {/* Settings and policy button */}

              {/* <Pressable
          style={[styles.profileScreenDetailsContainer]}
          onPress={() => navigation.navigate("Settings")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CogIcon color={"#4870F4"} size={hp(5)} />
            <Text style={styles.contextName}>
              Settings & Privacy Policies
            </Text>
          </View>
          <ChevronRightIcon
            color={"#4870F4"}
            size={hp(2.5)}
            strokeWidth={4.5}
          />
        </Pressable> */}

              {/* Payment and shipping details button */}

              {/* <Pressable
          style={[
            styles.profileScreenDetailsContainer,
            { borderBottomLeftRadius: 9, borderBottomRightRadius: 9 },
          ]}
          onPress={() => navigation.navigate("PaymentShippingDetails")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CurrencyRupeeIcon color={"#4870F4"} size={hp(5)} />
            <Text style={styles.contextName}>Business Details</Text>
          </View>
          <ChevronRightIcon
            color={"#4870F4"}
            size={hp(2.5)}
            strokeWidth={4.5}
          />
          </Pressable> */}
            </View>

            {/* help desk container starts */}

            <View style={styles.helpDeskContainer}>
              <Text style={styles.helpDeskText}>{t("need_help")}</Text>
            </View>

            <View
              style={[
                styles.profileScreenDetailsContainer,
                {
                  borderTopLeftRadius: 9,
                  borderTopRightRadius: 9,
                  marginTop: hp(2),
                },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/whatsapp.png")}
                  style={styles.whatsapp}
                />
                <Text style={styles.contextName}>{t("reach_us")}</Text>
              </View>
              <TouchableOpacity
                style={styles.callContainer}
                onPress={connectionToWhatsapp}
              >
                <Text style={styles.callText}>{t("whatsapp")}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.profileScreenDetailsContainer,
                { borderBottomLeftRadius: 9, borderBottomRightRadius: 9 },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <EnvelopeIcon size={hp(5)} color={colors} />
                <Text style={styles.contextName}>{t("mail_us")}</Text>
              </View>
              <TouchableOpacity
                style={styles.callContainer}
                onPress={connectionToMail}
              >
                <Text style={styles.callText}>{t("email")}</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.profileScreenDetailsContainer,
                { borderRadius: 9, marginVertical: wp(3) },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <LanguageIcon size={hp(5)} color={colors} />
                  <View>
                    <Text style={styles.languageSelect}>{t("language")}</Text>
                    <Text style={styles.language}>{yourLanguage}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callContainer}
                onPress={() => setModalVisible(show)}
              >
                <Text style={styles.callText}>{t("change")}</Text>
              </TouchableOpacity>
            </View>
            <LanguageModal visible={modalVisible} />

            <TouchableOpacity
              style={styles.logoutContainer}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>{t("logout")}</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.floatNavigationContainer}>
            <FloatingNavigationButton />
          </View>
        </View>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:backgrounds,
  },
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
  floatNavigationContainer: {
    position: "absolute",
    bottom: hp(3),
    right: wp(5),
  },
  languageModalContainer: {
    width: wp(80),
    backgroundColor:colors,
    elevation: 4,
    borderRadius: wp(3),
    borderColor:backgrounds,
    borderWidth:wp(0.5)
  },

  languageText: {
    fontSize: hp(2.5),
    color: "white",
    borderBottomWidth: 0.2,
    borderColor: "white",
    fontFamily: "QuicksandSemiBold",
  },

  languageContainer: {
    alignItems: "center",
    padding: hp(2),
    borderRadius: 4,
    borderTopColor:backgrounds,
    borderTopWidth:wp(0.1)
  },

  iconX: {
    position: "absolute",
    right: -10,
    top: -10,
  },

  headerContainer: {
    paddingHorizontal: "5%",
    flexDirection: "row",
    backgroundColor: colors,
    justifyContent: "space-between",
    alignItems: "center",
    height: hp(22),
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
  },

  avatarImage: {
    height: hp(10),
    width: hp(10),
    borderRadius: 100,
  },

  companyName: {
    fontSize: hp(2.5),
    color: "white",
    fontFamily: "QuicksandSemiBold",
    marginLeft: "6%",
  },

  phoneNumber: {
    color: "white",
    fontSize: hp(2),
    fontFamily: "QuicksandSemiBold",
  },
  businessContainer: {
    marginLeft: "3%",
    marginTop: "5%",
    // backgroundColor: "#4870F4",
    // width: wp(50),
    paddingVertical: wp(2),
    borderRadius: 999,
  },

  profileImageContainer: {
    elevation: 30,
    borderRadius: 999,
  },
  business: {
    // textAlign: "center",
    paddingHorizontal: wp(3),
    // fontWeight: "600",
    fontFamily: "QuicksandSemiBold",
    fontSize: wp(4),
    color: "#EF5A6F",
  },
  detailsContainer: {
    Width: "90%",
    marginTop: "5%",
    elevation: 7,
  },
  profileScreenDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "5%",
    padding: "4%",
    backgroundColor: "white",
    elevation: 2,
  },
  contextName: {
    fontSize: hp(1.8),
    marginLeft: hp(1),
    fontFamily: "QuicksandSemiBold",
    color: "#5D5D5D",
  },
  languageSelect: {
    fontSize: hp(1.8),
    marginLeft: hp(1),
    fontFamily: "QuicksandSemiBold",
    color: "#adadad",
  },
  language: {
    fontSize: hp(2.5),
    marginLeft: hp(1),
    fontFamily: "QuicksandSemiBold",
    color: "#5D5D5D",
  },

  callContainer: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    marginRight: wp(2),
    backgroundColor: colors,
    borderRadius: wp(1),
  },
  callText: {
    fontSize: wp(3.5),
    color: "white",
    fontFamily: "QuicksandSemiBold",
  },
  helpDeskContainer: {
    width: wp(100),
    padding: "2%",
    marginLeft: "3%",
    marginTop: "5%",
    // backgroundColor: "#4870F4",
    borderRadius: 999,
  },
  helpDeskText: {
    // textAlign: "center",
    // fontWeight: "700",
    fontFamily: "QuicksandSemiBold",
    fontSize: wp(4),
    color: colors,
  },

  logoutContainer: {
    width: wp(90),
    marginLeft: wp(5),
    marginVertical: hp(3),
    backgroundColor: colors,
    padding: wp(2),
    borderRadius: 999,
  },
  logoutText: {
    textAlign: "center",
    fontSize: wp(4.5),
    color: "white",
    // fontWeight: "bold",
    fontFamily: "QuicksandBold",
  },
  whatsapp: {
    width: hp(5),
    height: hp(5),
  },
});
