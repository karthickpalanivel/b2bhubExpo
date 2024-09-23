import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
import { XCircleIcon } from "react-native-heroicons/outline";

const ProductCard = ({ props, index }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  let isEven = index % 2 === 0;
  const [isLoading, setIsLoading] = useState(true);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    imageSource: "",
    category: "",
    costPerUnit: "",
    description: {},
    location: "",
    offerDuration: "",
    offerStartDate: "",
    offerStartTime: "",
  });
  // const [timeRemaining, setTimeRemaining] = useState(
  //   formatTimeRemaining()
  // );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    setProductDetails({
      name: props.name,
      imageSource: props.CommonImage,
      category: props.category,
      costPerUnit: props.costPerUnit,
      description: props.description,
      location: props.location,
      offerDuration: props.offerDuration,
      offerStartDate: props.offerStartDate,
      offerStartTime: props.offerStartTime,
    });
  }, [props.productId]);
  const handleContinue = () => {
    onGradeSelect(id, selectedGrade);
    setShowSummary(true);
  };
  const show = () => {
    setProductDetailsModal(true);
  };
  const hide = () => {
    setProductDetailsModal(false);
  };

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);

    if (isNaN(end.getTime())) return "Invalid date";

    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };
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

  const onMoreDetails = (productDetailsInArray) => {
    console.log(productDetailsInArray);
    // console.log(id);
    navigation.navigate("ProductDetails", { productDetailsInArray });
    // console.log("=============================");
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

  const ProductModal = ({ visible }) => {
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <View style={styles.bottomModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {!showSummary ? (
            <>
              <Text style={styles.modalTitle}>
                {props.name} - ₹ {props.costPerUnit}
              </Text>
              {/* <Text style={styles.offerEndText}>
                Offer ends in: {timeRemaining}
              </Text> */}
              <View style={styles.priceContainer}>
                {/* <Text style={styles.originalPrice}>
                  Original: ₹ {props.price}
                </Text> */}
                <Text style={styles.modalOfferPrice}>
                  ₹ {props.costPerUnit}
                </Text>
              </View>

              {/* <Picker
                  selectedValue={selectedGrade}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedGrade(itemValue)}
                >
                  <Picker.Item label="Select Grade" value="" />
                  {grades.map((grade, index) => (
                    <Picker.Item key={index} label={grade} value={grade} />
                  ))}
                </Picker> */}

              <TextInput
                style={styles.input}
                placeholder="Quantity in Tons"
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={(text) => setQuantity(Number(text))}
              />

              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Order Summary</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Total Price</Text>
                  <Text style={styles.tableCell}>₹ {totalPrice}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>GST (18%)</Text>
                  <Text style={styles.tableCell}>Rs {gst}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Total Amount</Text>
                  <Text style={styles.tableCell}>₹ {totalAmount}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={handlePayment}
              >
                <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>;
  };

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
            onPress={() => {
              const productArray = [
                props.productId,

                props.CommonImage,

                props.name,

                gradeAUnit.PricePerUnit.toFixed(2),

                props.location,

                props?.description.moisture,

                props?.description.QualityAvailable,

                props?.description.IsOrganic,

                props?.description.Speciality,

                props.category,
              ];

              onMoreDetails(productArray);

              // Object.entries(productArray).forEach(([key, value]) => {
              //   console.log(key + " : " + value + " ");
              // });
              // modalVisible = true;
            }}
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
                  ₹ {gradeAUnit.PricePerUnit.toFixed(2)}
                </Text>
                <Text style={styles.offerPrice}>{t("kg")}</Text>
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

      <ProductModal visible={productDetailsModal} />
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
    textAlign: "right",
    marginRight: wp(3),
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

  // Modal styles

  modalBackground: {
    flex: 1,
    justifyContent: "flex-end", // Align modal at the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  bottomModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: wp("5%"),
    borderTopRightRadius: wp("5%"),
    padding: wp("5%"),
    width: "100%",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  offerEndText: {
    fontSize: wp("4%"),
    color: "red",
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1%"),
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  modalOfferPrice: {
    color: "#D83A56",
    fontWeight: "bold",
  },
  picker: {
    height: hp("7%"),
    width: "100%",
    marginBottom: hp("2%"),
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: wp("2%"),
    padding: wp("3%"),
    marginBottom: hp("2%"),
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    padding: wp("3%"),
    borderRadius: wp("2%"),
  },
  continueButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  table: {
    marginVertical: hp("2%"),
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1%"),
  },
  tableCell: {
    fontSize: wp("4%"),
  },
  paymentButton: {
    backgroundColor: "#FF5733",
    padding: wp("3%"),
    borderRadius: wp("2%"),
  },
  paymentButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
