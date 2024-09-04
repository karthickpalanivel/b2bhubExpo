import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
  BanknotesIcon
} from "react-native-heroicons/solid";

const PaymentShippingScreen = () => {
  return (
    <View>
      <ProfileHeaderLayout header={"Business Details"} />

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
          <View>
            <ChevronRightIcon color="black" size={wp(10)} />
          </View>
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
          <View>
            <ChevronRightIcon color="black" size={wp(10)} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.businessDetailsContainer}>
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
        </TouchableOpacity>
      </View>

      <View style={styles.businessContainer}>
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
      </View>
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
});
