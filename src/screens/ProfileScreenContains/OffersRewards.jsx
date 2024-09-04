import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ProfileHeaderLayout from "./ProfileHeaderLayout";
import { offerData } from "../../data/OfferData";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";

const OffersRewards = () => {
  const random = Math.floor(Math.random());

  const OfferCard = ({ props }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.rewardContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.deals}>Best Deals</Text>
          </View>
          <Image
            source={require("../../assets/offer/giftPurple.png")}
            style={styles.purpleGift}
          />
          <Text style={styles.offerText}>{props.offer}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rewardContainer}></TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ProfileHeaderLayout header={"Rewards & Offer"} />
      <ScrollView>
        {offerData === 0 ? (
          <View>
            <Text>No Data Found</Text>
          </View>
        ) : (
          <View>
            <MasonryList
              data={offerData}
              keyExtractor={(item) => item._id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, i }) => <OfferCard props={item} index={i} />}
              onEndReachedThreshold={0.1}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OffersRewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  rewardContainer: {
    width: wp(40),
    height: wp(40),
    marginHorizontal: wp(5),
    marginVertical: wp(5),
    backgroundColor: "#f59e0b",
    borderRadius: wp(2),
  },

  logoImage: {
    width: hp(5),
    borderRadius: 999,
    margin: wp(3),
    height: hp(5),
  },
  offerText: {
    fontSize: hp(2),
    paddingHorizontal: hp(1.5),
    color: "white",
    fontWeight: "bold",
  },

  purpleGift: {
    position: "absolute",
    right: hp(1),
    bottom: hp(0),
    width: hp(10),
    height: hp(10),
  },
  deals: {
    fontSize: hp(2),
    color: "white",
    fontWeight: "bold",
  },
});
