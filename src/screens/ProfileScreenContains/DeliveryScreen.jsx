import { StyleSheet, Text, TouchableOpacity, View, Image, Modal } from "react-native";
import React, { useState } from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";
import { orderData } from "../../data/OrderData";
import { useNavigation } from "@react-navigation/native";
import OrderCard from "../../components/Order/OrderCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const DeliveryScreen = () => {
  const [status, setStatus] = useState("All");
  const[visible, setVisible] = useState(true);
  const navigation = useNavigation();
  return (
    <View>
      <ProfileHeaderLayout header={"Deliveries & Orders"} />
      {orderData.length !== 0 ? (
        <Text style={styles.orderHeader}>Orders</Text>
      ) : (
        <></>
      )}
      {orderData.length !== 0 ? (
        orderData?.map((item) => {
          return (
            <>
              <OrderCard props={item} />
            </>
          );
        })
      ) : (
        <>
          <View style={styles.container}>
            <View styles={styles.imageCard}>
              <Text>Looks like you need to make orders</Text>
            </View>
            <View>
              <Text>start your first order</Text>
            </View>
          </View>
        </>
      )}

      
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageCard: {
    width: wp(100),
    height: wp(100),
    marginTop: hp(50),
  },
  orderHeader: {
    fontSize: hp(3),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: hp(2),
  },
});
