import React, { useState, useEffect } from 'react';
import { Animated, TextInput, StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const colors="#E84A5F";

const FloatingLabelInput = ({ label, value, onChangeText,width,size, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isNotEmpty, setIsNotEmpty] = useState(value.length > 0);

  
  const animatedLabelPosition = new Animated.Value(value.length > 0 || isFocused ? 1 : 0);
  const animatedLabelScale = new Animated.Value(value.length > 0 || isFocused ? 0.8 : 1);
  
  useEffect(() => {
    Animated.timing(animatedLabelPosition, {
      toValue: value.length > 0 || isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    Animated.timing(animatedLabelScale, {
      toValue: value.length > 0 || isFocused ? 0.9 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
  }, [value, isFocused]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: animatedLabelPosition.interpolate({
              inputRange: [0, 1.5],
              outputRange: [30, 0]
            }),
            fontSize: animatedLabelScale.interpolate({
              inputRange: [0, 2],
              outputRange: [14, 15]
            }),
            color: isFocused ? colors: '#aaa',
            width:width,
            fontSize: size, 
            fontFamily: 'QuicksandSemiBold',
          }
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        {...props}
        value={value}
        onChangeText={text => {
          setIsNotEmpty(text.length > 0);
          onChangeText(text);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('1%'), // Equivalent to 16px height based on screen percentage
    borderRadius: wp('1.5%'),
    // Equivalent to 5px width based on screen percentage
  },
  label: {  
    left:0,
    color: 'black',
    paddingHorizontal: wp('1.0%'), // Equivalent to 10px width
    justifyContent: 'center',
    backgroundColor:'#fff',
    marginLeft:wp(2),
    zIndex:100,
  },
  input: {
    borderWidth: wp('0.4%'), 
    borderColor: colors,
    padding:wp(3),
    paddingVertical: hp('1%'), 
    borderRadius: wp('1.5%'), 
   
    fontFamily: 'QuicksandSemiBold',
  },
});


export default FloatingLabelInput;
