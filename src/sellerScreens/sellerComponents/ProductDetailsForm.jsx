import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import {
  CameraIcon,
  PhotoIcon,
  TrashIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import Modal from "react-native-modal";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AppLoaderAnimation from "../../components/loaders/AppLoaderAnimation";
import FloatingLabelInput from "./FloatingLabelInput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from 'react-native-modal-selector'
const colors = "#E84A5F";
const backgrounds = "#FCF8F3";



const ProductDetailsForm = ({ route }) => {
  const [isProduct, setIsProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerCategory, setCustomerCategory] = useState("");
  const [isOrganic, setIsOrganic] = useState(0);
  const [isPublished, setPublished] = useState(0);
  const [isApproved, setApproved] = useState(0);
  const [pricing, setPricing] = useState("");
  const [units, setUnits] = useState("");
  const [moisture, setMoisture] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [validity, setValidity] = useState(new Date());
  const [description, setDescription] = useState("");
  const [packageDetails, setPackageDetails] = useState([
    { type: "Select Package", quantity: "0" },
  ]);

  const packageDict = packageDetails.reduce((acc, pkg) => {
    if (pkg.type && pkg.quantity) {
      acc[pkg.type] = pkg.quantity;
    }
    return acc;
  }, {});

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
          units === "KG"
            ? parseFloat(detail.quantity) * 1000
            : parseFloat(detail.quantity); // Convert to KG if it's in tons
        return sum + quantityInKg * parseFloat(pricing);
      }
      return sum;
    }, 0);
    setTotalValue(total);
  };
