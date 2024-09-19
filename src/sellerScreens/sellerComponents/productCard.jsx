import { StyleSheet, Text, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";

const ProductCard = ({
  image,
  name,
  price,
  unit,
  moisture,
  Organic,
  shelfLife,
  validity,
  desc,
  quality,
}) => {
  const [isLoading, setIsLoading] = useState(true);
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
  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" backgroundColor="#fff" />

      <View style={styles.container}>
        {/* Product Image */}
        <View>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{name}</Text>
          <View style={styles.rowValue}>
            <Text style={styles.label}>Price: </Text>
            <Text style={styles.value}>{price}/</Text>
            <Text style={styles.value}>{unit}</Text>
          </View>
          <Text style={styles.label}>
            Moisture: <Text style={styles.value}>{moisture}</Text>
          </Text>
          <Text style={styles.label}>
            Organic: <Text style={styles.value}>{Organic ? "Yes" : "No"}</Text>
          </Text>
          <Text style={styles.label}>
            Shelf Life: <Text style={styles.value}>{shelfLife}</Text>
          </Text>
          <Text style={styles.label}>
            Validity: <Text style={styles.value}>{validity}</Text>
          </Text>
          <Text style={styles.label}>
           <Text style={styles.value}>{desc}</Text>
          </Text>
          <Text style={styles.label}>
            Quantity: <Text style={styles.value}>{quality}</Text>
          </Text>

          {/* Edit and Delete Buttons */}
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: hp(1),
    marginHorizontal: wp(3),
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#729EDB", // Green background for the card
    borderRadius: wp(4),
    padding: wp(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: wp(35),
    height: hp(20),
    borderRadius: wp(3),
    marginTop: wp(7),
  },
  detailsContainer: {
    flex: 1,
    marginLeft: wp(3),
    justifyContent: "space-between",
  },
  productName: {
    fontSize: wp(5),
    // fontWeight: "bold",
    color: "white",
    marginBottom: wp(1),
    fontFamily: "QuicksandSemiBold",
  },
  label: {
    fontSize: wp(3.5),
    // fontWeight: "600",
    color: "white",
    marginVertical: hp(0.3),
    fontFamily: "QuicksandSemiBold",
  },
  value: {
    fontSize: wp(3.5),
    fontFamily: "QuicksandSemiBold",
    color: "white",
  },
  rowValue: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  editButton: {
    backgroundColor: "#2196F3",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    marginRight: wp(2),
  },
  deleteButton: {
    backgroundColor: "#4574B3",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
  buttonText: {
    fontSize: wp(4),
    color: "white",
    // fontWeight: 'bold',
    fontFamily: "QuicksandSemiBold",
    textAlign: "center",
  },
});
