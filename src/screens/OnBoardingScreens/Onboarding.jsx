import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Footer from './Footer';
import Page from './page';

const Onboarding = () => {
  const pagerRef = useRef(null);
  const navigation = useNavigation();

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
      >
        <View key="1" style={styles.pageContainer}>
          <Page
            backgroundColor="#ffc93c"
            title="Welcome to b2bhub"
            width={wp(60)}
            height={hp(30)}
            margin={false}
          />
          <Footer
            backgroundColor="#ffc93c"
            rightButtonLabel="Next"
            rightButtonPress={() => handlePageChange(1)}
          />
        </View>
        <View key="2" style={styles.pageContainer}>
          <Page
            backgroundColor="#ff5959"
            title="Create an account"
            width={wp(30)}
            height={hp(10)}
            margin={true}
            lottieSource={require('../../assets/lottie/register.json')}
          />
          <Footer
            backgroundColor="#ff5959"
            leftButtonLabel="Back"
            leftButtonPress={() => handlePageChange(0)}
            rightButtonLabel="Continue"
            rightButtonPress={() => handlePageChange(2)}
          />
        </View>
        <View key="3" style={styles.pageContainer}>
          <Page
            backgroundColor="#ff5959"
            title="Complete shop KYC"
            width={wp(30)}
            height={hp(10)}
            margin={true}
            lottieSource={require('../../assets/lottie/select_items.json')}
          />
          <Footer
            backgroundColor="#ff5959"
            leftButtonLabel="Back"
            leftButtonPress={() => handlePageChange(1)}
            rightButtonLabel="Continue"
            rightButtonPress={() => handlePageChange(3)}
          />
        </View>
        <View key="4" style={styles.pageContainer}>
          <Page
            backgroundColor="#ff5959"
            title="Place Your Order"
            width={wp(30)}
            height={hp(10)}
            margin={true}
            lottieSource={require('../../assets/lottie/place_order.json')}
          />
          <Footer
            backgroundColor="#ff5959"
            leftButtonLabel="Back"
            leftButtonPress={() => handlePageChange(2)}
            rightButtonLabel="Finish"
            rightButtonPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
});

export default Onboarding;
