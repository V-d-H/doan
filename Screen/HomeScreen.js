import React from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');

const feedbackicon = require('../ImageScreen/feedback.png');
const profileicon = require('../ImageScreen/profile.png');
const prescriptionicon = require('../ImageScreen/prescription.png');
export default function HomeScreen({navigation}) {
  const {namepatient} = useSelector(state => state.userReducer);
  return (
    <View style={styles.container}>
      <View style={styles.headerViewStyle}>
        <Pressable
          style={{
            height: (height * 10) / 100,
            width: (width * 100) / 100,
            marginTop: (height * 3) / 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: (height * 7) / 100,
              width: (width * 14) / 100,
              borderRadius: 100,
              marginHorizontal: (width * 3) / 100,
              borderWidth: 1,
            }}>
            <Image />
          </View>
          <Text style={styles.textHeaderStyle}>{namepatient}</Text>
        </Pressable>
        <Text></Text>
      </View>
      <Text style={styles.texttitleStyle}>Chức năng</Text>
      <View style={styles.viewFunctionStyle}>
        <Pressable
          style={[{backgroundColor: '#86BAF4'}, styles.pressFunctionStyle]}>
          <Image
            style={{
              marginTop: (height * 2) / 100,
            }}
            source={prescriptionicon}
          />
          <Text style={styles.textFunctionStyle}>Đơn thuốc</Text>
        </Pressable>
        <Pressable
          style={[{backgroundColor: '#86F4B9'}, styles.pressFunctionStyle]}>
          <Image
            style={{
              marginTop: (height * 2) / 100,
            }}
            source={profileicon}
          />
          <Text style={styles.textFunctionStyle}>Hồ sơ</Text>
        </Pressable>
        <Pressable
          style={[{backgroundColor: '#FC9E9E'}, styles.pressFunctionStyle]}>
          <Image
            style={{
              marginTop: (height * 2) / 100,
            }}
            source={feedbackicon}
          />
          <Text style={styles.textFunctionStyle}>Phản hồi</Text>
        </Pressable>
      </View>
      <Text style={styles.texttitleStyle}>Cẩm nang</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pressFunctionStyle: {
    height: (height * 25) / 100,
    width: (width * 29) / 100,
    marginHorizontal: (width * 2) / 100,
    borderRadius: 20,
    alignItems: 'center',
  },
  headerViewStyle: {
    backgroundColor: '#E0ECDE',
    height: (height * 25) / 100,
    width: (width * 100) / 100,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  textHeaderStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  texttitleStyle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#205072',
    marginRight: (width * 73) / 100,
    marginTop: (height * 5) / 100,
  },
  viewFunctionStyle: {
    height: (height * 30) / 100,
    width: (width * 100) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textFunctionStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'white',
    marginTop: (height * 7) / 100,
  },
});
