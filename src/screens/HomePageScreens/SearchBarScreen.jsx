import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import SearchBarComponent from "../../components/searchBar/SearchBarComponent";
  import { ShoppingBagIcon, XMarkIcon } from "react-native-heroicons/outline";
  
  const SearchBarScreen = () => {
    let searches = [
      {
        _id: 1,
        name: "Tur Dal",
      },
      {
        _id: 2,
        name: "Moong Dal",
      },
      {
        _id: 3,
        name: "Gram Dal",
      },
      {
        _id: 4,
        name: "Urad Dal",
      },
    ];
  
    const [recentSearch, setRecentSearch] = useState(searches);
  
    const removeItemFromSearch = (index) => {
      setRecentSearch((prev) => prev.filter((item) => item._id !== index));
    };
  
    const RecentSearch = ({ recentSearch, index }) => {
      return (
        <View style={styles.recentSearchContainer}>
          <View style={styles.searchTextContainer}>
            <ShoppingBagIcon size={hp(3.5)} color={"grey"} />
            <Text style={styles.searchText}>{recentSearch.name}</Text>
          </View>
          <TouchableOpacity onPress={() => removeItemFromSearch(index)}>
            <XMarkIcon size={hp(3)} color={"grey"} />
          </TouchableOpacity>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <SearchBarComponent />
          <Text style={styles.recentHeader}>Recent Search</Text>
          {recentSearch.map((search) => {
            return (
              <RecentSearch
                recentSearch={search}
                key={search._id}
                index={search._id}
              />
            );
          })}
        </SafeAreaView>
      </View>
    );
  };
  
  export default SearchBarScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    safeArea: {
      marginVertical: hp(5),
    },
    recentHeader: {
      fontSize: hp(2.5),
      color: "grey",
      fontWeight: "800",
      marginTop: hp(2),
      marginLeft: hp(2),
      textDecorationLine: "underline",
    },
    searchText: {
      fontSize: hp(2),
      marginLeft: hp(1),
      color: "grey",
    },
    searchTextContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    recentSearchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: hp(2),
    },
  });
  