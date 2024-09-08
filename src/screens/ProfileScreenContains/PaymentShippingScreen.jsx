import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";

import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
//icons
import {
  InformationCircleIcon,
  //   BuildingOfficeIcon,
  ChevronRightIcon,
  //   MapPinIcon,
  //   DocumentIcon,
  WalletIcon,
} from "react-native-heroicons/outline";

import {
  MapPinIcon,
  DocumentIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
} from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";





const PaymentShippingScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
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
    <View>
      <StatusBar style="auto" backgroundColor="#4870F4" />
      <ProfileHeaderLayout header={"Business Details"} />

      <View style={styles.detailBarContainer}>
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
                  placeholder={"Edit"}
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

      <View style={styles.businessContainer}>
        <InformationCircleIcon size={wp(10)} color={"white"} />
        <Text style={styles.business}>Business info</Text>
      </View>

      <View style={{ marginTop: "5%" }}>
        <TouchableOpacity style={styles.businessDetailsContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BuildingOfficeIcon
              color="#4870F4"
              size={wp(10)}
              style={{ marginLeft: wp(3), marginTop: wp(3) }}
            />
            <View style={styles.businessName}>
              <Text style={styles.text}>Name</Text>
              <Text style={{ color: "#7F7F7F" }}>VTS Retailers</Text>
            </View>
          </View>
          <TouchableOpacity onPress={show}>
            <View style={styles.editContainer}>
              <Text style={styles.editText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.businessDetailsContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <DocumentIcon
              color="#4870F4"
              size={wp(10)}
              style={{ marginLeft: wp(3), marginTop: wp(3) }}
            />
            <View style={styles.businessName}>
              <Text style={styles.text}>GST Number</Text>
              <Text style={{ color: "#7F7F7F" }}>29GGGGG1314R9Z6</Text>
            </View>
          </View>
          <TouchableOpacity>
            <View style={styles.editContainer}>
              <Text style={styles.editText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.businessDetailsContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MapPinIcon
              color="#4870F4"
              size={wp(10)}
              style={{ marginLeft: wp(3), marginTop: wp(3) }}
            />
            <View style={styles.businessName}>
              <Text style={styles.text}>Shipping Address</Text>
              <Text style={{ color: "#7F7F7F" }}>
                123, Down st, newYork nagaram, Chennai
              </Text>
            </View>
          </View>
          <View>
            <ChevronRightIcon color="black" size={wp(10)} />
          </View>
        </TouchableOpacity> */}
      </View>

      {/* <View style={styles.businessContainer}>
        <WalletIcon size={wp(10)} color={"white"} />
        <Text style={styles.business}>Payment Details</Text>
      </View>

      <View style={{ marginTop: "5%" }}>
        <TouchableOpacity style={styles.businessDetailsContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BanknotesIcon
              color="#4870F4"
              size={wp(10)}
              style={{ marginLeft: wp(3), marginTop: wp(3) }}
            />
            <View style={styles.businessName}>
              <Text style={styles.text}>Manage bank details</Text>
              <Text style={{ color: "#7F7F7F" }}>
                Cards, netbanking, UPI payments
              </Text>
            </View>
          </View>
          <View>
            <ChevronRightIcon color="black" size={wp(10)} />
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default PaymentShippingScreen;

const styles = StyleSheet.create({
  businessContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    padding: "2%",
    marginLeft: "3%",
    marginTop: "5%",
    backgroundColor: "#4870F4",
    borderRadius: 999,
  },

  business: {
    marginLeft: wp(3),
    textAlign: "center",
    fontWeight: "600",
    fontSize: wp(4),
    color: "white",
  },

  businessDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(3),
    height: hp(10),
    backgroundColor: "#fff",
  },
  text: {
    fontSize: wp(4),
    marginVertical: wp(2),
  },
  businessName: {
    justifyContent: "space-around",
    marginLeft: wp(3),
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
  fill: {
    position: "absolute",
    bottom: hp(10),
    alignItems: "center",
    width: wp(90),
    height: hp(20),
  },
});
