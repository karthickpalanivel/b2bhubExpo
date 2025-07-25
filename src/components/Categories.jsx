import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

// Data import
import { categoriesData } from "../data/Categories";
import { categoryByProduct } from "../data/Categories";
import * as Font from "expo-font";
import AppLoaderAnimation from "./loaders/AppLoaderAnimation";
export default function Categories({ activeCategory, setActiveCategory }) {
  const [isLoading, setIsLoading] = useState(true);
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
  const { t } = useTranslation();

  const categoryNameDal = (name) => {
    if (name == "Moong Dal") return t("moong_dal");
    else if (name == "Tur Dal") return t("toor_dal");
    else if (name == "Urad Dal") return t("urad_dal");
    else if (name == "Gram Dal") return t("gram_dal");
  };

  const translatedProductName = () => {
    if (productDetails.productName == "ToorDal") return t("toor_dal");
    if (productDetails.productName == "MoongDal") return t("moong_dal");
    if (productDetails.productName == "UradDal") return t("urad_dal");
    if (productDetails.productName == "GramDal") return t("gram_dal");
  };
  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <Animated.View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollConatiner}
          >
            {categoriesData?.map((category, index) => {

              const name = category.name
              return (
                <Pressable
                  key={index}
                  style={styles.category}
                  // onPress={() => setActiveCategory(category.name)}
                >
                  <View style={styles.categoryView}>
                    <Image
                      source={{ uri: category.imageUrl }}
                      style={styles.imageCard}
                    />
                    {/* <Images uri={category.name}
                  style={styles.imagesComp}
                /> */}
                    <Text style={styles.categoryName}>
                    {categoryNameDal(category.name)}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
            {categoryByProduct?.map((product, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.category}
                  onPress={() => setActiveCategory(product.name)}
                >
                  <View style={styles.categoryView}>
                    <Text style={styles.categoryName}>
                      {categoryNameDal(product.name)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollConatiner: {
    paddingVertical: 16,
    paddingLeft: 10,
    overflow: "scroll",
  },

  category: {
    marginHorizontal: wp(2),
    alignItems: "center",
    justifyContent: "center",
    width: wp(20),
  },

  imagesComp: {
    width: hp(6),
    height: hp(6),
    borderRadius: 9999,
  },

  categoryView: {},

  imageCard: {
    width: hp(8),
    height: hp(8),
    borderRadius: 9999,
  },
  categoryName: {
    fontSize: 15,
    color: "rgba(0,0,0,0.7)",
    fontFamily: "QuicksandBold",

    textAlign: "center",
  },
});
