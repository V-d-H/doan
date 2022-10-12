import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import RowBack from '../CustomComponent/RowBack';
import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import ModalAlert from '../CustomComponent/ModalAlert';
import {useDispatch} from 'react-redux';
import {setStatusAPI, setId} from '../redux/action';
import axios from 'axios';
import ModalSucessFail from '../CustomComponent/ModalSucessFail';
const {width, height} = Dimensions.get('window');
const openEye = require('../ImageScreen/hiddenPW.png');
const offEye = require('../ImageScreen/hiddenPWoff.png');
const rowBackImage = require('../ImageScreen/rowBack.png');
const loginImage = require('../ImageScreen/LoginScreenImage.png');
export default function LoginScreen({navigation}) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [CMND, setCMND] = useState('');

  // check email
  const checkAccount = acc => {
    var format = /[^a-z0-9A-Z]/;
    let accStr = acc.split('');
    for (let i = 0; i < acc.length; i++) {
      if (format.test(accStr[i])) {
        if (/[^\s]/.test(accStr[i])) {
          return false;
        }
      }
      if (/[\s]/.test(accStr[i])) {
        return 1;
      }
    }
  };
  const onChangeText = text => {
    checkAccount(text);
    if (checkAccount(text) == false) {
      setAccountText('Không được chứa các ký hiệu đặc biệt');
      return false;
    } else if (checkAccount(text) == 1) {
      setAccountText('Không chứa khoảng trắng');
      return false;
    } else {
      setAccountText('');
    }
  };
  // Check PWD
  const checkPWD = text => {
    var format = /[^a-zA-Z0-9\s]/;
    let textStr = text.split('');
    for (let i = 0; i < text.length; i++) {
      if (format.test(textStr[i])) {
        return false;
      }
      if (/[\s]/.test(textStr[i])) {
        return 1;
      }
    }
  };
  const onChangeTextPWD = text => {
    checkPWD(text);
    if (checkPWD(text) == false) {
      setPWDText('Không được chứa các ký hiệu đặc biệt');
      return false;
    } else if (checkPWD(text) == 1) {
      setPWDText('Không chứa khoảng trắng');
      return false;
    } else {
      setPWDText('');
    }
  };
  //check CMND
  const checkCMND = cmnd => {
    checkCMNDStr(cmnd);
    checkSpecialStr(cmnd);
    if (cmnd.length == 0) {
      setCMNDText('');
    } else {
      if (checkCMNDStr(cmnd) == false || checkSpecialStr(cmnd) == false) {
        setCMNDText('Không chứa các ký tự hoặc ký tự đặc biệt');
        return false;
      } else {
        if (cmnd.length == 9 || cmnd.length == 12) {
          setCMNDText('');
        } else {
          setCMNDText('Chiều dài của CMND là 9 - CCCD là 12!');
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setAccountText('');
      setPWDText('');
      setCMNDText('');
    });
    return unsubscribe;
  }, [navigation]);
  // State of input
  const [accoutnText, setAccountText] = useState('');
  const [PWDtext, setPWDText] = useState('');
  const [cmmdText, setCMNDText] = useState('');
  //redux
  const dispatch = useDispatch();
  // Axios search
  const [searchAcc, setsearchAcc] = useState('');
  const [searchPWD, setsearchPWD] = useState('');
  const getApiList = async cmnd => {
    const url = 'http://159.223.48.4:8002/duchoang/search-account/' + cmnd;
    axios
      .get(url)
      .then(function (response) {
        // xử trí khi thành công
        setsearchPWD(response.data.details.pwd);
        setsearchAcc(response.data.details.idpatient);
        dispatch(setStatusAPI(response.data.status));
        if (response.data.status == true) {
          setmodalsuccesSearch(true);
        } else {
          setmodalFailSearch(true);
        }
      })
      .catch(function (error) {
        // xử trí khi bị lỗi
        setmodalError(true);
        console.log(error);
      })
      .then(function () {});
  };
  // Api Login
  const getApiLogin = async (acc, pwd) => {
    const url = 'http://159.223.48.4:8002/duchoang/auth/login-patient';
    axios
      .post(url, {
        idpatient: acc,
        pwd: pwd,
      })
      .then(function (response) {
        if (response.data.status == true) {
          setmodalFail(false);
          dispatch(setStatusAPI(1));
          dispatch(setId(response.data.id));
          navigation.navigate('Home');
        } else {
          dispatch(setStatusAPI(0));
          setmodalFail(true);
        }
      })
      .catch(function (error) {
        setmodalError(true);
        console.log(error);
      })
      .then(function () {});
  };
  //Alert
  const [modalFail, setmodalFail] = useState(false);
  const [modalFailSearch, setmodalFailSearch] = useState(false);
  const [modalsuccesSearch, setmodalsuccesSearch] = useState(false);
  const [modalError, setmodalError] = useState(false);
  const [modalErrorSpace, setmodalErrorSpace] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setAccount('BN0');
      setPassword('123456789');
      setModalVisible(false);
      setCMND('');
      setmodalFail(false);
      setmodalFailSearch(false);
      setmodalsuccesSearch(false);
      setmodalError(false);
      setmodalErrorSpace(false);
    });
    return unsubscribe;
  }, [navigation]);
  // Icon Alert
  const iconSuc = require('../ImageScreen/sucessIcon.png');
  const iconNofication = require('../ImageScreen/noficationIcon.png');
  const iconFail = require('../ImageScreen/FailIcon.png');
  return (
    <View style={styles.container}>
      <RowBack
        navigate={() => {
          navigation.navigate('BeginScreen');
        }}
        text="Đăng nhập"
        textRemind="Vui lòng điền thông tin đăng nhập"
      />
      <ModalAlert
        open={modalErrorSpace}
        animationType="fade"
        close={() => {
          setmodalErrorSpace(false);
        }}
        textTitle="Thông báo"
        textRemind="Không được để trống"
        textRemind1="tài khoản mật khẩu"
        comfirmTextButton="Xác nhận"
        saveTextButton="Đóng"
        save={() => {
          setmodalErrorSpace(false);
        }}
        iconNofi={iconNofication}
      />
      <ModalSucessFail
        open={modalError}
        animationType="fade"
        close={() => {
          setmodalError(false);
        }}
        textTitle="Thông báo"
        textRemind1="Lỗi kết nối vui lòng kiểm tra lại"
        comfirmTextButton="Xác nhận"
        icon={iconFail}
      />
      <ModalSucessFail
        open={modalsuccesSearch}
        animationType="fade"
        close={() => {
          setmodalsuccesSearch(false);
        }}
        textTitle="Thông báo"
        textRemind1="Tra cứu thành công"
        comfirmTextButton="Xác nhận"
        icon={iconSuc}
      />
      <ModalAlert
        open={modalFail}
        animationType="fade"
        close={() => {
          setmodalFail(false);
        }}
        textTitle="Thông báo"
        textRemind="Sai thông tin tài khoản"
        textRemind1="hoặc mật khẩu!"
        comfirmTextButton="Xác nhận"
        saveTextButton="Đóng"
        save={() => {
          setmodalFail(false);
        }}
        iconNofi={iconFail}
      />
      <ModalSucessFail
        open={modalFailSearch}
        animationType="fade"
        close={() => {
          setmodalFailSearch(false);
        }}
        textTitle="Thông báo"
        textRemind1="Tra cứu thất bại"
        comfirmTextButton="Xác nhận"
        icon={iconFail}
      />
      <TextInput
        style={styles.textInputStyle}
        mode="outlined"
        activeUnderlineColor="#A0A0A0"
        label="Nhập tài khoản"
        placeholder="Nhập tài khoản"
        value={account}
        dense={false}
        onChangeText={text => {
          setAccount(text);
          onChangeText(text);
        }}
        outlineColor="#D0D0D0"
        activeOutlineColor="#A0A0A0"
      />
      <Text style={styles.textWarning}>{accoutnText}</Text>
      <TextInput
        style={styles.textInputStyle}
        mode="outlined"
        activeUnderlineColor="#A0A0A0"
        label="Nhập mật khẩu"
        placeholder="Nhập mật khẩu"
        onChangeText={text => {
          setPassword(text);
          onChangeTextPWD(text);
        }}
        value={password}
        outlineColor="#D0D0D0"
        activeOutlineColor="#A0A0A0"
        secureTextEntry={showPassword}
        right={
          <TextInput.Icon
            name={showPassword ? offEye : openEye}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            style={{marginTop: (height * 2) / 100}}
          />
        }
      />
      <Text style={styles.textWarning}>{PWDtext}</Text>
      <Pressable
        onPress={() => {
          if (account.length == 0 || password.length == 0) {
            setmodalErrorSpace(true);
          } else {
            if (checkAccount(account) == false || checkPWD(password) == false) {
              setmodalFail(true);
            } else {
              getApiLogin(account, password);
            }
          }
        }}
        style={styles.loginPressStyle}>
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
              Đăng nhập
            </Text>
          </LinearGradient>
        )}
      </Pressable>
      <Pressable
        style={styles.SearchPressStyle}
        onPress={() => setModalVisible(true)}>
        {({pressed}) => (
          <Text
            style={[
              {
                fontSize: 15,
                color: pressed ? '#A0A0A0' : '#68B2A0',
              },
              styles.textStyles,
            ]}>
            Tra cứu tài khoản của bạn
          </Text>
        )}
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(false);
            setCMND('');
            setsearchAcc('');
            setsearchPWD('');
          }}
          style={{flex: 1}}>
          <View style={styles.modalViewStyles}>
            {/* them 1 Pressable */}
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.ModalStyles}>
              <Pressable
                style={styles.modalPressBackStyle}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Image
                  source={rowBackImage}
                  style={{
                    height: (height * 2) / 100,
                    width: (width * 2) / 100,
                    marginLeft: (width * 5) / 100,
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: '#205072',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    marginLeft: (width * 30) / 100,
                  }}>
                  Tra cứu
                </Text>
              </Pressable>

              <Text style={styles.modalSearchTextStyle}>
                Tài khoản: {searchAcc}
              </Text>
              <Text style={styles.modalSearchTextStyle}>
                Mật khẩu: {searchPWD}
              </Text>
              <Text style={styles.modalTextRemid}>
                Nhập CMND/CCCD của bạn để tra cứu
              </Text>
              <TextInput
                style={styles.textInputStyleModal}
                mode="outlined"
                activeUnderlineColor="#A0A0A0"
                label="Nhập CMND"
                value={CMND}
                onChangeText={text => {
                  setCMND(text);
                  checkCMND(text);
                }}
                outlineColor="#D0D0D0"
                activeOutlineColor="#A0A0A0"
                keyboardType="numeric"
              />
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 14,
                  color: 'red',
                  marginTop: (height * 1) / 100,
                }}>
                {cmmdText}
              </Text>
              <Pressable
                onPress={() => {
                  if (checkCMND(CMND) == false || CMND.length == 0) {
                    setmodalFailSearch(true);
                  } else {
                    getApiList(CMND);
                  }
                }}
                style={styles.modalComfirmSearch}>
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
                      Xác nhận
                    </Text>
                  </LinearGradient>
                )}
              </Pressable>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      <Image source={loginImage} style={{marginTop: (height * 7) / 100}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textWarning: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'red',
    width: (width * 80) / 100,
    marginRight: (width * 10) / 100,
    marginTop: (height * 1) / 100,
  },
  textInputStyle: {
    width: (width * 90) / 100,
    height: (height * 8) / 100,
    marginTop: (height * 3) / 100,
    backgroundColor: 'white',
  },
  textSupportoutPress: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#A0A0A0',
    marginBottom: (height * 5) / 100,
  },
  textInPressable: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A0A0A0',
  },
  textSupportinPress: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#7BE495',
    marginBottom: (height * 5) / 100,
  },
  loginPressStyle: {
    height: (height * 7) / 100,
    width: (width * 60) / 100,
    backgroundColor: 'blue',
    borderRadius: 13,
    marginTop: (height * 10) / 100,
    marginBottom: (height * 2) / 100,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPressBackStyle: {
    alignItems: 'center',
    height: (height * 8) / 100,
    width: (width * 90) / 100,
    flexDirection: 'row',
  },
  ModalStyles: {
    height: (height * 60) / 100,
    width: (width * 90) / 100,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  StartedPressStyle: {
    height: (height * 7) / 100,
    width: (width * 60) / 100,
    backgroundColor: 'blue',
    borderRadius: 13,
    marginTop: (height * 10) / 100,
    marginBottom: (height * 4) / 100,
  },
  modalSearchTextStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'black',
    marginVertical: (height * 1) / 100,
    height: (height * 5) / 100,
    width: (width * 80) / 100,
  },
  modalComfirmSearch: {
    height: (height * 7) / 100,
    width: (width * 60) / 100,
    backgroundColor: 'blue',
    borderRadius: 13,
    marginTop: (height * 5) / 100,
  },
  modalTextRemid: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#7BE495',
  },
  modalViewStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    fontFamily: 'Roboto',
  },
  textInputStyleModal: {
    width: (width * 65) / 100,
    height: (height * 8) / 100,
    marginTop: (height * 3) / 100,
    backgroundColor: 'white',
  },
});
