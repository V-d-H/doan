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
const homeScreenImage = require('../Image/homescreen.png');
const backgroundImage = require('../Image/background.png');
const doctorIcon = require('../Image/doctorIcon.png');
const profileImage = require('../Image/profile.png');
const PrescriptionIamge = require('../Image/PrescriptionIamge.png');

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={homeScreenImage}
        style={{height: (height * 37) / 100, width: (width * 100) / 100}}
      />
      <Text style={styles.textTitle}>Welcome to HEALTH CARE</Text>
      <View style={styles.viewFunction}>
        <Pressable
          onPress={() => navigation.navigate('Prescription')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#FFFAFA' : 'white',
            },
            styles.pressView,
          ]}>
          <Image source={doctorIcon} style={styles.imageFuntionStyle} />
          <Text style={styles.textFunction}>Xem đơn thuốc của bạn</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#FFFAFA' : 'white',
            },
            styles.pressView,
          ]}>
          <Image source={profileImage} style={styles.imageFuntionStyle} />
          <Text style={styles.textFunction}>Hồ sơ cá nhân của bạn</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Feedback')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#FFFAFA' : 'white',
            },
            styles.pressView,
          ]}>
          <Image source={PrescriptionIamge} style={styles.imageFuntionStyle} />
          <Text style={styles.textFunction}>Gửi phản hồi của bạn</Text>
        </Pressable>
        <Image source={backgroundImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textTitle: {
    fontFamily: 'Roboto',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginTop: (height * 20) / 100,
    position: 'absolute',
  },
  viewFunction: {
    width: (width * 95) / 100,
    height: (height * 45) / 100,
    alignItems: 'center',
    position: 'absolute',
    marginTop: (height * 30) / 100,
  },
  pressView: {
    height: (height * 10) / 100,
    width: (width * 90) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (height * 3) / 100,
    elevation: 4,
    borderRadius: 12,
    borderWidth: 0,
  },
  textFunction: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  imageFuntionStyle: {
    height: (height * 8) / 100,
    width: (width * 16) / 100,
    marginHorizontal: (width * 5) / 100,
  },
});
