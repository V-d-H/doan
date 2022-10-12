import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ModalAlert from '../CustomComponent/ModalAlert';
import axios from 'axios';
const {width, height} = Dimensions.get('window');

import {
  setNamePatient,
  setAddress,
  setCMNDofPatient,
  setNameCarer,
  setNumberphone,
  setAvt,
  setSex,
  setBirthday,
} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';

const feedbackicon = require('../ImageScreen/feedback.png');
const profileicon = require('../ImageScreen/profile.png');
const prescriptionicon = require('../ImageScreen/prescription.png');

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const [modalError, setmodalError] = useState(false);
  const {namepatient, uriImage, id} = useSelector(state => state.userReducer);
  const url = 'http://159.223.48.4:8002/duchoang/get-user/' +id;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get(url)
        .then(function (response) {
          console.log(response.data);
          console.log('image : ', response.data.details.image);
          dispatch(setNamePatient(response.data.details.name));
          dispatch(setNameCarer(response.data.details.namecarer));
          dispatch(setCMNDofPatient(response.data.details.cmmd));
          dispatch(setAddress(response.data.details.address));
          dispatch(setNumberphone(response.data.details.phone));
          dispatch(setSex(response.data.details.sex));
          dispatch(setAvt(response.data.details.image));
          const b = response.data.details.birthday;
          var parts = b.split('T');
          var birthday = parts[0];
          birthday = birthday.split('-');
          birthday = birthday[2] + '-' + birthday[1] + '-' + birthday[0];
          dispatch(setBirthday(birthday));
        })
        .catch(function (error) {
          setmodalError(true);
          console.log(error);
        })
        .then(function () {});
    });
    return unsubscribe;
  }, [dispatch, navigation, url]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setmodalError(false);
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.headerViewStyle}>
        <View
          style={{
            height: (height * 10) / 100,
            width: (width * 100) / 100,
            marginTop: (height * 3) / 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ModalAlert
            open={modalError}
            animationType="fade"
            close={() => {
              setmodalError(false);
            }}
            textTitle="Thông báo"
            textRemind="Lỗi kết nối"
            textRemind1="Vui lòng kiểm tra lại"
            comfirmTextButton="Xác nhận"
            saveTextButton="Đóng"
            save={() => {
              setmodalError(false);
            }}
          />
          <Pressable
            style={{
              height: (height * 8.7) / 100,
              width: (width * 17.75) / 100,
              borderRadius: 100,
              marginHorizontal: (width * 3) / 100,
              borderWidth: 3.5,
              borderColor: '#acfce8',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('Setting');
            }}>
            <Image
              source={{
                uri: uriImage,
              }}
              style={{
                height: (height * 8) / 100,
                width: (width * 16) / 100,
                borderRadius: 100,
                overflow: 'hidden',
              }}
            />
          </Pressable>
          <Text style={styles.textHeaderStyle}>{namepatient}</Text>
        </View>
      </View>
      <Text style={styles.texttitleStyle}>Chức năng</Text>
      <View style={styles.viewFunctionStyle}>
        <Pressable
          onPress={() => {
            navigation.navigate('Prescription');
          }}
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
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}
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
          onPress={() => {
            navigation.navigate('Feedback');
          }}
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
    fontSize: 22,
    color: '#205072',
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
