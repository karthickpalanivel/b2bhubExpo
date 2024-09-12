import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Animated,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";

const NavigationBar = () => {
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () =>{
    setPop(false);
    Animated.timing(icon_2,{
        toValue: 130,
        
    })
  }

  return (
    <View>
      <Animated.View style={[styles.button, { bottom: icon_1}]}>
        <TouchableOpacity>
          <Icon name="home" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.button, {}]}>
        <TouchableOpacity>
          <Icon name="home" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.button, {}]}>
        <TouchableOpacity>
          <Icon name="user" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({});
