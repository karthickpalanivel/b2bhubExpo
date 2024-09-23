import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  TextInput,
} from "react-native";
import { CheckIcon, CalendarIcon } from "react-native-heroicons/outline";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  CameraIcon,
  PhotoIcon,
  TrashIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import * as ImagePicker from "expo-image-picker";
import FloatingLabelInput from "./FloatingLabelInput";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";
import { useTranslation } from "react-i18next";
import pickerProductList from "../pickerProductList.json";

const ProductDetailsForm = () => {
  const [productName, setProductName] = useState("");
  const [pricing, setPricing] = useState("");
  const [units, setUnits] = useState("Select Unit");
  const [moisture, setMoisture] = useState("Select Moisture");
  const [shelfLife, setShelfLife] = useState("Select Shelf Life");
  const [validity, setValidity] = useState(new Date());
  const [description, setDescription] = useState("");
  const [packageDetails, setPackageDetails] = useState([
    { type: "Select Package Type", quantity: "" },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState(null);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const { t } = useTranslation();
  const [productType, setProductType] = useState("");
  const calculateTotalValue = () => {
    const total = packageDetails.reduce((sum, detail) => {
      if (detail.quantity && pricing) {
        const quantityInKg =
          units === "1KG"
            ? parseFloat(detail.quantity)
            : parseFloat(detail.quantity) * 1000; // Convert to KG if it's in tons
        return sum + quantityInKg * parseFloat(pricing);
      }
      return sum;
    }, 0);
    setTotalValue(total);
  };

  console.log("imageurl" + imageUrl);

  const onSubmit = () => {
    if (
      productName &&
      productType &&
      pricing &&
      units !== "Select Unit" &&
      moisture !== "Select Moisture" &&
      shelfLife !== "Select Shelf Life" &&
      validity &&
      description &&
      packageDetails.every(
        (item) => item.type !== "Select Package Type" && item.quantity
      )
    ) {
      console.log(
        productName,
        productType,
        pricing,
        units,
        moisture,
        shelfLife,
        validity,
        description,
        packageDetails,
        image
      );
      // setting a everything as blank
      setDescription("");
      setProductName("");
      setPricing("");
      setUnits("Select Unit");
      setMoisture("Select Moisture");
      setShelfLife("Select Shelf Life");
      setValidity(new Date());
      setPackageDetails([{ type: "Select Package Type", quantity: "" }]);
      setImage(null);
    } else {
      Alert.alert("Enter every field");
    }
  };
  const productTypeOptions = {
    moongdal: [
      "Polished Moong dal",
      "Imported Moong dal",
      "Desi Moong dal",
      "other",
    ],
    turdal: [
      "Fatka Toor dal",
      "Polished Toor dal",
      "Imported Toor dal",
      "Desi Toor dal",
      "other",
    ],
    uraddal: ["Black Urad dal", "Imported Urad dal", "Desi Urad dal", "other"],
    gramdal: ["Premium  Gram dal", "Gold Gram dal", "other"],
  };

  // Get the corresponding product types based on the selected product name
  const availableProductTypes = productTypeOptions[productName] || [];

  const navigation = useNavigation();
  const navigateToSellerHome = () => {
    navigation.navigate("SellerHome");
  };
  useEffect(() => {
    calculateTotalValue();
  }, [packageDetails, pricing, units]);

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

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || validity;
    setShowDatePicker(Platform.OS === "ios");
    setValidity(currentDate);
  };

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day}-${
      month < 10 ? `0${month}` : month
    }-${year}`;
  };

  const addPackageDetail = () => {
    setPackageDetails((prevDetails) => [
      ...prevDetails,
      { type: "Select Package Type", quantity: "" },
    ]);
  };

  const removePackageDetail = (index) => {
    const updatedDetails = [...packageDetails];
    updatedDetails.splice(index, 1);
    setPackageDetails(updatedDetails);
  };

  const uploadModel = () => {
    setIsUploadVisible(true);
  };

  const uploadImage = async (imageUri) => {
    const formData = new FormData();
    const fileName = imageUri.assets[0].fileName;
    const fileType = imageUri.assets[0].type;

    formData.append("file", imageUri);
    formData.append("upload_preset", "ml_default"); // Add your upload preset
    formData.append("cloud_name", "dalzs7bc2"); // Add your cloud name if necessary

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dalzs7bc2/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.secure_url) {
        setImageUrl(response.data.secure_url); // Store the image URL
        console.log("upload succesfull" + response.data.secure_url);

        Alert.alert("Upload successful", "Image has been uploaded!");
      }
    } catch (error) {
      console.error("Upload error", error);
      Alert.alert("Upload failed", "Something went wrong during the upload.");
    } finally {
      // setUploading(false);
    }
  };

  const handleImageSelection = async (mode) => {
    try {
      let result;
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        }).then(uploadImage(result));
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        }).then(uploadImage(result));
      }
      if (!result.canceled) {
        setImage(result.assets[0].uri); // Update the image state with the selected image URI
        setIsUploadVisible(false);
        uploadImage(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalQuantity = () => {
    const totalQuantity = packageDetails.reduce((sum, detail) => {
      if (detail.quantity) {
        const quantityInKg =
          units === "1ton"
            ? parseFloat(detail.quantity)
            : parseFloat(detail.quantity);
        return sum + quantityInKg;
      }
      return sum;
    }, 0);
    return totalQuantity;
  };

  return (
    <>
      {isLoading ? (
        <AppLoaderAnimation />
      ) : (
        <>
          <StatusBar backgroundColor="#fff" style="dark"></StatusBar>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={navigateToSellerHome}
              >
                <ChevronLeftIcon
                  size={wp(5)}
                  color={"black"}
                  strokeWidth={wp(1.5)}
                />
              </TouchableOpacity>
              {/* Header */}
              <Text style={styles.header}>{t("shop_slogan")}</Text>
              <Text style={styles.subHeader}>{t("discover_variety")}</Text>

              {/* Image upload section */}
              <View style={styles.imageUploadSection}>
                {isUploadVisible ? (
                  // Modal for image upload
                  <Modal
                    isVisible={isUploadVisible}
                    onBackdropPress={() => setIsUploadVisible(false)}
                  >
                    <View style={styles.modalContainer}>
                      <TouchableOpacity
                        style={styles.xContainer}
                        onPress={() => setIsUploadVisible(false)}
                      >
                        <XMarkIcon size={hp(3)} color="#2196F3" />
                      </TouchableOpacity>
                      <View style={styles.cancel}>
                        <Text
                          style={{
                            fontSize: wp(7),
                            fontFamily: "QuicksandSemiBold",
                          }}
                        >
                          {t("product_image")}
                        </Text>
                      </View>
                      <View style={styles.icons}>
                        <TouchableOpacity
                          style={styles.modalContent}
                          onPress={() => handleImageSelection("camera")}
                        >
                          <CameraIcon
                            width={wp("13%")}
                            height={hp("10%")}
                            color="#2196F3"
                          />
                          <Text style={{ fontFamily: "QuicksandSemiBold" }}>
                            {t("camera")}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.modalContent}
                          onPress={() => handleImageSelection("gallery")}
                        >
                          <PhotoIcon
                            width={wp("13%")}
                            height={hp("10%")}
                            color="#2196F3"
                          />
                          <Text style={{ fontFamily: "QuicksandSemiBold" }}>
                            {t("gallery")}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.modalContent}
                          onPress={() => {
                            setImage(null);
                            setIsUploadVisible(false);
                          }}
                        >
                          <TrashIcon
                            width={wp("13%")}
                            height={hp("10%")}
                            color="#2196F3"
                          />
                          <Text style={{ fontFamily: "QuicksandSemiBold" }}>
                            {t("remove")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                ) : (
                  <TouchableOpacity
                    style={styles.imageUploadBox}
                    onPress={uploadModel}
                  >
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={styles.uploadedImage}
                      />
                    ) : (
                      <PhotoIcon
                        width={wp("8%")}
                        height={hp("8%")}
                        color="#2196F3"
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>

              {/* Product Details Form */}
              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>
                  {t("product_details_form")}
                </Text>

                {/* Product Name */}
                <Text style={styles.pickerLabel}>{t("product_name")}:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={productName}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setProductName(itemValue);
                      setProductType(""); // Reset product type when product name changes
                    }}
                  >
                    <Picker.Item label="Select Product" value="" />
                    <Picker.Item label={t("toor_dal")} value="turdal" />
                    <Picker.Item label={t("moong_dal")} value="moongdal" />
                    <Picker.Item label={t("urad_dal")} value="uraddal" />
                    <Picker.Item label={t("gram_dal")} value="gramdal" />
                  </Picker>
                </View>
                {/* Product Type*/}
                <Text style={styles.pickerLabel}>Product Type:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={productType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setProductType(itemValue)}
                    enabled={!!productName} // Disable if no product is selected
                  >
                    <Picker.Item label="Select Product Type" value="" />
                    {availableProductTypes.map((type, index) => (
                      <Picker.Item
                        key={index}
                        label={type}
                        value={type.toLowerCase()}
                      />
                    ))}
                  </Picker>
                </View>

                {/* Pricing */}
                <FloatingLabelInput
                  label="Pricing"
                  value={pricing}
                  onChangeText={(text) => {
                    setPricing(text);
                    calculateTotalValue();
                  }}
                  width={wp(20)}
                  keyboardType="numeric"
                />

                {/* Units */}
                <Text style={styles.pickerLabel}>{t("units")}:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={units}
                    style={styles.picker}
                    onValueChange={(itemValue) => setUnits(itemValue)}
                  >
                    <Picker.Item label="Select Unit" value="" />
                    <Picker.Item label={`1${t("kg")}`} value="1KG" />
                    <Picker.Item label="1 ton" value="1ton" />
                  </Picker>
                </View>

                {/* Moisture */}
                <Text style={styles.pickerLabel}>{t("moisture")}:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={moisture}
                    style={styles.picker}
                    onValueChange={(itemValue) => setMoisture(itemValue)}
                  >
                    <Picker.Item
                      label={`${t("select")} ${t("moisture")}`}
                      value="Select Moisture"
                    />
                    <Picker.Item label="10%" value="10%" />
                    <Picker.Item label="20%" value="20%" />
                    <Picker.Item label="30%" value="30%" />
                    <Picker.Item label="40%" value="40%" />
                  </Picker>
                </View>

                {/* Shelf Life */}
                <Text style={styles.pickerLabel}>{t("shelf_life")}:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={shelfLife}
                    style={styles.picker}
                    onValueChange={(itemValue) => setShelfLife(itemValue)}
                  >
                    <Picker.Item
                      label={`${t("select")} ${t("shelf_life")}`}
                      value="Select Shelf Life"
                      style={{ fontFamily: "QuicksandSemiBold" }}
                    />
                    <Picker.Item
                      label={`1 ${t("month")}`}
                      value="1 month"
                      style={{ fontFamily: "QuicksandSemiBold" }}
                    />
                    <Picker.Item label={`3 ${t("month")}`} value="3 months" />
                    <Picker.Item label={`6 ${t("month")}`} value="6 months" />
                    <Picker.Item label={`1 ${t("year")}`} value="1 year" />
                  </Picker>
                </View>

                {/* Validity */}
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>{formatDate(validity)}</Text>
                  <CalendarIcon
                    width={wp("5%")}
                    height={hp("4%")}
                    color="#2196F3"
                    marginLeft={wp(42)}
                  />
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={validity}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                  />
                )}

                {/* Description */}
                <FloatingLabelInput
                  label={t("description")}
                  value={description}
                  onChangeText={setDescription}
                  width={wp(30)}
                />

                {/* Package Details */}
                <Text style={styles.packageDetailsTitle}>
                  {t("package_details")}:
                </Text>
                {packageDetails.map((detail, index) => (
                  <View key={index} style={styles.packageDetailContainer}>
                    <View style={styles.pickerTypeContainer}>
                      <Picker
                        selectedValue={detail.type}
                        style={[
                          { borderColor: "#2196F3" },
                          styles.packageTypePicker,
                        ]}
                        onValueChange={(itemValue) => {
                          const updatedDetails = [...packageDetails];
                          updatedDetails[index].type = itemValue;
                          setPackageDetails(updatedDetails);
                        }}
                      >
                        <Picker.Item
                          label={t("select")}
                          value="Select Package Type"
                        />
                        <Picker.Item label={t("unpacked")} value="Unpacked" />
                        <Picker.Item label={`1 ${t("kg")}`} value="1KG" />
                        <Picker.Item label={`5 ${t("kg")}`} value="5KG" />
                        <Picker.Item label={`25 ${t("kg")}`} value="25KG" />
                        <Picker.Item label={`50 ${t("kg")}`} value="50KG" />
                      </Picker>
                    </View>
                    <TextInput
                      placeholder={t("tonnes") + t("quantity")}
                      value={detail.quantity}
                      onChangeText={(value) => {
                        const updatedDetails = [...packageDetails];
                        updatedDetails[index].quantity = value;
                        setPackageDetails(updatedDetails);
                        calculateTotalValue();
                      }}
                      width={wp(20)}
                      keyboardType="numeric"
                      style={styles.quantityInput}
                    />

                    {index > 0 && (
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removePackageDetail(index)}
                      >
                        <TrashIcon
                          width={wp("5%")}
                          height={hp("5%")}
                          color="#2196F3"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                {/* Add Package Detail Button */}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addPackageDetail}
                >
                  <Text style={styles.addButtonText}>
                    + {t("add_package_details")}
                  </Text>
                </TouchableOpacity>

                <View style={styles.totalValueContainer}>
                  <Text style={styles.totalValueText}>
                    {t("total_price")}: ₹ {totalValue}
                  </Text>
                </View>
                <View style={styles.totalValueContainer}>
                  <Text style={styles.totalValueText}>
                    Total Quantity:{" "}
                    {units === "ton"
                      ? calculateTotalQuantity() / 1000 + " tons"
                      : calculateTotalQuantity() + " tons"}
                  </Text>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={onSubmit}
                >
                  <Text style={styles.submitButtonText}>{t("submit")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFF1",
  },
  container: {
    marginTop: wp(5),
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
  },
  header: {
    fontSize: wp("5%"),
    // fontWeight: "bold",
    marginVertical: wp(3),
    fontFamily: "QuicksandSemiBold",
    color: "#2196F3",
    textAlign: "center",
  },
  subHeader: {
    fontSize: wp("4.5%"),
    fontFamily: "QuicksandSemiBold",
    color: "#888",
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  imageUploadSection: {
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  imageUploadBox: {
    width: wp("40%"),
    height: wp("40%"),
    borderRadius: wp("5%"),
    borderColor: "#2196F3",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: wp("5%"),
  },
  formContainer: {
    backgroundColor: "#FFF",
    borderRadius: wp("5%"),
    padding: wp("5%"),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formTitle: {
    fontSize: wp("6%"),
    // fontWeight: "bold",
    marginBottom: hp("1.5%"),
    textAlign: "center",
    fontFamily: "QuicksandBold",
  },
  pickerLabel: {
    fontSize: wp("4.5%"),
    fontFamily: "QuicksandSemiBold",
    color: "#555",
    marginBottom: hp("0.5%"),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: wp("2%"),
    marginBottom: hp("1.5%"),
    padding: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: hp("5%"),
    width: "100%",
    marginBottom: wp(1),
  },
  packageDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
  },
  pickerTypeContainer: {
    marginRight: 5,
    borderColor: "#2196F3",
    borderWidth: 1,
    height: hp(6),
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  packageTypePicker: {
    width: wp(40),
  },
  quantityInput: {
    width: wp(30),
    marginRight: 2,
    borderColor: "#2196F3",
    padding: wp(2),
    borderWidth: 1,
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  customCheckbox: {
    width: wp("7%"),
    height: wp("7%"),
    borderWidth: 2,
    borderColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("3%"),
  },
  checkboxLabel: {
    fontSize: wp("4.5%"),
    fontFamily: "QuicksandSemiBold",
    color: "#555",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1.5%"),
    marginBottom: hp("1.5%"),
  },
  packageDetailsTitle: {
    fontSize: wp("5%"),
    fontFamily: "QuicksandSemiBold",
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  packageDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  removeButton: {
    marginLeft: wp("3%"),
  },
  addButton: {
    marginTop: hp("1.5%"),
    paddingVertical: hp("1.5%"),
    backgroundColor: "#2196F3",
    borderRadius: wp("2%"),
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: wp("4.5%"),
    fontFamily: "QuicksandSemiBold",
  },
  submitButton: {
    marginTop: hp("3%"),
    paddingVertical: hp("2%"),
    backgroundColor: "#2196F3",
    borderRadius: wp("2%"),
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: wp("5%"),
    // fontWeight: "bold",
    fontFamily: "QuicksandSemiBold",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: wp("5%"),
    padding: wp("5%"),
    alignItems: "center",
  },
  modalContent: {
    alignItems: "center",
    marginHorizontal: wp(6),
  },
  xContainer: {
    position: "absolute",
    right: wp("5%"),
    top: hp("1.5%"),
  },
  cancel: {
    marginBottom: hp("3%"),
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  iconContainer: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("5%"),
    backgroundColor: "white",
    borderRadius: 999,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  totalValueContainer: {
    marginTop: hp(2),
    alignItems: "center",
  },
  totalValueText: {
    fontSize: wp(5),
    // fontWeight: 'bold',
    color: "black",
  },
});

export default ProductDetailsForm;
