import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Carousel, { Pagination } from "react-native-x-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";
const BannerOne = ({ someProp = "default value", anotherProp = 0 }) => {
  const [isLoading, setIsLoading] = useState(false);

  const DATA = [
    {
      id: 1,
      text: "#1",
      image: require("../../assets/banner/bannerOne.png"),
    },
    {
      id: 2,
      text: "#2",
      image: require("../../assets/banner/bannerTwo.png"),
    },
    // {
    //   id: 3,
    //   text: "#3",
    //   image: require("../../assets/banner/bannerThree.png"),
    // },
    {
      id: 4,
      text: "#4",
      image: require("../../assets/banner/bannerFour.png"),
    },
  ];

  const navigation = useNavigation();

  const productPage = () => {
    navigation.navigate("onBoardScreenOne");
  };

  const renderItem = (data) => (
    <Pressable key={data.text} style={styles.item} onPress={productPage}>
      <Image source={data.image} style={styles.item} />
    </Pressable>
  );
  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <View style={styles.container}>
          <Carousel
            renderItem={renderItem}
            data={DATA}
            autoplay
            loop
            autoplayDuration={500}
          />
        </View>
      )}
    </>
  );
};

export default BannerOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: wp(90),
    height: hp(15),
    borderRadius: wp(2),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dbf3fa",
  },
});
