import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { orderData } from "../../data/OrderData";
const FilterItem = ({all}) => {
  return (
    <>
      {orderData.length !== 0 ? (
        orderData?.map((item) => {
          {
            all ? (
              <>
                <OrderCardTwo props={item} />
              </>
            ) : (
              <>
                <OrderCard props={item} status={status} />
              </>
            );
          }
        })
      ) : (
        <>
          <View style={styles.container}>
            <View styles={styles.imageCard}>
              <Image
                source={require("../../assets/orders/noOrders.png")}
                styles={styles.imageCard}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default FilterItem;

const styles = StyleSheet.create({});
