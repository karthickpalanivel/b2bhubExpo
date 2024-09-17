// Home.js
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProductCard from './productCard'; 

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
  return (
    <View style={styles.mainContainer}>
      <StatusBar style='dark' backgroundColor='#fff' />
      <ScrollView>
        {products.map(product => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            unit={product.unit}
            moisture={product.moisture}
            Organic={product.Organic}
            shelfLife={product.shelfLife}
            validity={product.validity}
            desc={product.desc}
            quality={product.quality}
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