console.log(units);

  // console.log("imageurl" + imageUrl);

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
        (item) => item.type !== "Select Package" && item.quantity
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
      setPackageDetails([{ type: "Select Package", quantity: "" }]);
      setImage(null);
    } else {
      Alert.alert("Enter every field");
    }
  };

  async function AddSellerProduct() {
    const token1 = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}` + "/seller/addProduct",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token1}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allData),
        }
      );
      console.log(allData);

      if (!response.ok) {
        throw new Error("Something went wrong while sending the data.");
      }

      const data = await response.json();
      console.log("Success:", data);
      Alert.alert("Product added successfully!");
      navigation.navigate("SellerHome");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Failed to submit form data", { position: "top-center" });
    }
  }

  const allData = {
    productName: productName,
    productImg:
      "https://res.cloudinary.com/dalzs7bc2/image/upload/v1726650496/image.2_xxq87v.jpg",
    price: pricing,
    units: units,
    moisture: moisture,
    isOrganic: true,
    shelfLife: shelfLife,
    validity: validity,
    description: description,
    packaging: packageDict,
    productType: productType,
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

    if (route?.params) {
      const { product } = route?.params;
      console.log(route?.params)
      if (product) {
        setCustomerCategory(product?.category || "");  // Fallback to empty string
        setCustomerId(product?.customerId || "");
        setDescription(product?.description || "");
        setApproved(product?.isApproved === 1 ? 1 : 0);
        setPublished(product?.isPublished === 1 ? 1 : 0);
        setIsOrganic(product?.isOrganic === 1 ? 1 : 0);
        setMoisture(product?.moisture || "");
        setPackageDetails([{
          type: product?.packaging?.type || "",
          quantity: product?.packaging?.quantity || "",
        }]);
        setPricing(product?.price || "");
        setProductId(product?.productId || "");
        setProductName(product?.productName || "");  // Fallback to empty string
        setProductType(product?.productType || "");
        setShelfLife(product?.shelfLife || "");
        setImage(product?.productImg || "");
        setValidity(product?.validity || "");
        setUnits(product?.units || "");
      }
    }
    
   

    

    const availableProductData = {};

    // console.log(product);
    loadFonts();
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || validity;
    setShowDatePicker(Platform.OS === "ios");
    setValidity(currentDate);
  };

  const formatDate = (dateInput) => {
    // Convert string input into a Date object if it's not already
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  
    // Check if the date is valid
    if (isNaN(date)) {
      return "Invalid Date";
    }
  
    // Format the date as DD-MM-YYYY
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`;
  };

  const addPackageDetail = () => {
    setPackageDetails((prevDetails) => [
      ...prevDetails,
      { type: "Select Package", quantity: "0" },
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





  // const uploadImage = async (imageUri) => {
  //   const formData = new FormData();

  //   formData.append("file", {
  //     uri: imageUri,
  //     type: "image/jpeg", // or the actual MIME type of the image
  //     name: "upload.jpg",
  //   });
  //   formData.append("upload_preset", "ml_default"); // Add your upload preset
  //   formData.append("cloud_name", "dalzs7bc2"); // Add your cloud name if necessary

  //   try {
  //     const response = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dalzs7bc2/image/upload",
  //       formData
  //     );

  //     if (response.data.secure_url) {
  //       setImageUrl(response.data.secure_url); // Store the image URL
  //       console.log("upload succesfull" + response.data.secure_url);

  //       Alert.alert("Upload successful", "Image has been uploaded!");
  //     }
  //   } catch (error) {
  //     console.error("Upload error", error);
  //     Alert.alert("Upload failed", "Something went wrong during the upload.");
  //   } finally {
  //     // setUploading(false);
  //   }
  // };

  function uploadImage(photo){
   const data = new FormData;
   data.append('file',photo);
   data.append("upload_preset","_Dalpicsonly")
   data.append("cloud_name","dbesmy2df")
   fetch("https://api.cloudinary.com/v1_1/dbesmy2df/image/upload",{
    method: 'POST',
    body: data,
    headers:{
      "Accept":"application/json",
      "Content-Type":"multipart/form/data"
    }
   }).then( res => res.json())
   .then(data => {
    setImage(data.uri);
    console.log('==================data uri==================');
    console.log(data.uri);
    console.log('====================================');
   }).catch(err => {
    Alert.alert(err + "error while uploading")
   })
  }

  console.log('====================================');
  console.log(image);
  console.log('====================================');

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
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
      if (!result.canceled) {
        setIsUploadVisible(false);
        const uri = result.assets[0].uri;
        const type = result.assets[0].type;
        const name = result.assets[0].fileName;
        const source = {uri,type,name}
        uploadImage(source)
        console.log('====================================');
        console.log(source);
        console.log('====================================');
        
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
          <StatusBar backgroundColor={backgrounds} style="dark"></StatusBar>
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
                        <XMarkIcon size={hp(3)} color={colors} />
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
                            color={colors}
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
                            color={colors}
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
                            color={colors}
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
                      <View>
                        <PhotoIcon
                          width={wp("8%")}
                          height={hp("8%")}
                          color={colors}
                        />
                        <TouchableOpacity >
                          <View>
                            <Text>Upload</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
                <TouchableOpacity ><Text>upload</Text></TouchableOpacity>
              </View>

              {/* Product Details Form */}
              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>
                  {t("product_details_form")}
                </Text>

                
              {/* Product Name */}
  <ModalSelector
    data={[
      { key: 1, label: t("select_product"), value: "" },
      { key: 2, label: t("toor_dal"), value: "turdal" },
      { key: 3, label: t("moong_dal"), value: "moongdal" },
      { key: 4, label: t("urad_dal"), value: "uraddal" },
      { key: 5, label: t("gram_dal"), value: "gramdal" },
    ]}

    onChange={(option) => {
      setProductName(option.value);
      setProductType(""); // Reset product type when product name changes
    }}
    optionTextStyle={{ color: "white" }}
    cancelStyle={{ display: "none" }}
    selectStyle={styles.selectStyle}
    optionContainerStyle={styles.modalStyle}
    overlayStyle={styles.overlayStyle}
      >
         <FloatingLabelInput
                  label={t("product_name")}
                  value={productName}
                  onChangeText={setDescription}
                  width={wp(29)}
                  fontsize={wp(3.5)}
                />
      </ModalSelector>
   




{/* Product Type */}
  <ModalSelector
    data={[
      { key: 1, label: t("select_product_type"), value: "" },
      ...availableProductTypes.map((type, index) => ({
        key: index + 2,
        label: type,
        value: type.toLowerCase(),
      })),
    ]}
    initValue={t("select_product_type")}
    onChange={(option) => setProductType(option.value)}
    optionTextStyle={{ color: "white" }}
    cancelStyle={{ display: "none" }}
    selectStyle={styles.selectStyle}
    optionContainerStyle={styles.modalStyle}
    overlayStyle={styles.overlayStyle}
    disabled={!productName} // Disable if no product is selected
  >
    
    <FloatingLabelInput
                  label={"Product Type"}
                  value={productType}
                  width={wp(29)}
                  fontsize={wp(3.5)}
                />
  </ModalSelector>


                {/* Pricing */}
                <FloatingLabelInput
                  label="Pricing"
                  value={pricing}
                  onChangeText={(text) => {
                    setPricing(text);
                    calculateTotalValue();
                  }}
                  width={wp(17)}
                  keyboardType="numeric"
                />

                {/* Units */}
                  <ModalSelector
                      data={[
                        { key: 1, label: "Select Unit" },
                        { key: 2, label: "KG" },
                        { key: 3, label: "Tons" },
                      ]}
                      
                      onChange={(option) => setUnits(option.label)}
                      //style={styles.modalSelector}
                      optionTextStyle={{color:"white"}}
                      cancelStyle={{display:"none"}}
                      selectStyle={styles.selectStyle}
                      optionContainerStyle ={styles.modalStyle}
                      overlayStyle={styles.overlayStyle}
                      
                    >
                    <FloatingLabelInput
                  label={"Unit"}
                  value={units}
                  onChangeText={setDescription}
                  width={wp(10.5)}
                  fontsize={wp(4.5)}
                />
                    
                    </ModalSelector>


                {/* Moisture */}
                <ModalSelector
                      data={[
                        { key: 1, label: "Wet" },
                        { key: 2, label: "Dry" },
                        { key: 3, label: "Normal" },
                      ]}
                      
                      onChange={(option) =>setMoisture(option.label)}
                      //style={styles.modalSelector}
                      optionTextStyle={{color:"white"}}
                      cancelStyle={{display:"none"}}
                      selectStyle={styles.selectStyle}
                      optionContainerStyle ={styles.modalStyle}
                      overlayStyle={styles.overlayStyle}
                      
                    >
                    <FloatingLabelInput
                  label={"Moisture"}
                  value={moisture}
                  onChangeText={setMoisture}
                  width={wp(20)}
                  fontsize={wp(4.5)}
                />
                    
                    </ModalSelector>

                {/* Shelf Life */}
                <ModalSelector
                      data={[
                        { key: 1, label: "1 month" },
                        { key: 2, label: "2 month" },
                        { key: 3, label: "3 month" },
                        { key: 4, label: "1 year" },
                      ]}
                      
                      onChange={(option) =>setShelfLife(option.label)}
                      //style={styles.modalSelector}
                      optionTextStyle={{color:"white"}}
                      cancelStyle={{display:"none"}}
                      selectStyle={styles.selectStyle}
                      optionContainerStyle ={styles.modalStyle}
                      overlayStyle={styles.overlayStyle}
                      
                    >
                    <FloatingLabelInput
                  label={"Shelf Life"}
                  value={shelfLife}
                  onChangeText={setShelfLife}
                  width={wp(25)}
                  fontsize={wp(2.5)}
                />
                   

                    
                    </ModalSelector>

                {/* Validity */}
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>{formatDate(validity)}</Text>
                  <CalendarIcon
                    width={wp("5%")}
                    height={hp("4%")}
                    color={colors}
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
                   
                    <ModalSelector
                        data={[
                             { key: 1, label: t("unpacked"), value: "Unpacked" },
                             { key: 2, label: `1 ${t("kg")}`, value: "1KG" },
                             { key: 3, label: `5 ${t("kg")}`, value: "5KG" },
                             { key: 4, label: `25 ${t("kg")}`, value: "25KG" },
                             { key: 5, label: `50 ${t("kg")}`, value: "50KG" },
                            ]}
                        onChange={(option) => {
                        const updatedDetails = [...packageDetails];
                        updatedDetails[index].type = option.value; // Use option.value instead of label to update type
                        setPackageDetails(updatedDetails);
                         }}
                          optionTextStyle={{ color: "white" }}
                          cancelStyle={{ display: "none" }}
                          selectStyle={styles.selectStyle}
                          optionContainerStyle={styles.modalStyle}
                          overlayStyle={styles.overlayStyle}
                        >
                   <FloatingLabelInput
                  label={"Type"}  
                  value={packageDetails[index].type}
                  onChangeText={setPackageDetails}
                  width={wp(17)}
                  fontsize={wp(4.5)}
                  />
                </ModalSelector>
                  
                <FloatingLabelInput
                  label={ "Quantity "}
                  value={detail.quantity}
                  onChangeText={(value) => {
                    const updatedDetails = [...packageDetails];
                    updatedDetails[index].quantity = value;
                    setPackageDetails(updatedDetails);
                    calculateTotalValue();
                    }}
                  width={wp(19)}
                   keyboardType="numeric"
                   fontsize={wp(0.2)}
/>


                    {index > 0 && (
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removePackageDetail(index)}
                      >
                        <TrashIcon
                        marginTop={wp(5)}
                          width={wp("5%")}
                          height={hp("5%")}
                          color={colors}
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
                      ? calculateTotalQuantity() / 1000 + " tonnes"
                      : calculateTotalQuantity() + " tonnes"}
                  </Text>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => AddSellerProduct()}
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
    backgroundColor: backgrounds,
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
    color: colors,
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
    borderColor: colors,
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
  modalSelector: {
    borderWidth: wp(0.5),
    borderColor: '#E84A5F', // Set border color
    borderRadius: wp(2),
    marginBottom: wp(2),
    width:wp(79)
  },
  selectStyle: {
    padding: wp(4),
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: '#FFFFF', // Optional background color for selected item
    borderWidth: 0, // Remove border
  },
  overlayStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay background
  },
  modalStyle: {
   
    backgroundColor: colors, // Set modal background color to red
    borderRadius: wp(5), // Optional: add border radius to the modal
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors,
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
    marginBottom: wp(2),
  },
  pickerTypeContainer: {
    marginRight: 5,
    borderColor: colors,
    borderWidth: 1,
    height: hp(6),
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  packageTypePicker: {
    width: wp(40),
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
    borderColor: colors,
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
    borderColor: colors,
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
    justifyContent:"space-around",
    marginBottom: hp("0.5%"),
    
  },
  removeButton: {
    marginLeft: wp("3%"),
  },
  addButton: {
    marginTop: hp("1.5%"),
    paddingVertical: hp("1.5%"),
    backgroundColor: colors,
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
    backgroundColor: colors,
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
