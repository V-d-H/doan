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
import LinearGradient from 'react-native-linear-gradient';
import BackMainScreen from '../CustomComponent/BackMainScreen';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ModalAlert from '../CustomComponent/ModalAlert';
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
        setCheckCMNDtext('Không chứa các ký tự hoặc ký tự đặc biệt');
        return false;
      } else {
        if (cmnd.length == 9 || cmnd.length == 12) {
          setCheckCMNDtext('');
        } else {
          setCheckCMNDtext('Chiều dài của CMND là 9 - CCCD là 12!');
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
        setCheckPhonetext('Không chứa các ký tự hoặc ký tự đặc biệt');
        return false;
      } else {
        if (phone.length == 10) {
          setCheckPhonetext('');
        } else {
          setCheckPhonetext('Chiều dài của số điện thoại phải là 10!');
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
    var Slash = /[^/]/;
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
      setCheckDateText('Không được để trống mục này');
      return false;
    } else {
      checkDateSpecial(date);
      checkDateStr(date);
      if (checkDateSpecial(date) == false || checkDateStr(date) == false) {
        setCheckDateText('Không chứa các ký tự hoặc ký tự đặc biệt');
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
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
      setCheckDateText('Vui lòng nhập đúng theo dạng DD/MM/YYYY');
      return false;
    } else {
      setCheckDateText('');
      checkDateMonthYear(day, month, year);
      if (checkDateMonthYear(day, month, year) == false) {
        setCheckDateText('Bạn đã nhập sai ngày tháng năm');
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
      setCheckNameCarerText('Không được để trống mục này');
      return false;
    } else {
      if (
        checkNumberInText(name) == false ||
        checkNameSpecialStr(name) == false
      ) {
        setCheckNameCarerText('Không được chứa số hoặc ký tự đặc biệt');
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
      setCheckNameText('Không được để trống mục này');
      return false;
    } else {
      if (
        checkNumberInText(name) == false ||
        checkNameSpecialStr(name) == false
      ) {
        setCheckNameText('Không được chứa số hoặc ký tự đặc biệt');
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
      /[^\sa-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]/;
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
      setcheckAddressText('Không được để trống mục này');
      return false;
    } else {
      if (checkAddressSpecialStr(address) == false) {
        setcheckAddressText('Không chứa các ký tự đặc biệt');
        return false;
      } else {
        setcheckAddressText('');
      }
    }
  };
  const checkAddressSpecialStr = address => {
    var format =
      /[^a-z0-9A-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]/;
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

  // infor patient
  const [namePatientState, setNamepatientState] = useState(namepatient);
  const [birthdayState, setBirthdayState] = useState(birthday);
  const [sexState, setSexState] = useState(sex);
  const [cmndState, setCmndState] = useState(cmnd);
  const [addressState, setAddressState] = useState(address);
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
  // Block goBack when dont save modify text
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      setModalGoback(false);
      setModalSave(false);
    });

    return unsubcribe;
  }, [navigation]);
  const [modalGoback, setModalGoback] = useState(false);
  const [modalSave, setModalSave] = useState(false);
  return (
    <View style={styles.container}>
      <BackMainScreen
        text="Hồ sơ"
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
      <ModalAlert
        open={modalGoback}
        close={() => {
          setModalGoback(false);
        }}
        textTitle="Cảnh báo"
        textRemind="Bạn chưa lưu thông tin!"
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
              ID:
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
                setNamepatientState(text);
                const nameFinal = text.normalize('NFC');
                checkName(nameFinal);
              }}
            />
            <Text style={styles.checktextStyles}>{checkNameText}</Text>
            <TextInput
              style={styles.textInputStyle}
              mode="outlined"
              multiline={true}
              activeUnderlineColor="#A0A0A0"
              label="Ngày tháng năm sinh"
              placeholder="Nhập ngày tháng năm sinh"
              outlineColor="#D0D0D0"
              value={birthdayState}
              activeOutlineColor="#A0A0A0"
              onChangeText={text => {
                setBirthdayState(text);
                checkDate(text);
              }}
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
                    setSexState(2);
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
                setCmndState(text);
                console.log(text);
                checkCMND(text);
              }}
            />
            <Text style={styles.checktextStyles}>{checkCMNDtext}</Text>
            <TextInput
              style={styles.textInputStyle}
              mode="outlined"
              multiline={true}
              activeUnderlineColor="#A0A0A0"
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              outlineColor="#D0D0D0"
              value={addressState}
              activeOutlineColor="#A0A0A0"
              onChangeText={text => {
                setAddressState(text);
                const adddressFinal = text.normalize('NFC');
                checkAddress(adddressFinal);
              }}
            />
            <Text style={styles.checktextStyles}>{checkAddressText}</Text>
            <TextInput
              style={styles.textInputStyle}
              mode="outlined"
              multiline={true}
              activeUnderlineColor="#A0A0A0"
              label="Họ tên người chăm sóc"
              placeholder="Nhập họ tên người chăm sóc"
              outlineColor="#D0D0D0"
              value={nameCarerState}
              activeOutlineColor="#A0A0A0"
              onChangeText={text => {
                setNameCarerState(text);
                const nameFinal = text.normalize('NFC');
                checkNameCarer(nameFinal);
              }}
            />
            <Text style={styles.checktextStyles}>{checkNameCarerText}</Text>
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
                setNumberPhoneState(text);
                checkPhoneNumber(text);
              }}
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
                  } else {
                    saveChange();
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
                      Lưu thông tin
                    </Text>
                  </LinearGradient>
                )}
              </Pressable>
              <Pressable
                onPressOut={() => {
                  checkSex(sexState);
                }}
                style={styles.modifyPressProfile}
                onPressIn={cancelSave}>
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
                      Hủy chỉnh sửa
                    </Text>
                  </LinearGradient>
                )}
              </Pressable>
            </View>
            <ModalAlert
              open={modalSave}
              close={() => setModalSave(false)}
              textTitle="Cảnh báo"
              textRemind="Bạn đã nhập sai gì đó"
              textRemind1="Vui lòng kiểm tra lại"
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
    backgroundColor: 'blue',
    borderRadius: 13,
    marginTop: (height * 8) / 100,
    marginBottom: (height * 4) / 100,
    marginHorizontal: (width * 1) / 100,
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
