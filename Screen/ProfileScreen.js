import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Image,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');

export default function ProfileScreen({navigation}) {
  // Alert
  // Check CMND
  const [checkCMNDtext, setCheckCMNDtext] = useState('');
  const checkCMND = cmnd => {
    checkCMNDStr(cmnd);
    checkSpecialStr(cmnd);
    if (cmnd.length == 0) {
      setCheckCMNDtext('Không được để trống mục này');
      return false;
    } else {
      if (checkCMNDStr(cmnd) == false || checkSpecialStr(cmnd) == false) {
        setCheckCMNDtext('Không chứa các ký tự và ký tự đặc biệt');
      } else {
        if (cmnd.length == 9 || cmnd.length == 12) {
          setCheckCMNDtext('');
        } else {
          setCheckCMNDtext('Chiều dài của CMND là 9 - CCCD là 12!');
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
      setCheckPhonetext('Không được để trống mục này');
      return false;
    } else if (checkFisrtNumber(phone) == false) {
      setCheckPhonetext('Số đầu tiên phải là 0!');
      return false;
    } else {
      if (
        checkPhoneStr(phone) == false ||
        checkSpecialPhoneStr(phone) == false
      ) {
        setCheckPhonetext('Không chứa các ký tự và ký tự đặc biệt');
      } else {
        if (phone.length == 10) {
          setCheckPhonetext('');
        } else {
          setCheckPhonetext('Chiều dài của số điện thoại phải là 10!');
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
    var format = /[^\w\s\\\-]/;
    let dateStr = date.split('');
    for (let i = 0; i < date.length; i++) {
      if (
        dateStr[0] == '/' ||
        dateStr[1] == '/' ||
        dateStr[3] == '/' ||
        dateStr[4] == '/' ||
        dateStr[6] == '/' ||
        dateStr[7] == '/' ||
        dateStr[8] == '/' ||
        dateStr[9] == '/'
      ) {
        return 1;
      }
      if (dateStr[2] == '/' || dateStr[5] == '/') {
        setCheckDateText('');
      } else if (
        format.test(dateStr[i]) ||
        dateStr[i] == '-' ||
        dateStr[i] == '_' ||
        dateStr[i] == ' '
      ) {
        return false;
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
      setCheckDateText('Không được để trống mục này');
    } else {
      checkDateSpecial(date);
      checkDateStr(date);
      if (checkDateSpecial(date) == false || checkDateStr(date) == false) {
        setCheckDateText('Không chứa các ký tự và ký tự đặc biệt');
        return false;
      } else {
        checkFormDate(date);
      }
    }
  };
  const checkFormDate = date => {
    var parts = date.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    if (!/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/.test(date)) {
      setCheckDateText('Vui lòng nhập đúng theo dạng DD/MM/YYYY');
      return false;
    } else {
      setCheckDateText('');
      checkDateMonthYear(day, month, year, parts);
      if (checkDateMonthYear(day, month, year, parts) == false) {
        setCheckDateText('Bạn đã nhập sai ngày tháng năm');
        return false;
      } else {
        setCheckDateText('');
        addZeroDate(day, month, year, parts); // Làm lại
      }
    }
  };
  const checkDateMonthYear = (day, month, year, parts) => {
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
  const addZeroDate = (day, month, year, parts) => {
    if (day > 0 && day < 10) {
      day = '0' + day;
    } else {
      day = day;
    }
    if (month > 0 && month < 10) {
      month = '0' + month;
    } else {
      month = month;
    }
    year = year;
    day = day.toString(10);
    month = month.toString(10);
    year = year.toString(10);
    var a = day + '/' + month + '/' + year;
    console.log(a);
    setBirthdayState(a);
    setCheckDateText('');
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
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  // làm nút quay lại và hiện thị thông báo có thay đổi không?
  // effect
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      setToggleCheckBox(true);
      setToggleCheckBox1(false);
      setToggleCheckBox2(false);
      setCheckCMNDtext('');
    });

    return unsubcribe;
  }, [navigation]);
  // Sex
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);

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
              value={birthdayState}
              activeOutlineColor="#A0A0A0"
              onChangeText={text => {
                setBirthdayState(text);
                //  console.log(text.length);
                checkDate(text);
                //checkDateStr(text);
              }}></TextInput>
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
                console.log(text);
                checkCMND(text);
              }}></TextInput>
            <Text style={styles.checktextStyles}>{checkCMNDtext}</Text>
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
                checkPhoneNumber(text);
              }}></TextInput>
            <Text style={styles.checktextStyles}>{checkPhonetext}</Text>
            <Pressable
              style={styles.modifyPressProfile}
              onPress={() => {
                console.log('Bien state', cmndState);
                console.log('length state', cmndState.length);
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
