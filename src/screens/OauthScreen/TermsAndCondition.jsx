import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
  import { useTranslation } from "react-i18next";
  import Toggle from "react-native-toggle-element";

const colors = "#E84A5F";
const backgrounds = "#FCF8F3";
const important="#FFF8C1";
const bar="#FFC85C"

const TermsAndCondition = () => {
  const { t } = useTranslation();
  const [toggleValue, setToggleValue] = useState(false); // false -> buyer, true -> seller

  return (
    <View style={styles.scroll}>
      <StatusBar style="light" backgroundColor={colors} />
      <Text style={styles.termsColor}>Terms and Conditions [**Mandate**]</Text>
      
      <View style={{ alignItems: "center" }}>
        <Toggle
          value={toggleValue}
          onPress={(newState) => setToggleValue(newState)}
          leftComponent={
            <Text style={{ fontFamily: "QuicksandSemiBold", fontSize: wp(4) ,color:!toggleValue ?"#000":"#fff"}}>
              {t("buyer")}
            </Text>
          }
          rightComponent={
            <Text style={{ fontFamily: "QuicksandSemiBold", fontSize: wp(4) ,color:toggleValue ?"#000":"#fff"}}>
              {t("seller")}
            </Text>
          }
          trackBarStyle={{
            borderColor: colors,
            backgroundColor: colors,
            justifyContent: "center",
          }}
          trackBar={{
            borderWidth: 2,
            width: wp(70),
          }}
          thumbButton={{
            width: wp(35),
            radius: wp(10),
            activeBackgroundColor: "#fff",
            inActiveBackgroundColor: "#fff",
          }}
        />
      </View>

      {/* Scrollable Card */}
     {toggleValue ? <>
      <View style={styles.container}>
        <ScrollView style={styles.card}>
          <View style={{ alignItems: 'center', marginHorizontal: wp(5) }}>
          <Text style={styles.heading}>Seller </Text>
               <Text style={styles.termsText}>
                1. <Text style={styles.boldText}>{t("introduction")}: </Text>{" "}
                {t("seller_into")}
              </Text>
              <Text style={styles.termsText}>
                2. <Text style={styles.boldText}>{t("definition")}: </Text>{" "}
                {t("seller_definition")}
              </Text>
              <Text style={styles.termsText}>
                3.{" "}
                <Text style={styles.boldText}>{t("Registration_and_Account_Creation")}: </Text>{" "}
                {t("seller_regi")}
              </Text>
              <Text style={styles.termsText}>
                4.
                <Text style={styles.boldText}>
                  {t( "Product_Listings_and_Compliance")}:
                </Text>
                {t("seller_Product_Listings")}
              </Text>
              <Text style={styles.termsText}>
                5.{" "}
                <Text style={styles.boldText}>
                  {t("Pricing_and_Payments")}:{" "}
                </Text>
                {t( "seller_Pricing_and_Payments")}
              </Text>
              <Text style={styles.termsText}>
                6.{" "}
                <Text style={styles.boldText}>
                  {t("Shipping_and_Fulfillment")}:
                </Text>{" "}
                {t("seller_Shipping_and_Fulfillment")}
              </Text>
              <Text style={styles.termsText}>
                7.{" "}
                <Text style={styles.boldText}>
                  {t("returns_and_refunds")}:{" "}
                </Text>
                {t("seller_Returns_and_Refunds")}
              </Text>
              <Text style={styles.termsText}>
                8.{" "}
                <Text style={styles.boldText}>
                  {t("Intellectual_Property")}:
                </Text>{" "}
                {t("seller_ Intellectual_Property")}
              </Text>
              <Text style={styles.termsText}>
              9.{" "}
                <Text style={styles.boldText}>
                  {t("Seller_Conduct")}:
                </Text>{" "}
                {t("seller_Conduct")}
              </Text>
              <Text style={styles.termsText}>
              10.{" "}
               <Text style={styles.boldText}>
                {t("limitation_of_liability")}:
                 </Text>
                 {t("liability")}{" "}
                      </Text>
              <Text style={styles.termsText}>
                11.{" "} <Text style={styles.boldText}>{t("Termination_and_Account_Suspension")}:</Text>{" "}
                {t("seller_Termination")}
              </Text>
              <Text style={styles.termsText}>
                12. <Text style={styles.boldText}>{t("Governing_Law")}:</Text>{" "}
                {t("seller_Governing_Law")}
              </Text>
              <Text style={styles.termsText}>
                13. <Text style={styles.boldText}>{t("Amendments")}:</Text>{" "}
                {t("seller_Amendments")}
              </Text>
              <Text style={styles.termsText}>
                14.{" "}
                <Text style={styles.boldText}>{t("contact_information")}:</Text>{" "}
                {t("seller_Contact")}
              </Text>
              <Text></Text>
          </View>

         
        </ScrollView>
      </View>
     </>:<>
     <View style={styles.container}>
        <ScrollView style={styles.card}>
          <View style={{ alignItems: 'center', marginHorizontal: wp(5) }}>
          <Text style={styles.heading}>Buyer </Text>
               <Text style={styles.termsText}>
                1. <Text style={styles.boldText}>{t("introduction")}: </Text>{" "}
                {t("buyer_intro")}
              </Text>
              <Text style={styles.termsText}>
                2. <Text style={styles.boldText}>{t("definition")}: </Text>{" "}
                {t("buyer_def")}
              </Text>
              <Text style={styles.termsText}>
                3.{" "}
                <Text style={styles.boldText}>{t("account_Creation")}: </Text>{" "}
                {t("user_account")}
              </Text>
              <Text style={styles.termsText}>
                4.
                <Text style={styles.boldText}>
                  {t( "Product_Purchases_and_Payment")}:
                </Text>
                {t("user_product")}
              </Text>
              <Text style={styles.termsText}>
                5.{" "}
                <Text style={styles.boldText}>
                  {t("Pricing")}:{" "}
                </Text>
                {t( "user_Pricing")}
              </Text>
              <Text style={styles.termsText}>
                6.{" "}
                <Text style={styles.boldText}>
                  {t("Shipping_and_Delivery")}:
                </Text>{" "}
                {t("user_Shipping")}
              </Text>
              <Text style={styles.termsText}>
                7.{" "}
                <Text style={styles.boldText}>
                  {t("Returns_and_Refunds")}:{" "}
                </Text>
                {t("user_return")}
              </Text>
              <Text style={styles.termsText}>
                8.{" "}
                <Text style={styles.boldText}>
                  {t("Intellectual_Property")}:
                </Text>{" "}
                {t("user_intellectual")}
              </Text>
              <Text style={styles.termsText}>
              9.{" "}
                <Text style={styles.boldText}>
                  {t("Buyer_Conduct")}:
                </Text>{" "}
                {t("user_Buyer_Conduct")}
              </Text>
              <Text style={styles.termsText}>
              10.{" "}
               <Text style={styles.boldText}>
                {t("limitation_of_liability")}:
                 </Text>
                 {t("user_limit")}{" "}
                      </Text>
              <Text style={styles.termsText}>
                11.{" "} <Text style={styles.boldText}>{t("Dispute_Resolution")}:</Text>{" "}
                {t("user_dispute")}
              </Text>
              <Text style={styles.termsText}>
                12. <Text style={styles.boldText}>{t("Termination_of_Account")}:</Text>{" "}
                {t("user_term")}
              </Text>
               <Text style={styles.termsText}>
                13. <Text style={styles.boldText}>{t("Governing_Law")}:</Text>{" "}
                {t("seller_Governing_Law")}
              </Text>
              <Text style={styles.termsText}>
                14. <Text style={styles.boldText}>{t("Amendments")}:</Text>{" "}
                {t("seller_Amendments")}
              </Text>
              <Text style={styles.termsText}>
                15.{" "}
                <Text style={styles.boldText}>{t("contact_information")}:</Text>{" "}
                {t("seller_Contact")}
              </Text>
              <Text></Text>
          </View>

         
        </ScrollView>
      </View>
     </>}
     {
      toggleValue?<>
        <View style={styles.importantSection}>
            <View style={styles.bars}><Text></Text></View>
            <View style={{ alignItems: 'center', margin: wp(4) ,}}>
              <Text style={[styles.termsText,{color:"#fff",}]}>
                <Text style={styles.boldText}>{t("Important")}: </Text> {t("Violation")}
              </Text>
            </View>
          </View>
      </>:<>
      <View style={styles.importantSection}>
            <View style={styles.bars}><Text></Text></View>
            <View style={{ alignItems: 'center', margin: wp(4) ,}}>
              <Text style={[styles.termsText,{color:"#fff",}]}>
                <Text style={styles.boldText}>{t("Important")}: </Text> {t("buyer_imp")}
              </Text>
            </View>
          </View>
      </>
     }
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: backgrounds,
    alignItems: 'center',
    padding: wp(5),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
    marginVertical: wp(3.5),
    height:hp(65)
  },
  card: {
    backgroundColor: "white",
    padding: wp(3),
    borderRadius: wp(2.5),
    elevation: 5,
    width: wp(90),
  // Set a height to make the card scrollable
  },
  heading: {
    fontSize: wp(8),
    fontWeight: 'bold',
    color: colors,
    marginBottom: wp(2),
  },
  termsColor: {
    color: "#000",
    fontSize: wp(5),
    fontWeight: "bold",
    margin: wp(2),
    marginTop:wp(10)
  },
  termsText: {
    fontSize: wp(3.5),
    fontFamily: "QuicksandSemiBold",
    marginBottom: wp(2.5),
  },
  boldText: {
    fontWeight: "bold",
    fontFamily: "QuicksandBold",
  },
  importantSection: {
    backgroundColor: colors,
    
    flexDirection: 'row',
    marginBottom: wp(5),
    elevation: 5,
    borderRadius:wp(2)
  },
  bars: {
    width: wp(3),
    backgroundColor: bar,
    borderTopLeftRadius:wp(2),
    borderBottomLeftRadius:wp(2),

  },
});
