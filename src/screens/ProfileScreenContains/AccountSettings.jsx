import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Modal } from "react-native";
import React, { useState } from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { XCircleIcon } from "react-native-heroicons/outline";

import { StatusBar } from "expo-status-bar";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";
import { CompanyData } from "../../data/CompanyData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DetailsBar = ({ topic, value, setValue, screen, edit }) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const changeValue = () => {
    hide();
  };

  const showModal = () => {
    hide();
    show();
  };


  


  return (
    <View style={styles.detailBarContainer}>
      <StatusBar style="light" backgroundColor="#4870F4" />
      <View>
        <Text style={{ color: "white", fontFamily: "QuicksandSemiBold", }}>{topic}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {edit && (
        <TouchableOpacity onPress={showModal}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={visible}
        animationType="slide"
        animationDuration={1000}
        onRequestClose={hide}
        transparent
      >
        <SafeAreaView style={styles.fill}>
          <View style={styles.inputContainer}>
            <View>
              <TouchableOpacity>
                <XCircleIcon
                  size={wp(8)}
                  color="white"
                  style={styles.icon}
                  onPress={hide}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                onChangeText={setValue}
                placeholder={"New " + topic}
                placeholderTextColor={"#4870F4"}
              />
            </View>
            <TouchableOpacity
              onPress={changeValue}
              style={styles.conformContainer}
            >
              <Text style={styles.conformText}>confirm</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const AccountSettings = () => {
  // const [userName, setUserName] = useState("John Wick");
  const [phone, setPhone] = useState(CompanyData.phone);
  const [email, setEmail] = useState(CompanyData.email);
  // const [city, setCity] = useState("Chennai");
  const [gstNumber, setGstNumber] = useState(CompanyData.gstNumber);
  const [companyName, setCompanyName] = useState(CompanyData.companyName);
  const [panNumber, setPanNumber] = useState(CompanyData.panNumber);
  const [isLoading, setIsLoading] = useState(false);

  const address = `${CompanyData.address1}, \n${CompanyData.address2}, \n${CompanyData.city} - ${CompanyData.pincode}, \n${CompanyData.state}`;
  const [userAddress, setUserAddress] = useState(address);

  AsyncStorage.getItem("companyname")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        setCompanyName(value);
      } else {
        // No value found
        console.log("No company name found");
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
        console.log("No phone found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });

    AsyncStorage.getItem("email")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        setEmail(value);
      } else {
        // No value found
        console.log("No email found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });

    AsyncStorage.getItem("gst")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        setGstNumber(value);
      } else {
        // No value found
        console.log("No gst found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });

    AsyncStorage.getItem("pan")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        setPanNumber(value);
      } else {
        // No value found
        console.log("No pan found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View>
          <ProfileHeaderLayout header="Accounts" 
          />
          <ScrollView>
            <View
              style={{
                alignItems: "center",
                marginTop: hp(5),
              }}
            >
              <View style={styles.profileImageContainer}>
                <Image
                  source={require("../../assets/profileImage.png")}
                  style={styles.avatarImage}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={styles.detailsBar}>
                <DetailsBar
                  topic={"Company Name"}
                  value={companyName}
                  edit={false}
                />
                <DetailsBar
                  topic={"Phone"}
                  value={phone}
                  edit={false}
                />
                <DetailsBar
                  topic={"Email"}
                  value={email}
                  edit={false}
                />

                <DetailsBar
                  topic={"GST Number"}
                  value={gstNumber}

                  edit={false}
                />
                <DetailsBar
                  topic={"Pan Number"}
                  value={panNumber}
                  edit={false}
                />

                {/* <DetailsBar
                  topic={"Address"}
                  value={userAddress}
                  setValue={setUserAddress}
                  edit={false}
                /> */}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "FCFCFC",
  },
  profileImageContainer: {
    backgroundColor: "F9F9F9",
    elevation: 20,
  },
  avatarImage: {
    height: hp(20),
    width: hp(20),
    elevation: 10,
    borderRadius: 999,
  },

  detailsBar: {
    marginTop: hp(5),
    borderRadius: 9,
    borderBottomWidth: 0.3,
    borderBottomColor: 0.1,
    width: "90%",
    backgroundColor: "#4870F4",
  },
  detailBarContainer: {
    padding: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editText: {
    fontSize: hp(2.5),
    color: "white",
    fontFamily: "QuicksandSemiBold",
  },
  value: {
    fontSize: hp(2.2),
    color: "white",
    fontFamily: "QuicksandSemiBold",
  },
  fill: {
    position: "absolute",
    bottom: hp(10),
    alignItems: "center",
    width: wp(90),
    height: hp(20),
  },
  upper: {
    height: hp(25),
    backgroundColor: "white",
  },
  lower: {
    flex: 1,
    height: hp(25),
  },

  inputContainer: {
    marginLeft: wp(10),
    borderWidth: 0.3,
    elevation: 3,
    borderRadius: wp(1),
    width: wp(90),
    padding: wp(4),
    backgroundColor: "#4870F4",
    paddingLeft: wp(5),
  },

  textInput: {
    marginTop: hp(5),
    borderWidth: 0.2,
    padding: wp(2),
    borderRadius: wp(1),
    backgroundColor: "white",
  },

  conformContainer: {
    marginTop: hp(2),
    marginLeft: wp(1),
    width: wp(20),
    backgroundColor: "white",
    padding: wp(3),
    borderRadius: 10,
  },
  conformText: {
    color: "#4870F4",
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    right: 0,
  },
});
