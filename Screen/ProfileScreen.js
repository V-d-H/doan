import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import TextInputCustom from '../CustomComponent/TextinputCustom';
import RNImageConverter from 'react-native-image-converter';
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
import LinearGradient from 'react-native-linear-gradient';
import BackMainScreen from '../CustomComponent/BackMainScreen';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ModalAlert from '../CustomComponent/ModalAlert';
import TextTicker from 'react-native-text-ticker';
import ModalSucessFail from '../CustomComponent/ModalSucessFail';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

export default function ProfileScreen({navigation}) {
  // TextTicker
  const [textTickerLength, setTextTicker] = useState(false);
  const styleTextticker = StyleSheet.create({
    TextTickerStyle: {
      fontFamily: 'Roboto',
      fontSize: 18,
      color: '#205072',
    },
    pressViewStyle: {
      width: (width * 90) / 100,
      height: (height * 8) / 100,
      borderRadius: 8,
      paddingLeft: (width * 3) / 100,
      backgroundColor: 'white',
      borderWidth: 1,
      marginTop: (height * 2) / 100,
      justifyContent: 'center',
      flex: 1,
    },
    textTitle: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: 'black',
      fontWeight: 'normal',
    },
  });
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      if (address.length <= 38) {
        setTextTicker(true);
      } else {
        setTextTicker(false);
      }
    });
    return unsubcribe;
  });
  const TextTickerLength = () => {
    return (
      <View style={{flex: 1}}>
        <Pressable
          onPress={() => {
            setTextTicker(true);
          }}
          style={styleTextticker.pressViewStyle}>
          <TextTicker style={styleTextticker.TextTickerStyle}>
            {address}
          </TextTicker>
        </Pressable>
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            marginLeft: (width * 3) / 100,
          }}>
          <Text style={styleTextticker.textTitle}>?????a ch???</Text>
        </View>
      </View>
    );
  };
  // Check CMND
  const [checkCMNDtext, setCheckCMNDtext] = useState('');
  const checkCMND = cmnd => {
    checkCMNDStr(cmnd);
    checkSpecialStr(cmnd);
    if (cmnd.length == 0) {
      setCheckCMNDtext('Kh??ng ???????c ????? tr???ng m???c n??y');
      return false;
    } else {
      if (checkCMNDStr(cmnd) == false || checkSpecialStr(cmnd) == false) {
        setCheckCMNDtext('Kh??ng ch???a c??c k?? t??? ho???c k?? t??? ?????c bi???t');
        return false;
      } else {
        if (cmnd.length == 9 || cmnd.length == 12) {
          setCheckCMNDtext('');
        } else {
          setCheckCMNDtext('Chi???u d??i c???a CMND l?? 9 - CCCD l?? 12!');
          return false;
        }
      }
    }
  };
  const checkCMNDStr = cmnd => {
    let cmndStr = cmnd.split('');
    for (let i = 0; i < cmnd.length; i++) {
      if (/^[A-Za-z]+$/.test(cmndStr[i])) {
        return false;
      }
    }
  };
  const checkSpecialStr = cmnd => {
    var format = /[^\w\s\\\-]/;
    let cmndStr = cmnd.split('');
    for (let i = 0; i < cmnd.length; i++) {
      if (
        format.test(cmndStr[i]) ||
        cmndStr[i] == '-' ||
        cmndStr[i] == '_' ||
        cmndStr[i] == ' '
      ) {
        return false;
      }
    }
  };
  // Check PhoneNumber
  const [checkPhonetext, setCheckPhonetext] = useState('');
  const checkPhoneNumber = phone => {
    checkPhoneStr(phone);
    checkSpecialPhoneStr(phone);
    if (phone.length == 0) {
      setCheckPhonetext('Kh??ng ???????c ????? tr???ng m???c n??y');
      return false;
    } else if (checkFisrtNumber(phone) == false) {
      setCheckPhonetext('S??? ?????u ti??n ph???i l?? 0!');
      return false;
    } else {
      if (
        checkPhoneStr(phone) == false ||
        checkSpecialPhoneStr(phone) == false
      ) {
        setCheckPhonetext('Kh??ng ch???a c??c k?? t??? ho???c k?? t??? ?????c bi???t');
        return false;
      } else {
        if (phone.length == 10) {
          setCheckPhonetext('');
        } else {
          setCheckPhonetext('Chi???u d??i c???a s??? ??i???n tho???i ph???i l?? 10!');
          return false;
        }
      }
    }
  };
  const checkPhoneStr = phone => {
    let phoneStr = phone.split('');
    for (let i = 0; i < phone.length; i++) {
      if (/^[A-Za-z]+$/.test(phoneStr[i])) {
        return false;
      }
    }
  };
  const checkSpecialPhoneStr = phone => {
    var format = /[^\w\s\\\-]/;
    let phoneStr = phone.split('');
    for (let i = 0; i < phone.length; i++) {
      if (
        format.test(phoneStr[i]) ||
        phoneStr[i] == '-' ||
        phoneStr[i] == '_' ||
        phoneStr[i] == ' '
      ) {
        return false;
      }
    }
  };
  const checkFisrtNumber = phone => {
    let phoneStr = phone.split('');
    if (checkPhoneStr(phone) == false || checkSpecialPhoneStr(phone) == false) {
      return true;
    } else {
      if (phoneStr[0] != '0') {
        return false;
      }
    }
  };
  // Check date
  const [checkDateText, setCheckDateText] = useState('');
  const checkDateSpecial = date => {
    var format = /[^\w]/;
    var Slash = /[^-]/;
    let dateStr = date.split('');
    for (let i = 0; i < date.length; i++) {
      if (format.test(dateStr[i]) || dateStr[i] == '-' || dateStr[i] == '_') {
        if (Slash.test(dateStr[i])) {
          return false;
        }
      }
    }
  };
  const checkDateStr = date => {
    let dateStr = date.split('');
    for (let i = 0; i < date.length; i++) {
      if (/^[A-Za-z]+$/.test(dateStr[i])) {
        return false;
      }
    }
  };
  const checkDate = date => {
    if (date.length == 0) {
      setCheckDateText('Kh??ng ???????c ????? tr???ng m???c n??y');
      return false;
    } else {
      checkDateSpecial(date);
      checkDateStr(date);
      if (checkDateSpecial(date) == false || checkDateStr(date) == false) {
        setCheckDateText('Kh??ng ch???a c??c k?? t??? ho???c k?? t??? ?????c bi???t');
        return false;
      } else {
        checkFormDate(date);
      }
    }
  };
  const checkFormDate = date => {
    var parts = date.split('-');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
    if (!/^\d{1,2}\-\d{1,2}\-\d{4}$/.test(date)) {
      setCheckDateText('Vui l??ng nh???p ????ng theo d???ng DD-MM-YYYY');
      return false;
    } else {
      setCheckDateText('');
      checkDateMonthYear(day, month, year);
      if (checkDateMonthYear(day, month, year) == false) {
        setCheckDateText('B???n ???? nh???p sai ng??y th??ng n??m');
        return false;
      } else {
        setCheckDateText('');
      }
    }
  };
  const checkDateMonthYear = (day, month, year) => {
    if (year < 1000 || year > 3000) {
      return false;
    }
    if (month == 0 || month > 12) {
      return false;
    }
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }
    return day > 0 && day <= monthLength[month - 1];
  };

  //Check name
  const [checkNameText, setCheckNameText] = useState('');
  const [checkNameCarerText, setCheckNameCarerText] = useState('');
  const checkNameCarer = name => {
    checkNumberInText(name);
    checkNameSpecialStr(name);
    if (name.length == 0) {
      setCheckNameCarerText('Kh??ng ???????c ????? tr???ng m???c n??y');
      return false;
    } else {
      if (
        checkNumberInText(name) == false ||
        checkNameSpecialStr(name) == false
      ) {
        setCheckNameCarerText('Kh??ng ???????c ch???a s??? ho???c k?? t??? ?????c bi???t');
        return false;
      } else {
        setCheckNameCarerText('');
      }
    }
  };
  const checkName = name => {
    checkNumberInText(name);
    checkNameSpecialStr(name);
    if (name.length == 0) {
      setCheckNameText('Kh??ng ???????c ????? tr???ng m???c n??y');
      return false;
    } else {
      if (
        checkNumberInText(name) == false ||
        checkNameSpecialStr(name) == false
      ) {
        setCheckNameText('Kh??ng ???????c ch???a s??? ho???c k?? t??? ?????c bi???t');
        return false;
      } else {
        setCheckNameText('');
      }
    }
  };
  const checkNumberInText = name => {
    let nameStr = name.split('');
    for (let i = 0; i < name.length; i++) {
      if (/^[0-9]+$/.test(nameStr[i])) {
        return false;
      }
    }
  };
  const checkNameSpecialStr = name => {
    var format =
      /[^\sa-zA-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]/;
    let nameStr = name.split('');
    for (let i = 0; i < name.length; i++) {
      if (format.test(nameStr[i])) {
        return false;
      }
    }
  };
  // check adrress
  const [checkAddressText, setcheckAddressText] = useState('');
  const checkAddress = address => {
    if (address.length == 0) {
      setcheckAddressText('Kh??ng ???????c ????? tr???ng m???c n??y');
      return false;
    } else {
      if (checkAddressSpecialStr(address) == false) {
        setcheckAddressText('Kh??ng ch???a c??c k?? t??? ?????c bi???t');
        return false;
      } else {
        setcheckAddressText('');
      }
    }
  };
  const checkAddressSpecialStr = address => {
    var format =
      /[^a-z0-9A-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]/;
    let addressStr = address.split('');
    for (let i = 0; i < address.length; i++) {
      if (format.test(addressStr[i])) {
        if (/[^/,\s]/.test(addressStr[i])) {
          return false;
        }
      }
    }
  };
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
    id,
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  // dispatch inforamtion
  const saveChange = () => {
    dispatch(setNamePatient(namePatientState));
    dispatch(setNameCarer(nameCarerState));
    dispatch(setCMNDofPatient(cmndState));
    dispatch(setAddress(addressState));
    dispatch(setNumberphone(numberphoneState));
    dispatch(setSex(sexState));
    dispatch(setBirthday(birthdayState));
  };
  //cancel Save infomation
  const cancelSave = () => {
    setNamepatientState(namepatient);
    setCmndState(cmnd);
    setBirthdayState(birthday);
    setSexState(sex);
    setAddressState(address);
    setNameCarerState(namecarer);
    setNumberPhoneState(numberphone);
    setCheckCMNDtext('');
    setCheckDateText('');
    setCheckNameCarerText('');
    setCheckNameText('');
    setcheckAddressText('');
    setCheckPhonetext('');
  };
  // check sex
  const checkSex = sex => {
    if (sex == 0) {
      setToggleCheckBox(true);
      setToggleCheckBox1(false);
      setToggleCheckBox2(false);
    } else if (sex == 1) {
      setToggleCheckBox(false);
      setToggleCheckBox1(true);
      setToggleCheckBox2(false);
    } else {
      setToggleCheckBox(false);
      setToggleCheckBox1(false);
      setToggleCheckBox2(true);
    }
  };
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      checkSex(sex);
    });

    return unsubcribe;
  }, [navigation, sex]);
  // Sex
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);

  // state infor patient
  const [namePatientState, setNamepatientState] = useState(namepatient);
  const [birthdayState, setBirthdayState] = useState(birthday);
  const [sexState, setSexState] = useState(sex);
  const [cmndState, setCmndState] = useState(cmnd);
  const [addressState, setAddressState] = useState(address);
  const [nameCarerState, setNameCarerState] = useState(namecarer);
  const [numberphoneState, setNumberPhoneState] = useState(numberphone);
  // choose photo AVT
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
        // x??? l?? th??nh file png
        let stringUri = res.assets[0].uri;
        console.log('res = ', res.assets[0].uri);
        RNImageConverter.getPNG(stringUri, newFile => {
          console.log(newFile);
          //4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsND...
        });
        //dispatch(setAvt(stringUri));
      }
    });
  };
  // Block goBack when dont save modify text
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      setModalGoback(false);
      setModalSave(false);
      setmodalSuccess(false);
      setmodalCancel(false);
      setTextTicker(false);
    });

    return unsubcribe;
  }, [navigation]);
  const [modalGoback, setModalGoback] = useState(false);
  const [modalSave, setModalSave] = useState(false);
  const [modalSuccess, setmodalSuccess] = useState(false);
  const [modalCancel, setmodalCancel] = useState(false);
  //Textinput
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      setNameStyle(false);
      setdateStyle(false);
      setcmndStyle(false);
      setaddressStyle(false);
      setnamecarerStyle(false);
      setnumberStyle(false);
    });

    return unsubcribe;
  }, [navigation]);
  const [nameStyle, setNameStyle] = useState(false);
  const [dateStyle, setdateStyle] = useState(false);
  const [cmndStyle, setcmndStyle] = useState(false);
  const [addressStyle, setaddressStyle] = useState(false);
  const [namecarerStyle, setnamecarerStyle] = useState(false);
  const [numberStyle, setnumberStyle] = useState(false);

  // Icon alert
  const iconSuc = require('../ImageScreen/sucessIcon.png');
  const iconNofication = require('../ImageScreen/noficationIcon.png');
  const iconFail = require('../ImageScreen/FailIcon.png');
  // Edit profile
  const postEditProfile = async (
    id,
    name,
    cmnd,
    sex,
    address,
    namecarer,
    phone,
    image,
  ) =>
    new Promise((resolve, reject) => {
      var data = new FormData();
      data.append(id);
      data.append(name);
      data.append(sex);
      data.append(cmnd);
      //data.append(birthday);
      data.append(phone);
      data.append(namecarer);
      data.append(address);
      data.append({
        uri: image,
        name: 'userImage.png',
        type: 'image/png',
      });
      const url =
        'http://159.223.48.4:8002/duchoang/edit-user?idpatient=BN0&name=V%C5%A9%20%C4%90%E1%BB%A9c%20Ho%C3%A0ng&cmmd=272802164&address=25%2F12%2F30%20B%C3%B9i%20Quang%20L%C3%A0%20P12%20G%C3%B2%20V%E1%BA%A5p%20TPHCM&namecarer=V%C5%A9%20%C4%90%E1%BB%A9c%20Hu%C3%A2n&phone=0335527004&sex=0&birthday=2001-11-17T22%3A48%3A50.907303';
      return axios
        .post(url, data)
        .then(function (response) {
          resolve(response);
          console.log('Hoang');
        })
        .catch(function (error) {
          console.log('Hoang1');
          reject(error);
        })
        .then(function () {});
    });
  return (
    <View style={styles.container}>
      <BackMainScreen
        text="H??? s??"
        navigate={() => {
          if (
            namePatientState != namepatient ||
            birthdayState != birthday ||
            cmndState != cmnd ||
            sexState != sex ||
            addressState != address ||
            nameCarerState != namecarer ||
            numberphoneState != numberphone
          ) {
            setModalGoback(true);
          } else {
            navigation.navigate('Home');
          }
        }}
      />
      <ModalSucessFail
        open={modalSuccess}
        animationType="fade"
        close={() => {
          setmodalSuccess(false);
          setModalGoback(false);
          setModalSave(false);
        }}
        textTitle="Th??ng b??o"
        textRemind1="B???n ???? l??u th??ng tin th??nh c??ng!"
        comfirmTextButton="X??c nh???n"
        icon={iconSuc}
      />
      <ModalSucessFail
        open={modalCancel}
        animationType="fade"
        close={() => {
          setModalGoback(false);
          setModalSave(false);
          setmodalSuccess(false);
          setmodalCancel(false);
        }}
        textTitle="Th??ng b??o"
        textRemind1="H???y ch???nh s???a th??nh c??ng!"
        comfirmTextButton="X??c nh???n"
        icon={iconSuc}
      />
      <ModalAlert
        open={modalGoback}
        animationType="slide"
        close={() => {
          setModalGoback(false);
        }}
        textTitle="C???nh b??o"
        textRemind="B???n ch??a l??u th??ng tin !"
        textRemind1="Vui l??ng l??u th??ng tin"
        comfirmTextButton="X??c nh???n"
        saveTextButton="L??u"
        save={() => {
          if (
            checkCMND(cmndState) == false ||
            checkPhoneNumber(numberphoneState) == false ||
            checkDate(birthdayState) == false ||
            checkFormDate(birthdayState) == false ||
            checkName(namePatientState) == false ||
            checkNameCarer(nameCarerState) == false ||
            checkAddress(addressState) == false
          ) {
            setModalSave(true);
            setModalGoback(false);
          } else {
            saveChange();
            setmodalSuccess(true);
          }
        }}
        iconNofi={iconNofication}
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
              ID: {id}
            </Text>
            <TextInputCustom
              customInput={nameStyle}
              customInputText={nameStyle}
              onFocus={() => {
                setNameStyle(true);
              }}
              onBlur={() => {
                setNameStyle(false);
              }}
              value={namePatientState}
              onChangeText={text => {
                setNamepatientState(text);
                const nameFinal = text.normalize('NFC');
                checkName(nameFinal);
              }}
              text="H??? v?? t??n b???nh nh??n"
              placeholder="Nh???p h??? v?? t??n"
            />

            <Text style={styles.checktextStyles}>{checkNameText}</Text>
            <TextInputCustom
              customInput={dateStyle}
              customInputText={dateStyle}
              onFocus={() => {
                setdateStyle(true);
              }}
              onBlur={() => {
                setdateStyle(false);
              }}
              value={birthdayState}
              onChangeText={text => {
                setBirthdayState(text);
                checkDate(text);
              }}
              keyboardType="numeric"
              text="Ng??y th??ng n??m sinh"
              placeholder="Nh???p ng??y th??ng n??m sinh"
            />
            <Text style={styles.checktextStyles}>{checkDateText}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.checkboxStyleView}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={() => {
                    setToggleCheckBox(true);
                    setToggleCheckBox1(false);
                    setToggleCheckBox2(false);
                    setSexState(0);
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
                    setSexState(1);
                  }}
                />
                <Text style={styles.detailInformationStyle}>N???</Text>
              </View>
              <View style={styles.checkboxStyleView}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox2}
                  onValueChange={() => {
                    setToggleCheckBox(false);
                    setToggleCheckBox1(false);
                    setToggleCheckBox2(true);
                    setSexState(2);
                  }}
                />
                <Text style={styles.detailInformationStyle}>Kh??c</Text>
              </View>
            </View>
            <TextInputCustom
              customInput={cmndStyle}
              customInputText={cmndStyle}
              onFocus={() => {
                setcmndStyle(true);
              }}
              onBlur={() => {
                setcmndStyle(false);
              }}
              value={cmndState}
              onChangeText={text => {
                setCmndState(text);
                checkCMND(text);
              }}
              keyboardType="numeric"
              text="CMND/CCCD"
              placeholder="Nh???p CMND/CCCD"
            />
            <Text style={styles.checktextStyles}>{checkCMNDtext}</Text>
            {textTickerLength ? (
              <TextInputCustom
                customInput={addressStyle}
                customInputText={addressStyle}
                onFocus={() => {
                  setaddressStyle(true);
                }}
                autoFocus={textTickerLength}
                onBlur={() => {
                  setaddressStyle(false);
                  setTextTicker(false);
                }}
                submit={() => {
                  setTextTicker(false);
                }}
                value={addressState}
                onChangeText={text => {
                  setAddressState(text);
                  const adddressFinal = text.normalize('NFC');
                  checkAddress(adddressFinal);
                }}
                text="?????a ch???"
                placeholder="Nh???p ?????a ch???"
              />
            ) : (
              <TextTickerLength />
            )}
            <Text style={styles.checktextStyles}>{checkAddressText}</Text>
            <TextInputCustom
              customInput={namecarerStyle}
              customInputText={namecarerStyle}
              onFocus={() => {
                setnamecarerStyle(true);
              }}
              onBlur={() => {
                setnamecarerStyle(false);
              }}
              value={nameCarerState}
              onChangeText={text => {
                setNameCarerState(text);
                const nameFinal = text.normalize('NFC');
                checkNameCarer(nameFinal);
              }}
              text="H??? t??n ng?????i ch??m s??c"
              placeholder="Nh???p h??? t??n ng?????i ch??m s??c"
            />
            <Text style={styles.checktextStyles}>{checkNameCarerText}</Text>
            <TextInputCustom
              customInput={numberStyle}
              customInputText={numberStyle}
              onFocus={() => {
                setnumberStyle(true);
              }}
              onBlur={() => {
                setnumberStyle(false);
              }}
              value={numberphoneState}
              onChangeText={text => {
                setNumberPhoneState(text);
                checkPhoneNumber(text);
              }}
              keyboardType="numeric"
              text="S??? ??i???n tho???i li??n l???c"
              placeholder="Nh???p s??? ??i???n tho???i"
            />
            <Text style={styles.checktextStyles}>{checkPhonetext}</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={styles.modifyPressProfile}
                onPress={() => {
                  if (
                    checkCMND(cmndState) == false ||
                    checkPhoneNumber(numberphoneState) == false ||
                    checkDate(birthdayState) == false ||
                    checkFormDate(birthdayState) == false ||
                    checkName(namePatientState) == false ||
                    checkNameCarer(nameCarerState) == false ||
                    checkAddress(addressState) == false
                  ) {
                    setModalSave(true);
                    setModalGoback(false);
                  } else {
                    saveChange();
                    postEditProfile(
                      id,
                      namepatient,
                      cmnd,
                      sex,
                      address,
                      namecarer,
                      numberphone,
                      uriImage,
                    );
                    setmodalSuccess(true);
                  }
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
                      L??u th??ng tin
                    </Text>
                  </LinearGradient>
                )}
              </Pressable>
              <Pressable
                onPressOut={() => {
                  checkSex(sexState);
                  setmodalCancel(true);
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#F0F0F0' : 'white',
                    alignItems: 'center',
                    borderWidth: 1,
                  },
                  styles.modifyPressProfile,
                ]}
                onPressIn={cancelSave}>
                <Text
                  style={[
                    {
                      fontSize: 18,
                      color: 'black',
                    },
                    styles.textStyles,
                  ]}>
                  H???y ch???nh s???a
                </Text>
              </Pressable>
            </View>
            <ModalAlert
              open={modalSave}
              close={() => setModalSave(false)}
              animationType="slide"
              textTitle="C???nh b??o"
              textRemind="B???n ???? nh???p sai g?? ????"
              textRemind1="Vui l??ng ki???m tra l???i"
              comfirmTextButton="X??c nh???n"
              saveTextButton="????ng"
              save={() => {
                setModalSave(false);
              }}
              iconNofi={iconFail}
            />
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
  checktextStyles: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'red',
    width: (width * 80) / 100,
    marginRight: (width * 10) / 100,
    marginTop: (height * 1) / 100,
  },
  checkboxStyleView: {
    flexDirection: 'row',
    height: (height * 5) / 100,
    width: (width * 20) / 100,
    alignItems: 'center',
    marginTop: (height * 1) / 100,
    marginBottom: (height * 3) / 100,
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
    marginTop: (height * 1) / 100,
    backgroundColor: 'white',
    color: '#205072',
  },
  modifyPressProfile: {
    height: (height * 7) / 100,
    width: (width * 40) / 100,
    borderRadius: 13,
    marginTop: (height * 8) / 100,
    marginBottom: (height * 4) / 100,
    marginHorizontal: (width * 1) / 100,
    justifyContent: 'center',
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
