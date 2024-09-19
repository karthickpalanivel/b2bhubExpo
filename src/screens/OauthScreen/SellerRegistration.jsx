import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width } = Dimensions.get("window");

const SellerRegistration = () => {
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [getOtp, setGetOtp] = useState(false);
  const [Otp, setOTP] = useState("");
  const [serverOtp, setServerOtp] = useState(""); 
  const [otpError, setOtpError] = useState("");
  const [categoryModal,setCategotyModal]=useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sucessModalVisible, setSucessModalVisible] = useState(false);

  const navigation = useNavigation();


  // Function to validate email format
  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError(""); // Clear error if email is valid
    }
  };

  // Handle email input change and validate in real time
  const handleEmailChange = (text) => {
    setEmail(text);
    validateEmail(text); // Validate email as user types
  };

  const handleRegister = () => {
    // Example: Send the OTP to the user's email and store the OTP sent by the server
    console.log(city);
    console.log(email);
    // Simulate the server sending OTP, store it for later comparison
    const generatedOtp = "1234"; // Simulated OTP sent by the server
    setServerOtp(generatedOtp);
    setGetOtp(true); // Show OTP input field
    Alert.alert("OTP Sent", "An OTP has been sent to your email.");
  };

  const handleOtpChange = (text) => {
    setOTP(text);
  };

  const handleOtp = () => {
    if (Otp === serverOtp) {
      Alert.alert("OTP Verified", "An OTP has been verified.");
      setTimeout(() => {
        setCategotyModal(true);
      }, 2500);
    } else {
      setOtpError("Invalid OTP");
    }
  };

  const handleCategory=() =>{
    setCategotyModal(false);
    setSucessModalVisible(true);
  }

  const handlenav=()=>{
    setSucessModalVisible(false);
    navigation.navigate("Login");

  }

  // Check if both fields are valid
  const isFormValid = city !== "" && emailError === "" && email !== "";
  const isOtpValid = Otp !== ""; // Check if OTP is entered

  return (
    <ScrollView style={styles.container}>
      {/* Add logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/B2BlogoRounded.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.loginCard}>
        <Text style={styles.title}>Seller Registration</Text>

        <View>
          <Text style={styles.inputName}>
            <Text style={{ color: "#d53c46" }}>**</Text> Enter Your Location
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={city}
              style={styles.picker}
              onValueChange={(itemValue) => setCity(itemValue)}
            >
              <Picker.Item label="Select Location" value="" />
              <Picker.Item label="Chennai" value="Chennai" />
              <Picker.Item label="Bangalore" value="Bangalore" />
              <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
              <Picker.Item label="Hyderabad" value="Hyderabad" />
              <Picker.Item label="Delhi" value="Delhi" />
              <Picker.Item label="Mumbai" value="Mumbai" />
            </Picker>
          </View>

          <Text style={styles.inputName}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange} // Capture email input
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {getOtp ? (
          <>
            <Text style={styles.inputName}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={Otp}
              onChangeText={handleOtpChange} // Capture OTP input
            />
            {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
            <TouchableOpacity
              style={[styles.submitButton, !isOtpValid && styles.disabledButton]}
              onPress={handleOtp} // Call your OTP verification function here
              disabled={!isOtpValid} // Disable the button if the form is not valid
            >
              <Text style={styles.submitButtonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.submitButton, !isFormValid && styles.disabledButton]}
            onPress={handleRegister} // Call your registration function here
            disabled={!isFormValid} // Disable the button if the form is not valid
          >
            <Text style={styles.submitButtonText}>Send OTP</Text>
          </TouchableOpacity>
        )}
        {
  categoryModal ? (
    <Modal
      transparent={true}
      animationType="slide"
      visible={categoryModal}
      onRequestClose={() => setCategotyModal(false)} // Add this to close the modal on back press
    >
      <View style={styles.modalBackground}>
        <View style={styles.categorycontainer}>
          <Text style={styles.title}>Choose Your Category</Text>

          <TouchableOpacity
            style={[styles.option, selectedCategory === "platinum" && styles.selected]}
            onPress={() => setSelectedCategory("platinum")}
          >
            <View style={{ flexDirection: "row", }}>
              <Image source={require("../../assets/platinum.png")} style={styles.img} />
              <View>
                <Text style={styles.categoryTitle}>PLATINUM SELLER</Text>
                <Text style={styles.eligibilityText}>
                  Eligibility: Business is more than 50 Crore
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, selectedCategory === "gold" && styles.selected]}
            onPress={() => setSelectedCategory("gold")}
          >
            <View style={{ flexDirection: "row", }}>
            <Image source={require("../../assets/gold.png")} style={styles.img} />
             <View>
             <Text style={styles.categoryTitle}>GOLD SELLER</Text>
            <Text style={styles.eligibilityText}>
              Eligibility: Business is less than 50 Crore
            </Text>
             </View>
            </View>
            
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={
             handleCategory
            }
            disabled={!selectedCategory}
          >
            <Text style={styles.registerButtonText}>
              Register as {selectedCategory ? (selectedCategory === "platinum" ? "PLATINUM" : "GOLD") : "Member"}
            </Text>
          </TouchableOpacity>

          
        </View>
      </View>
    </Modal>
  ) : null

}
 {sucessModalVisible ?(<>
          <Modal
            transparent={true}
           animationType="fade"
           >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                   
                       <Text style={styles.successTitle}>Successfully Registered as Seller</Text>
                       <Text style={styles.message}>Use Your Existing Credentials to login</Text>
          
                     <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handlenav}>
                   <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
        </>):(null)}
      </View>
    </ScrollView>
  );
};

export default SellerRegistration;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d53c46",
    height: hp(100),
    alignContent: "center",
  },
  logoContainer: {
    marginTop: hp(10),
    marginLeft: wp(35),
    marginBottom: hp(3),
    borderRadius: 999,
    borderWidth: 0.1,
    width: wp(30),
    height: wp(30),
  },
  logo: {
    width: wp(30),
    height: wp(30),
  },
  img:{
    width:wp(15),
    height:hp(7),
    marginRight:wp(2)
  },
  loginCard: {
    alignItems: "center",
    width: wp("90%"),
    marginHorizontal: wp(5),
    marginTop: wp(5),
    paddingTop: wp(2),
    paddingBottom: wp(5),
    backgroundColor: "#FFFFFF",
    borderRadius: wp(8),
  },
  title: {
    fontSize: wp(8),
    margin: wp(5),
    color: "#d53c46",
    fontFamily: "QuicksandBold",
  },
  inputName: {
    width: wp(70),
    fontSize: wp(4),
    fontFamily: "QuicksandBold",
    marginBottom: wp(2),
  },
  input: {
    borderColor: "gray",
    width: wp("75%"),
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "QuicksandSemiBold",
    padding: wp(2.5),
    marginBottom: wp(2),
    backgroundColor: "white",
    elevation: 2,
  },
  pickerContainer: {
    borderColor: "gray",
    width: wp("75%"),
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "QuicksandSemiBold",
    padding: wp(2.5),
    marginBottom: wp(2),
    backgroundColor: "white",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: hp("3%"),
    width: "100%",
    marginBottom: wp(1),
    fontSize: wp(1),
  },
  submitButton: {
    backgroundColor: "#d53c46",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: wp(4),
    fontFamily: "QuicksandBold",
  },
  disabledButton: {
    backgroundColor: "#ccc", // Style to indicate the button is disabled
  },
  errorText: {
    color: "red",
    marginTop: wp(1),
    fontSize: wp(3.5),
    fontFamily: "QuicksandSemiBold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken the background
  },
  categorycontainer: {
    padding: 20,
    width: wp(80),
    backgroundColor: '#fff', // Ensure it's visible
    borderRadius: 10,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  option: {
    width: wp(70),
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#ccc',
    elevation:2,
    backgroundColor:'#fff'
  },
  selected: {
    borderColor: '#007bff',
    backgroundColor: '#e7f1ff',
  },
  categoryTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  eligibilityText: {
    fontSize: wp(2.5),
    color: '#555',
    marginTop: 5,
  },
  registerButton: {
    marginTop: 30,
    padding: 15,
    width: '90%',
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ccc',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },

});
 