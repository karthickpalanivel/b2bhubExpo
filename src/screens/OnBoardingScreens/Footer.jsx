import React from 'react';
import { View, useWindowDimensions } from 'react-native';

import RoundedButton from './RoundedButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Footer = ({

  backgroundColor,
  leftButtonLabel = false,
  leftButtonPress = false,
  rightButtonLabel = false,
  rightButtonPress = false
}) => {

  return (
    
        <View
      style={{
        flexDirection: 'row',
        justifyContent: leftButtonLabel ? 'space-between' : 'flex-end',
        height: hp(7),
        backgroundColor,
        opacity: 0.6,
        alignItems: 'center',
        paddingHorizontal: wp(10)
      }}
    >
      {leftButtonLabel && (
        <RoundedButton label={leftButtonLabel} onPress={leftButtonPress} />
      )}
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </View>
   
  );
};

export default Footer;