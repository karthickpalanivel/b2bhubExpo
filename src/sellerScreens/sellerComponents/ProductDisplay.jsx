// Home.js
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProductCard from './productCard'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const products = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dve3s278t/image/upload/v1725256181/toordal_ttywek.webp',
    name: 'Toor dal',
    price: '100',
    unit: 'KG',
    moisture: '10%',
    Organic: false,
    shelfLife: '1 month',
    validity: '1 year',
    desc: 'Organic Toor dal',
    quality: '100 tones',
  },
  {
    id: 1,
    image: 'https://res.cloudinary.com/dve3s278t/image/upload/v1725256181/toordal_ttywek.webp',
    name: 'Toor dal',
    price: '100',
    unit: 'KG',
    moisture: '10%',
    Organic: true,
    shelfLife: '1 month',
    validity: '1 year',
    desc: 'Organic Toor dal',
    quality: '100 tones',
  },
  
];

const ProductDisplay = () => {

  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [customerId, setcustomerId] = useState("")
  const [token, settoken] = useState("")

  //console.log("this is data"+data);
  

  AsyncStorage.getItem("customerId")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        console.log("Value:", value);
        setcustomerId(value)
        handleFetch()
      } else {
        // No value found
        console.log("No value found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });

    AsyncStorage.getItem("token")
    .then((value) => {
      if (value !== null) {
        // Value was found, do something with it
        settoken(value)
        console.log("Value:", value);
      } else {
        // No value found
        console.log("No value found");
      }
    })
    .catch((error) => {
      // Error retrieving value
      console.error("Error:", error);
    });


  const handleFetch = async () => {

    if (!token) {
      message.error("User is not authenticated.");
      return;
    }
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}`+"/seller/getProductsBySellerId";
      const res = await axios.post(
        url,
        { customerId: customerId },
        {headers: {
          Authorization:` Bearer ${token}`,
          "Content-Type": "application/json",
        }}
      );
      

      if (res.data.length === 0) {
        setNoData(true); // If no data, set noData to true
        console.log("length is 0");
        
      } else {
        setData(res.data); // Set data if there is a response
        setNoData(false); // Reset noData if data is present
        //console.log("no data");
        
      }
    } catch (error) {
      console.error("Error fetching products by seller ID:", error);
      setNoData(true); // If there's an error, also set noData to true
    } finally {
      setLoading(false); // End loading after fetching
    }
  };

  

  return (
    <View style={styles.mainContainer}>
      <StatusBar style='dark' backgroundColor='#fff' />
      <ScrollView>
        {data.map(product => (
          <ProductCard
            key={product.id}
            image={product.productImg}
            name={product.productName}
            price={product.price}
            unit={product.units}
            moisture={product.moisture}
            Organic={product.Organic}
            shelfLife={product.shelfLife}
            validity={product.validity}
            desc={product.desc}
            quality={product.packaging[3]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop:wp(5)
  },
});

export default ProductDisplay;
