import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Entypo from "react-native-vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import AppLoaderAnimation from "../loaders/AppLoaderAnimation";
import { MapPinIcon } from "react-native-heroicons/solid";

const ProductCard = ({ props, index }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  let isEven = index % 2 === 0;
  const [isLoading, setIsLoading] = useState(true);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Quicksand: require("../../assets/fonts/Quicksand Regular.ttf"),
        QuicksandBold: require("../../assets/fonts/Quicksand Bold.ttf"),
        QuicksandSemiBold: require("../../assets/fonts/Quicksand SemiBold.ttf"),
        QuicksandLight: require("../../assets/fonts/Quicksand Light.ttf"),
      });
      setIsLoading(false);
    }

    loadFonts();
  }, []);

  const onMoreDetails = (id) => {
    console.log("=============================");
    console.log(id);
    navigation.navigate("ProductDetails", { productId: id });
    console.log("=============================");
  };

  const translatedName = (name) => {
    let changeProductName = name.replaceAll(" ", "_").toLowerCase();
    return `'${changeProductName}'`;
  };
  const productName = translatedName(props.name);
  const memberShipBackgroundColor = () => {
    if (props.category == "PLATINUM") return "#DD7522";
    else if (props.category == "GOLD") return "#A10E38"; //#DD7522
    else return "#fff";
  };

  const premiumColor = () => {
    if (props.category == "PLATINUM") return "#e5e4e2"; //#FFD700
    else if (props.category == "GOLD") return "#FFD700"; //Platnium
    else return "#000000";
  };

  const productCategoryName = () => {
    if (props.category == "PLATINUM") return t("platinum");
    else if (props.category == "GOLD") return t("gold");
  };
  const color = premiumColor();
  const backgroundColor = memberShipBackgroundColor();
  const gradeAUnit = props.costPerUnit[0];
  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <Animated.View
          entering={FadeInDown.delay(index + 200)
            .duration(1500)
            .springify()
            .damping(12)}
        >
          <Pressable
            style={{
              paddingLeft: isEven ? 0 : 10,
              paddingRight: isEven ? 10 : 0,
              marginVertical: "10%",
              backgroundColor: "white",
              borderWidth: 0.1,
              borderColor: "#111",
            }}
            onPress={() => onMoreDetails(props.productId)}
          >
            <Image
              source={{ uri: props.CommonImage }}
              style={{
                width: "100%",
                height: hp(20),
                borderRadius: 30,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.productName}>
                {props.name.length > 15
                  ? props.name.slice(0, 14) + "..."
                  : props.name}
              </Text>
              <View>
                <Text style={styles.offerPrice}>
                  ₹{gradeAUnit.PricePerUnit.toFixed(2)} {t("kg")}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MapPinIcon
                size={wp(5)}
                color={"black"}
                style={{ marginLeft: "4%" }}
              />
              <Text style={styles.locationText}>{props.location}</Text>
            </View>
            {props.category && (
              <View
                style={[
                  styles.membershipContainer,
                  { backgroundColor: backgroundColor },
                ]}
              >
                <Entypo name="price-ribbon" size={24} color={color} />
                <View>
                  <Text style={styles.memberShipText}>
                    {
                      /* {props.category.charAt(0).toUpperCase() +
                      props.category.slice(1).toLowerCase()} */
                      productCategoryName()
                    }
                  </Text>
                  {/* <Text style={styles.memberShipText}>Product</Text> */}
                </View>
              </View>
            )}
          </Pressable>
        </Animated.View>
      )}
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productName: {
    fontSize: hp(2.1),
    // fontWeight: "500",
    marginLeft: "4%",
    marginTop: "2%",
    fontFamily: "QuicksandSemiBold",
  },

  offerPrice: {
    marginLeft: "5%",
    fontSize: 15,
    color: "black",
    fontFamily: "QuicksandSemiBold",
  },

  mrpPrice: {
    color: "grey",
    opacity: 0.5,
    marginLeft: "6%",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },

  membershipContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: wp(1),
    width: "60%",
    borderRadius: wp(10),
    position: "absolute",
    // bottom : '20%',
  },

  locationText: {
    marginLeft: wp(2),
    fontSize: hp(1.8),
    fontFamily: "QuicksandSemiBold",
  },

  memberShipText: {
    fontSize: hp(1.7),
    fontFamily: "QuicksandSemiBold",
    color: "white",
  },
});
