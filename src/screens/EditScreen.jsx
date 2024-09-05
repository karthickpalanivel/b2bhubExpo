import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import ProfileHeaderLayout from "./ProfileScreenContains/ProfileHeaderLayout";

const EditScreen = ({header}) => {
  return (
    
    <View>
        <ProfileHeaderLayout header={header}/>
      <Text>EditScreen</Text>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({});
