import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const SearchBarComponent = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setResultSearch] = useState([]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity style={styles.icon}>
        <ChevronLeftIcon
          size={hp(4.4)}
          strokeWidth={wp(0.4)}
          color={"grey"}
          onPress={goBack}
        />
      </TouchableOpacity>
      <TextInput
        style={[styles.textInput, styles.boxShadow, styles.androidShadow]}
        placeholderTextColor="black"
        placeholder="Search"
      />
      <Image
        source={require("../../assets/search-vector.png")}
        style={styles.lens}
      />
    </View>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
  textInput: {
    width: "90%",
    paddingLeft: wp(15),
    paddingVertical: hp(2),
    borderRadius: wp(1),
    backgroundColor: "white",
    opacity: 1,

    color: "black",
    // fontFamily: 'Quicksand Light',
    fontSize: wp(3.5),
    borderWidth: wp(0.1),
  },
  icon: {
    position: "absolute",
    top: hp(1.5),
    left: wp(8),
    zIndex: 200,
  },
  boxShadow: {
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0.2,
  },
  androidShadow: {
    elevation: 5,
  },
  lens: {
    width: hp(4.5),
    height: hp(4.5),
    resizeMode: "contain",
    position: "absolute",
    right: wp(9),
    top: wp(2.5),
    zIndex: 100,
  },
});
