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
const rowBackImage = require('../ImageScreen/rowBack.png');
const {width, height} = Dimensions.get('window');

export default function ProfileScreen({navigation}) {
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

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      setModalVisible(false);
      setMutilienBool(true);
      setToggleCheckBox(true);
      setToggleCheckBox1(false);
      setToggleCheckBox2(false);
    });

    return unsubcribe;
  }, [navigation]);
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);

  const [gralaryPhoto, setGralary] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [MutilineBool, setMutilienBool] = useState(true);

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
        setGralary(res.assets[0].uri);
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
      <ScrollView style={styles.ViewDetailProfile}>
        <View style={{alignItems: 'center'}}>
          <Pressable
            onPress={ChoosePhoto}
            style={{
              height: (height * 15) / 100,
              width: (width * 33) / 100,
              backgroundColor: 'blue',
              marginTop: (height * 5) / 100,
              borderRadius: 15,
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
            multiline={MutilineBool}
            scrollEnabled={false}
            mode="outlined"
            textAlign="Right"
            activeUnderlineColor="#A0A0A0"
            label="Họ tên bệnh nhân"
            outlineColor="#D0D0D0"
            value={namePatientState}
            activeOutlineColor="#A0A0A0"
            onFocus={() => {
              setMutilienBool(false);
              console.log(MutilineBool);
            }}
            onBlur={() => {
              setMutilienBool(true);
              console.log(MutilineBool);
            }}
            onChangeText={text => {
              //dispatch(setNamePatient(text));
              setNamepatientState(text);
            }}></TextInput>
          <TextInput
            style={styles.textInputStyle}
            mode="outlined"
            multiline={MutilineBool}
            scrollEnabled={false}
            activeUnderlineColor="#A0A0A0"
            label="Ngày tháng năm sinh"
            outlineColor="#D0D0D0"
            value={birthday}
            activeOutlineColor="#A0A0A0"
            onFocus={() => {
              setMutilienBool(false);
              console.log(MutilineBool);
            }}
            onBlur={() => {
              setMutilienBool(true);
              console.log(MutilineBool);
            }}
            onChangeText={text => {
              dispatch(setBirthday(text));
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
            multiline={MutilineBool}
            scrollEnabled={false}
            activeUnderlineColor="#A0A0A0"
            label="CMND/CCCD"
            outlineColor="#D0D0D0"
            value={cmnd}
            activeOutlineColor="#A0A0A0"
            onFocus={() => {
              setMutilienBool(false);
              console.log(MutilineBool);
            }}
            onBlur={() => {
              setMutilienBool(true);
              console.log(MutilineBool);
            }}
            keyboardType="numeric"
            onChangeText={text => {
              //dispatch(setCMNDofPatient(text));
              setCmndState(text);
            }}></TextInput>
          <TextInput
            style={styles.textInputStyle}
            mode="outlined"
            multiline={MutilineBool}
            scrollEnabled={false}
            activeUnderlineColor="#A0A0A0"
            label="Địa chỉ"
            outlineColor="#D0D0D0"
            value={address}
            activeOutlineColor="#A0A0A0"
            onFocus={() => {
              setMutilienBool(false);
              console.log(MutilineBool);
            }}
            onBlur={() => {
              setMutilienBool(true);
              console.log(MutilineBool);
            }}
            onChangeText={text => {
              //dispatch(setAddress(text));
              setAdressState(text);
            }}></TextInput>
          <TextInput
            style={styles.textInputStyle}
            mode="outlined"
            multiline={MutilineBool}
            scrollEnabled={false}
            activeUnderlineColor="#A0A0A0"
            label="Họ tên người chăm sóc"
            outlineColor="#D0D0D0"
            value={namecarer}
            activeOutlineColor="#A0A0A0"
            onFocus={() => {
              setMutilienBool(false);
              console.log(MutilineBool);
            }}
            onBlur={() => {
              setMutilienBool(true);
              console.log(MutilineBool);
            }}
            onChangeText={text => {
              // dispatch(setNameCarer(text));
              setNameCarer(text);
            }}></TextInput>
          <TextInput
            style={styles.textInputStyle}
            mode="outlined"
            multiline={MutilineBool}
            scrollEnabled={false}
            activeUnderlineColor="#A0A0A0"
            label="Số điện thoại người chăm sóc"
            outlineColor="#D0D0D0"
            keyboardType="number-pad"
            value={numberphoneState}
            activeOutlineColor="#A0A0A0"
            onFocus={() => {
              setMutilienBool(false);
              console.log(MutilineBool);
            }}
            onBlur={() => {
              setMutilienBool(true);
              console.log(MutilineBool);
            }}
            onChangeText={text => {
              //dispatch(setNumberphone(text));
              setNumberPhoneState(text);
            }}></TextInput>
          <Pressable
            style={styles.modifyPressProfile}
            onPress={() => {
              dispatch(setNamePatient(namePatientState));
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
      </ScrollView>
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
  ViewDetailProfile: {
    height: (height * 80) / 100,
    width: (width * 100) / 100,
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    position: 'absolute',
    marginTop: (height * 8) / 100,
    flex: 1,
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
