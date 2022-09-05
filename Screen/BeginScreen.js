import React from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const logo = require('../Image/logo.jpg');
const beginScreen = require('../Image/beginScreen.png');

export default function BeginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image source={logo} style={styles.logoIamge}></Image>
        <Text style={styles.textLogo}>HEALTH CARE</Text>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#B0C4DE' : 'blue',
            },
            styles.pressablePress,
          ]}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.textInPressable}>Đăng nhập</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#B0C4DE' : 'white',
            },
            styles.pressablePressRegister,
          ]}>
          <Text style={styles.textInPressableRegister}>Đăng ký</Text>
        </Pressable>
      </View>
      <Image source={beginScreen} style={styles.beginScreenImage}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#C6E2FF',
  },
  view: {
    backgroundColor: 'white',
    width: (width * 100) / 100,
    height: (height * 70) / 100,
    marginTop: (height * 35) / 100,
    alignItems: 'center',
  },
  beginScreenImage: {
    position: 'absolute',
    marginTop: (height * 3) / 100,
  },
  logoIamge: {
    width: (width * 35) / 100,
    height: (height * 17.5) / 100,
    marginTop: (height * 5) / 100,
  },
  textLogo: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: (height * 3) / 100,
  },
  pressablePress: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    width: (width * 60) / 100,
    height: (height * 9) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressablePressRegister: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    width: (width * 60) / 100,
    height: (height * 9) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (height * 2) / 100,
  },
  textInPressable: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  textInPressableRegister: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
