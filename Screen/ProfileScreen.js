import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import RowBack from '../CustomComponent/RowBack';
import TextTicker from 'react-native-text-ticker';
import {useDispatch, useSelector} from 'react-redux';
import {
  setNamePatient,
  setAddress,
  setCMNDofPatient,
  setNameCarer,
  setNumberphone,
} from '../redux/action';

const avt = require('../Image/Avt.png');
const CMNDIcon = require('../Image/CMND.png');
const ContractIcon = require('../Image/contract.png');
const AddessIcon = require('../Image/Address.png');
const nameUserIcon = require('../Image/name.png');
const {width, height} = Dimensions.get('window');

export default function ProfileScreen({navigation}) {
  const {namepatient, cmnd, namecarer, address, numberphone} = useSelector(
    state => state.profile,
  );
  const dispatch = useDispatch();

  const [modifyProfile, setModify] = useState(false);
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      setModify(false);
    });
    return unsubcribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <RowBack
        navigate={() => {
          navigation.navigate('Home');
        }}
        text="HỒ SƠ CÁ NHÂN"
      />
      <Pressable
        style={styles.pressModify}
        onPress={() => {
          setModify(!modifyProfile);
          console.log(modifyProfile);
        }}>
        <Text
          style={
            modifyProfile
              ? [{color: 'red'}, styles.textModify]
              : [{color: 'blue'}, styles.textModify]
          }>
          {modifyProfile ? 'Xác nhận' : 'Chỉnh sửa'}
        </Text>
      </Pressable>
      <View style={{alignItems: 'center'}}>
        <Image source={avt} style={styles.avtImageStyle} />
        <TextInput
          style={
            modifyProfile
              ? [{color: 'red'}, styles.textProfile]
              : [{color: 'black'}, styles.textProfile]
          }
          onChangeText={text => {
            dispatch(setNamePatient(text));
          }}
          editable={modifyProfile}>
          {namepatient}
        </TextInput>
        <Text style={[{color: 'black'}, styles.textProfile]}>
          ID : 19446401
        </Text>

        <View style={[{height: (height * 48) / 100}, styles.viewProfile]}>
          <Text
            style={[
              {
                marginTop: (height * 2) / 100,
              },
              styles.styleTextTicker,
            ]}>
            Thông tin cá nhân của bạn
          </Text>
          <View style={styles.viewTitleBorder}>
            <View style={styles.viewDetail}>
              <Image source={CMNDIcon} style={styles.imageProfileStyle} />
              <Text style={styles.styleTextTicker}>CMND/CCCD:</Text>
            </View>

            <View style={styles.viewBorderInfor}>
              {modifyProfile ? (
                <View style={styles.viewTextinput}>
                  <TextInput
                    onChangeText={text => {
                      dispatch(setCMNDofPatient(text));
                    }}
                    style={styles.styleTextInput}>
                    {cmnd}
                  </TextInput>
                </View>
              ) : (
                <View style={styles.viewTextticker}>
                  <TextTicker
                    duration={3000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={1000}
                    style={styles.styleTextTicker}>
                    {cmnd}
                  </TextTicker>
                </View>
              )}
            </View>
          </View>

          <View style={styles.viewTitleBorder}>
            <View style={styles.viewDetail}>
              <Image source={AddessIcon} style={styles.imageProfileStyle} />
              <Text style={styles.styleTextTicker}>Địa chỉ:</Text>
            </View>
            <View style={styles.viewBorderInfor}>
              {modifyProfile ? (
                <View style={styles.viewTextinput}>
                  <TextInput
                    onChangeText={address => {
                      dispatch(setAddress(address));
                    }}
                    style={styles.styleTextInput}>
                    {address}
                  </TextInput>
                </View>
              ) : (
                <View style={styles.viewTextticker}>
                  <TextTicker
                    duration={3000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={1000}
                    style={styles.styleTextTicker}>
                    {address}
                  </TextTicker>
                </View>
              )}
            </View>
          </View>

          <View style={styles.viewTitleBorder}>
            <View style={styles.viewDetail}>
              <Image source={nameUserIcon} style={styles.imageProfileStyle} />
              <TextTicker
                duration={3000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}
                style={styles.styleTextTicker}>
                Họ và tên người chăm sóc:
              </TextTicker>
            </View>

            <View style={styles.viewBorderInfor}>
              {modifyProfile ? (
                <View style={styles.viewTextinput}>
                  <TextInput
                    onChangeText={namecarer => {
                      dispatch(setNameCarer(namecarer));
                    }}
                    style={styles.styleTextInput}>
                    {namecarer}
                  </TextInput>
                </View>
              ) : (
                <View style={styles.viewTextticker}>
                  <TextTicker
                    duration={3000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={1000}
                    style={styles.styleTextTicker}>
                    {namecarer}
                  </TextTicker>
                </View>
              )}
            </View>
          </View>

          <View style={styles.viewTitleBorder}>
            <View style={styles.viewDetail}>
              <Image source={ContractIcon} style={styles.imageProfileStyle} />
              <TextTicker
                duration={3000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}
                style={styles.styleTextTicker}>
                Số điện thoại liên lạc:
              </TextTicker>
            </View>

            <View style={styles.viewBorderInfor}>
              {modifyProfile ? (
                <View style={styles.viewTextinput}>
                  <TextInput
                    onChangeText={numberPhone => {
                      dispatch(setNumberphone(numberPhone));
                    }}
                    style={styles.styleTextInput}>
                    {numberphone}
                  </TextInput>
                </View>
              ) : (
                <View style={styles.viewTextticker}>
                  <TextTicker
                    duration={3000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={1000}
                    style={styles.styleTextTicker}>
                    {numberphone}
                  </TextTicker>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  avtImageStyle: {
    width: (width * 32.5) / 100,
    height: (height * 16.2) / 100,
    marginVertical: (height * 1) / 100,
  },
  textModify: {
    fontFamily: 'Roboto',
    fontSize: 17,
    fontWeight: 'bold',
  },
  pressModify: {
    height: (height * 4) / 100,
    width: (width * 25) / 100,
    marginLeft: (width * 70) / 100,
    marginBottom: (height * 2) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewProfile: {
    width: (width * 95) / 100,
    alignItems: 'center',
    marginTop: (height * 3) / 100,
    borderRadius: 8,
    borderWidth: 0,
    shadowColor: '#C0C0C0',
    elevation: 2,
  },
  imageProfileStyle: {
    height: (height * 3) / 100,
    width: (width * 6) / 100,
    marginLeft: (width * 3) / 100,
    marginRight: (width * 2) / 100,
  },
  textProfile: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewBorderInfor: {
    width: (width * 42) / 100,
    height: (height * 7) / 100,
    justifyContent: 'center',
    marginLeft: (width * 9) / 100,
  },
  styleTextTicker: {
    fontFamily: 'Roboto',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  styleTextInput: {
    fontFamily: 'Roboto',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
  },
  viewTextinput: {
    width: (width * 42) / 100,
    height: (height * 7) / 100,
    justifyContent: 'center',
    paddingLeft: (width * 3) / 100,
  },
  viewTitleBorder: {
    marginVertical: (height * 2) / 100,
    width: (width * 90) / 100,
    height: (height * 7) / 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTextticker: {
    paddingLeft: (width * 4) / 100,
    paddingBottom: (height * 0.2) / 100,
  },
  viewDetail: {
    flexDirection: 'row',
    width: (width * 40) / 100,
    height: (height * 7) / 100,
    alignItems: 'center',
  },
});
