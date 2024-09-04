import {
  Image,
  Pressable,
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

export const DetailsBar = ({ topic, value, setValue, screen }) => {
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
      <View style={styles.valueContainer}>
        <Text>{topic}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <TouchableOpacity style={styles.editContainer} onPress={showModal}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

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
                  color="black"
                  style={styles.icon}
                  onPress={hide}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                onChangeText={setValue}
                placeholder={"New " + topic}
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
  const [userName, setUserName] = useState("John Wick");
  const [phone, setPhone] = useState("9856743102");
  const [email, setEmail] = useState("vtsretailer@vts.com");
  const [city, setCity] = useState("Chennai");
  const [password, setPassword] = useState("*********");
  return (
    <View>
      <ProfileHeaderLayout header="Accounts" />
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
              topic={"Name"}
              value={userName}
              setValue={setUserName}
              screen="EditScreen"
            />
            <DetailsBar
              topic={"Phone"}
              value={phone}
              setValue={setPhone}
              screen="EditScreen"
            />
            <DetailsBar
              topic={"Email"}
              value={email}
              setValue={setEmail}
              screen="EditScreen"
            />
            <DetailsBar
              topic={"City"}
              value={city}
              setValue={setCity}
              screen="EditScreen"
            />
            <DetailsBar
              topic={"Password"}
              value={password}
              setValue={setPassword}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: "white",
  },
  detailBarContainer: {
    padding: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editText: {
    fontSize: hp(2.5),
  },
  value: {
    fontSize: hp(2.2),
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
    backgroundColor: "white",
    paddingLeft: wp(5),
  },

  textInput: {
    marginTop: hp(5),
    borderWidth: 0.2,
    padding: wp(2),
    borderRadius: wp(1),
  },

  conformContainer: {
    marginTop: hp(2),
    marginLeft: wp(1),
    width: wp(20),
    backgroundColor: "#4870F4",
    padding: wp(3),
    borderRadius: 10,
  },
  conformText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    right: 0,
  },
});
