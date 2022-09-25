import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Modal,
  Alert,
  Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
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
import AwesomeAlert from 'react-native-awesome-alerts'; // Alert
import LinearGradient from 'react-native-linear-gradient';
import BackMainScreen from '../CustomComponent/BackMainScreen';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');

export default function ProfileScreen({navigation}) {
  // redux
  const {
    namepatient,
    cmnd,
    namecarer,
    address,
    numberphone,
    uriImage,
    sex,
    birthday,
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // Alert
  // Check
  const checkCMND = cmnd => {
    if (cmnd.length == 10 || cmnd.length == 12) {
      dispatch(setCMNDofPatient(cmnd));
    } else {
    }
  };

  // effect
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      setModalVisible(false);
      setToggleCheckBox(true);
      setToggleCheckBox1(false);
      setToggleCheckBox2(false);
    });

    return unsubcribe;
  }, [navigation]);
  // Sex
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  // infor patient
  const [namePatientState, setNamepatientState] = useState(namepatient);
  const [birthdayState, setBirthdayState] = useState(birthday);
  const [sexState, setSexState] = useState(sex);
  const [cmndState, setCmndState] = useState(cmnd);
  const [adressState, setAdressState] = useState(address);
  const [nameCarerState, setNameCarerState] = useState(namecarer);
  const [numberphoneState, setNumberPhoneState] = useState(numberphone);

  const ChoosePhoto = () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('Cancelled!');
      }
      if (res.assets) {
        // const source = {uri: 'data: iamge/jpeg:base64,' + res.assets[0].uri};
        let stringUri = res.assets[0].uri;
        console.log('res = ', res.assets[0].uri);
        dispatch(setAvt(stringUri));
      }
    });
  };
  return (
    <View style={styles.container}>
      <BackMainScreen
        text="Hồ sơ"
        navigate={() => {
          navigation.navigate('Home');
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          marginTop: (height * 10) / 100,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          top: 0,
          bottom: 0,
        }}>
        <KeyboardAwareScrollView>
          <View style={{alignItems: 'center', width: (width * 100) / 100}}>
            <Pressable
              onPress={ChoosePhoto}
              style={{
                height: (height * 15.8) / 100,
                width: (width * 34.5) / 100,
                borderColor: '#D0D0D0',
                borderWidth: 3,
                borderRadius: 19,
                justifyContent: 'center',
                marginTop: (height * 5) / 100,
              }}>
              <Image
                source={{uri: uriImage}}
                style={{
                  height: (height * 15) / 100,
                  width: (width * 33) / 100,
                  borderRadius: 15,
                }}
              />
            </Pressable>
            <Text
              style={[
                {marginTop: (height * 2) / 100},
                styles.detailInformationStyle,
              ]}>
              ID: {namepatient}
            </Text>

            <TextInput
              style={styles.textInputStyle}
              multiline={true}
              mode="outlined"
              textAlign="Right"
              activeUnderlineColor="#A0A0A0"
              dense={false}
              label="Họ tên bệnh nhân"
              outlineColor="#D0D0D0"
              value={namePatientState}
              activeOutlineColor="#A0A0A0"
              placeholder="Nhập họ và tên"
              onChangeText={text => {
                //dispatch(setNamePatient(text));
                setNamepatientState(text);
              }}></TextInput>
            <TextInput
              style={styles.textInputStyle}
              mode="outlined"
              multiline={true}
              activeUnderlineColor="#A0A0A0"
              label="Ngày tháng năm sinh"
              placeholder="Nhập ngày tháng năm sinh (dd/mm/yy)"
              outlineColor="#D0D0D0"
              value={birthday}
              activeOutlineColor="#A0A0A0"
              onChangeText={text => {
                //dispatch(setBirthday(text));
              }}></TextInput>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.checkboxStyleView}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={() => {
                    setToggleCheckBox(true);
                    setToggleCheckBox1(false);
                    setToggleCheckBox2(false);
                    setSexState('Nam');
                    //dispatch(setSex('Nam'));
                  }}
                />
                <Text style={styles.detailInformationStyle}>Nam</Text>
              </View>
              <View style={styles.checkboxStyleView}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox1}
                  onValueChange={() => {
                    setToggleCheckBox(false);
                    setToggleCheckBox1(true);
                    setToggleCheckBox2(false);
                    //dispatch(setSex('Nữ'));
                    setSexState('Nữ');
                  }}
                />
                <Text style={styles.detailInformationStyle}>Nữ</Text>
              </View>
              <View style={styles.checkboxStyleView}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox2}
                  onValueChange={() => {
                    setToggleCheckBox(false);
                    setToggleCheckBox1(false);
                    setToggleCheckBox2(true);
                    // dispatch(setSex('Khác'));
                    setSexState('Khác');
                  }}
                />
                <Text style={styles.detailInformationStyle}>Khác</Text>
              </View>
            </View>
            <TextInput
              style={styles.textInputStyle}
              mode="outlined"
              multiline={true}
              activeUnderlineColor="#A0A0A0"
              label="CMND/CCCD"
              placeholder="Nhập CMND/CCCD"
              outlineColor="#D0D0D0"
              value={cmndState}
              activeOutlineColor="#A0A0A0"
              keyboardType="numeric"
              onChangeText={text => {
                //dispatch(setCMNDofPatient(text));
                setCmndState(text);
                let cmndTest = text.split('');
                console.log(cmndTest);
                for (let i = 0; i <= cmndTest.length; i++) {
                  if (
                    cmndTest[i] == '.' ||
                    cmndTest[i] == '-' ||
                    cmndTest[i] == ','
                  ) {
                    Alert.alert('Khong duoc co ky tu dac biet');
                  } else {
                    setCMNDofPatient(text);
                  }
                }
              }}></TextInput>
            <TextInput
              style={styles.textInputStyle}
              mode="outlined"
              multiline={true}
              activeUnderlineColor="#A0A0A0"
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              outlineColor="#D0D0D0"
              value={address}
              activeOutlineColor="#A0A0A0"
              onChangeText={text => {
                //dispatch(setAddress(text));
                setAdressState(text);
              }}></TextInput>
            <TextInput
              style={styles.textInputStyle}
              mode="outlined"
              multiline={true}
              activeUnderlineColor="#A0A0A0"
              label="Họ tên người chăm sóc"
              placeholder="Nhập họ tên người chăm sóc"
              outlineColor="#D0D0D0"
              value={namecarer}
              activeOutlineColor="#A0A0A0"
              onChangeText={text => {
                // dispatch(setNameCarer(text));
                setNameCarer(text);
              }}></TextInput>
            <TextInput
              style={styles.textInputStyle}
              mode="outlined"
              multiline={true}
              activeUnderlineColor="#A0A0A0"
              label="Số điện thoại người chăm sóc"
              placeholder="Nhập số điện thoại người chăm sóc"
              outlineColor="#D0D0D0"
              keyboardType="number-pad"
              value={numberphoneState}
              activeOutlineColor="#A0A0A0"
              onChangeText={text => {
                //dispatch(setNumberphone(text));
                setNumberPhoneState(text);
              }}></TextInput>

            <Pressable
              style={styles.modifyPressProfile}
              onPress={() => {
                checkCMND(cmndState);
              }}>
              {({pressed}) => (
                <LinearGradient
                  colors={
                    pressed
                      ? ['#F0F0F0', '#F0F0F0', '#F0F0F0']
                      : ['#0DE655', '#0EBF48', '#098934']
                  }
                  style={styles.linearGradient}>
                  <Text
                    style={[
                      {
                        fontSize: 18,
                        color: 'white',
                      },
                      styles.textStyles,
                    ]}>
                    Lưu thông tin
                  </Text>
                </LinearGradient>
              )}
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
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
  checkboxStyleView: {
    flexDirection: 'row',
    height: (height * 5) / 100,
    width: (width * 20) / 100,
    alignItems: 'center',
    marginTop: (height * 4) / 100,
    marginHorizontal: (width * 5) / 100,
  },
  detailInformationStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#205072',
  },
  textInputStyle: {
    width: (width * 90) / 100,
    height: (height * 8) / 100,
    marginTop: (height * 3) / 100,
    backgroundColor: 'white',
    color: '#205072',
  },
  modifyPressProfile: {
    height: (height * 7) / 100,
    width: (width * 60) / 100,
    backgroundColor: 'blue',
    borderRadius: 13,
    marginTop: (height * 10) / 100,
    marginBottom: (height * 4) / 100,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSearchTextStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#205072',
  },
  modalPressBackStyle: {
    alignItems: 'center',
    height: (height * 8) / 100,
    width: (width * 90) / 100,
    flexDirection: 'row',
  },
  ModalStyles: {
    height: (height * 35) / 100,
    width: (width * 90) / 100,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  modalViewStyles: {
    flex: 1,
    alignItems: 'center',
    marginTop: (height * 15) / 100,
  },
  modalPressChooseSex: {
    height: (height * 7) / 100,
    width: (width * 70) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#D0D0D0',
  },
});
