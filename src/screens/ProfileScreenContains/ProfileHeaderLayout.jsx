import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ProfileHeaderLayout = ({ header }) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={goBack}>
        <ArrowLeftIcon size={hp(3)} strokeWidth={2} color={"#fff"} />
      </TouchableOpacity>
      <Text style={styles.header}>{header}</Text>
    </View>
  );
};

export default ProfileHeaderLayout;

const styles = StyleSheet.create({
  headerContainer: {
    height: hp(10),
    width: wp(100),
    flexDirection: "row",
    alignItems: "center",
    paddingTop: hp(3),
    paddingLeft: hp(3),
    backgroundColor: "#4870F4",
    elevation: 3,
  },
  header: {
    fontSize: wp(5),
    marginLeft: wp(3),
    color: "white",
    fontFamily: "QuicksandSemiBold",
  },
});
