import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

// Data import
import { categoriesData } from "../data/Categories";
import { categoryByProduct } from "../data/Categories";
import { toorDal, moongDal, uradDal, gramDal } from "../data/ProductScreenData";

export default function Categories({ activeCategory, setActiveCategory }) {
  return (
    <Animated.View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollConatiner}
      >
        {categoriesData?.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.category}
              onPress={() => setActiveCategory(category.name)}
            >
              <View style={styles.categoryView}>
                <Image
                  source={{ uri: category.imageUrl }}
                  style={styles.imageCard}
                />
                {/* <Images uri={category.name}
                  style={styles.imagesComp}
                /> */}
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {categoryByProduct?.map((product, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.category}
              onPress={() => setActiveCategory(product.name)}
            >
              <View style={styles.categoryView}>
                <Text style={styles.categoryName}>{product.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollConatiner: {
    paddingVertical: 16,
    paddingLeft: 10,
    overflow: "scroll",
  },

  category: {
    marginHorizontal: wp(2),
    alignItems: "center",
    justifyContent: "center",
  },

  imagesComp: {
    width: hp(6),
    height: hp(6),
    borderRadius: 9999,
  },

  categoryView: {},

  imageCard: {
    width: hp(8),
    height: hp(8),
    borderRadius: 9999,
  },
  categoryName: {
    fontSize: 15,
    textAlign: "center",
  },
});
