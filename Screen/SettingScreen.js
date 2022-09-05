import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
const avt = require('../Image/Avt.png');
const changePasswordIcon = require('../Image/changePassword.png');
const logoutIcon = require('../Image/Logout.png');

export default function SettingScreen({navigation}) {
  const {namepatient} = useSelector(state => state.profile);
  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.textTitle}>TÀI KHOẢN CỦA BẠN</Text>
      </View>
      <Image source={avt} style={styles.avtImageStyle} />
      <View style={{marginBottom: (height * 3) / 100}}>
        <Text style={styles.personalStyle}>{namepatient}</Text>
        <Text style={styles.personalStyle}>ID : 19446401</Text>
      </View>

      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#FFFFE0' : 'white',
          },
          styles.viewFuction,
        ]}>
        <Image source={changePasswordIcon} style={styles.ImageFunction} />

        <Text style={[{color: 'black'}, styles.textFunction]}>
          Đổi mật khẩu
        </Text>
      </Pressable>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#FFFFE0' : 'white',
          },
          styles.viewFuction,
        ]}
        onPress={() => navigation.navigate('BeginScreen')}>
        <Image source={logoutIcon} style={styles.ImageFunction} />
        <Text style={[styles.textFunction, {color: 'red'}]}>Đăng xuất</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  viewText: {
    width: (width * 80) / 100,
    height: (height * 7) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avtImageStyle: {
    width: (width * 32.5) / 100,
    height: (height * 16) / 100,
    marginVertical: (height * 2) / 100,
  },
  personalStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  viewFuction: {
    width: (width * 100) / 100,
    height: (height * 10) / 100,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 0,
    marginBottom: (height * 0.5) / 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFunction: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ImageFunction: {
    marginHorizontal: (width * 7) / 100,
  },
});
