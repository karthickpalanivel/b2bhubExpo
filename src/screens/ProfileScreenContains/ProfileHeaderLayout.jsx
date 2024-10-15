import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

const colors = "#EF5A6F";

const ProfileHeaderLayout = ({ header }) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={goBack}>
        <Entypo
          name="chevron-thin-left"
          size={hp(3)}
          color={"#fff"}
        />
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
    backgroundColor: colors,
    elevation: 3,
  },
  header: {
    fontSize: wp(5),
    marginLeft: wp(3),
    color: "white",
    fontFamily: "QuicksandSemiBold",
  },
});
