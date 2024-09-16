import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Page = ({ backgroundColor, title, width, height, lottieSource, margin }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor }
      ]}
    >
      {/* Display image only on the first screen */}
      {!lottieSource && (
        <Image
          source={require('../assets/b2blogo.png')}
          style={{
            height,
            width,
            marginTop: margin ? wp(20) : wp(0),
          }}
        />
      )}
      {/* Display title if provided */}
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}

      {/* Display Lottie animation if provided */}
      {lottieSource && (
        <View style={styles.lottieWrapper}>
          <LottieView
            source={lottieSource}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
          <View style={styles.textContainer}>
            {/* Display title and subtitle */}
            <Text style={styles.mainText}>{title}</Text>
            <Text style={styles.subText}>
              {/* Placeholder for more detailed information */}
              Additional information about this step.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  titleContainer: {
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2%'),
    alignSelf: 'center',
  },
  titleText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  lottieWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: hp('2%'),
  },
  lottieStyle: {
    width: wp('50%'),
    height: hp('30%'),
    marginBottom: hp('2%'),
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: wp('5%'),
  },
  mainText: {
    color: 'white',
    fontWeight: '600',
    fontSize: wp('5%'),
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  subText: {
    color: 'white',
    fontSize: wp('3.5%'),
    textAlign: 'center',
    lineHeight: hp('2.5%'),
  },
});

export default Page;
