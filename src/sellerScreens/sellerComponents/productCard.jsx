import { StyleSheet, Text, View, Image, Modal } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { useTranslation } from "react-i18next";

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
  quantity,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = () => {
    Alert.alert("Deleted Successfully");
    setDeleteModal(false);
  };
  const handleCancel = () => {
    setDeleteModal(false);
  };
  const handleDeleteBtn = () => {
    console.log(deleteModal);
    setDeleteModal(true);
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

  const { t } = useTranslation();
  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" backgroundColor="#fff" />

      <View style={styles.container}>
        {/* Product Image */}
        <View>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.buttonText}>{t("edit")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteBtn()}
            >
              <Text style={styles.buttonText}>{t("delete")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {deleteModal ? (
          <>
            <Modal transparent={true} animationType="fade">
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.successTitle}>{t('delete_product')}</Text>
                  <Text style={styles.message}>
                    Do you want to delete the Product?
                  </Text>

                  <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={handleDelete}>
                      <Text style={styles.btnText}>{t('yes')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={handleCancel}
                    >
                      <Text style={styles.cancelBtnText}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        ) : null}

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{name}</Text>
          <View style={styles.rowValue}>
            <Text style={styles.label}>{t("price")}: </Text>
            <Text style={styles.value}>{price}/</Text>
            <Text style={styles.value}>{unit}</Text>
          </View>
          <Text style={styles.label}>
            {t("moisture")}: <Text style={styles.value}>{moisture}</Text>
          </Text>
          <Text style={styles.label}>
            {t("organic")}:{" "}
            <Text style={styles.value}>{Organic ? "Yes" : "No"}</Text>
          </Text>
          <Text style={styles.label}>
            {t("shelf_life")}: <Text style={styles.value}>{shelfLife}</Text>
          </Text>
          <Text style={styles.label}>
            {t("validity")}: <Text style={styles.value}>{validity}</Text>
          </Text>
          <Text style={styles.label}>
            <Text style={styles.value}>{desc}</Text>
          </Text>
          <Text style={styles.label}>
            {t("quantity")}: <Text style={styles.value}>{quantity}</Text>
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
    backgroundColor: "#729EDB",
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
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

  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  btn: {
    flex: 1,
    margin: 5,
    backgroundColor: "#007bff",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelBtn: {
    flex: 1,
    margin: 5,
    backgroundColor: "#ccc",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  cancelBtnText: {
    color: "#333",
  },
});
