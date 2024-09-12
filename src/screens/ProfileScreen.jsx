import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CompanyData } from "../data/CompanyData";

import {
  BuildingOffice2Icon,
  CogIcon,
  GiftIcon,
  TruckIcon,
  
  ArrowLeftIcon,
} from "react-native-heroicons/outline";

import {
  IdentificationIcon,
  EnvelopeIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import AppLoaderAnimation from "../components/loaders/AppLoaderAnimation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [companyName, setCompanyName] = useState("Your Company");
  const [phone, setPhone] = useState("999999999999");

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    navigation.navigate("Login");
    // console.log("Logout button clicked");
  };

  AsyncStorage.getItem("companyname")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        setCompanyName(value);
      } else {
        // No value found
        console.log("No value found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });

  AsyncStorage.getItem("phone")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        setPhone(value);
      } else {
        // No value found
        console.log("No value found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });

  const goback = () => {
    navigation.goBack();
  };

  const connectionToWhatsapp = () => {
    // console.log("whatsapp");
  };

  // logic from backend need to be applied

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View style={styles.container}>
          <StatusBar style="light" backgroundColor="#4870F4" />
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
              <Text style={styles.business}>Manage your Business</Text>
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
                  <IdentificationIcon color={"#4870F4"} size={hp(5)} />
                  <Text style={styles.contextName}>Accounts </Text>
                </View>
                <ChevronRightIcon
                  color={"#4870F4"}
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
                  <TruckIcon color={"#4870F4"} size={hp(5)} />
                  <Text style={styles.contextName}>Deliveries & Orders</Text>
                </View>
                <ChevronRightIcon
                  color={"#4870F4"}
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
              <Text style={styles.helpDeskText}>Need Help</Text>
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
                <Text style={styles.contextName}>Reach Us</Text>
              </View>
              <TouchableOpacity
                style={styles.callContainer}
                onPress={connectionToWhatsapp}
              >
                <Text style={styles.callText}>Chat</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.profileScreenDetailsContainer,
                { borderBottomLeftRadius: 9, borderBottomRightRadius: 9 },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <EnvelopeIcon size={hp(5)} color={"#4870F4"} />
                <Text style={styles.contextName}>support@b2bhubindia.com</Text>
              </View>
              <TouchableOpacity
                style={styles.callContainer}
                onPress={connectionToWhatsapp}
              >
                <Text style={styles.callText}>Mail</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.logoutContainer}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },

  headerContainer: {
    paddingHorizontal: "5%",
    flexDirection: "row",
    backgroundColor: "#4870F4",
    justifyContent: "space-between",
    alignItems: "center",
    height: hp(20),
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
    width: "50%",
    padding: "2%",
    marginLeft: "3%",
    marginTop: "5%",
    backgroundColor: "#4870F4",
    borderRadius: 999,
  },

  profileImageContainer: {
    elevation: 30,
    borderRadius: 999,
  },
  business: {
    textAlign: "center",
    // fontWeight: "600",
    fontFamily: "QuicksandSemiBold",
    fontSize: wp(4),
    color: "white",

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

  callContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(1),
    marginRight: wp(2),
    backgroundColor: "#4870F4",
    borderRadius: wp(1),
  },
  callText: {
    fontSize: wp(4),
    color: "white",
    fontFamily: "QuicksandSemiBold",
  },
  helpDeskContainer: {
    width: wp(25),
    padding: "2%",
    marginLeft: "3%",
    marginTop: "5%",
    backgroundColor: "#4870F4",
    borderRadius: 999,
  },
  helpDeskText: {
    textAlign: "center",
    // fontWeight: "700",
    fontFamily: "QuicksandSemiBold",
    fontSize: wp(4),
    color: "white",
  },

  logoutContainer: {
    width: wp(90),
    marginLeft: wp(5),
    marginVertical: hp(5),
    backgroundColor: "#4870F4",
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
