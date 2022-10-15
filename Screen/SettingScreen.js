import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import BackMainScreen from '../CustomComponent/BackMainScreen';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setPWDPatient} from '../redux/action';
import axios from 'axios';

const openEye = require('../ImageScreen/hiddenPW.png');
const offEye = require('../ImageScreen/hiddenPWoff.png');
const {width, height} = Dimensions.get('window');
const rowBackImage = require('../ImageScreen/rowBack.png');
const logoutIcon = require('../ImageScreen/logout.png');
const inforIcon = require('../ImageScreen/Infor.png');
const changePWDIcon = require('../ImageScreen/changePWD.png');

export default function SettingScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [comfirmPWD, setComfirmPWD] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  // redux
  const {namepatient, uriImage, pwd, id} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();
  // Check PWD

  const [PWDtext, setPWDText] = useState('');
  const [PWDnewtext, setPWDnewText] = useState('');
  const [PWDcomfirmtext, setPWDcomfirmText] = useState('');
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
  const onChangeTextPWDnew = text => {
    checkPWD(text);
    if (checkPWD(text) == false) {
      setPWDnewText('Không được chứa các ký hiệu đặc biệt');
      return false;
    } else if (checkPWD(text) == 1) {
      setPWDnewText('Không chứa khoảng trắng');
      return false;
    } else if (text.length < 8 && text.length > 0) {
      setPWDnewText('Độ dài của mật khẩu phải dài hơn 8');
      return false;
    } else if (text.length == 0) {
      setPWDnewText('');
    } else {
      setPWDnewText('');
    }
  };
  const onChangeTextPWDcomfirm = text => {
    checkPWD(text);
    if (checkPWD(text) == false) {
      setPWDcomfirmText('Không được chứa các ký hiệu đặc biệt');
      return false;
    } else if (checkPWD(text) == 1) {
      setPWDcomfirmText('Không chứa khoảng trắng');
      return false;
    } else if (text.length < 8 && text.length > 0) {
      setPWDcomfirmText('Độ dài của mật khẩu phải dài hơn 8');
      return false;
    } else if (text.length == 0) {
      setPWDcomfirmText('');
    } else {
      setPWDcomfirmText('');
    }
  };
  // use Text err
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPWDText('');
      setPWDnewText('');
      setPWDcomfirmText('');
    });
    return unsubscribe;
  }, [navigation]);
  // useEffect icon hide show pwd
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPassword('');
      setNewPassword('');
      setComfirmPWD('');
      setModalVisible(false);
      setShowPassword1(true);
      setShowPassword(true);
      setShowPassword2(true);
    });
    return unsubscribe;
  }, [navigation]);

  // API chagne pwd
  // Api Login
  const postChangePWD = async (acc, pwd) => {
    const url = 'http://159.223.48.4:8002/duchoang/change-password-patient';
    axios
      .post(url, {
        idpatient: acc,
        pwd: pwd,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status == true) {
          //setmodalFail(false);
        } else {
          // setmodalFail(true);
        }
      })
      .catch(function (error) {
        //setmodalError(true);
        console.log(error);
      })
      .then(function () {});
  };
  return (
    <View style={styles.container}>
      <BackMainScreen
        text="Cá nhân"
        navigate={() => {
          navigation.navigate('Home');
        }}
      />
      <View
        style={{
          height: (height * 90) / 100,
          width: (width * 100) / 100,
          alignItems: 'center',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: 'white',
          position: 'absolute',
          marginTop: (height * 10) / 100,
        }}>
        <View
          style={{
            height: (height * 15.8) / 100,
            width: (width * 34.5) / 100,
            marginTop: (height * 3) / 100,
            borderColor: '#D0D0D0',
            borderWidth: 3,
            borderRadius: 19,
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: uriImage}}
            style={{
              height: (height * 15) / 100,
              width: (width * 33) / 100,
              borderRadius: 15,
            }}
          />
        </View>

        <View
          style={{
            marginBottom: (height * 3) / 100,
            width: (width * 80) / 100,
            height: (height * 7) / 100,
            alignItems: 'center',
          }}>
          <Text style={styles.personalStyle}>{namepatient}</Text>
          <Text style={styles.personalStyle}>ID : {id}</Text>
        </View>

        <Pressable
          style={[
            {
              backgroundColor: 'white',
            },
            styles.viewFuction,
          ]}>
          <Image
            source={inforIcon}
            style={{
              height: (height * 3) / 100,
              width: (width * 6) / 100,
              marginLeft: (width * 3) / 100,
            }}
          />
          <View style={styles.viewTextinPress}>
            <Text style={[{color: '#205072'}, styles.textFunction]}>
              Thông tin
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
          style={[
            {
              backgroundColor: 'white',
            },
            styles.viewFuction,
          ]}>
          <Image
            source={changePWDIcon}
            style={{
              height: (height * 2) / 100,
              width: (width * 6) / 100,
              marginLeft: (width * 3) / 100,
            }}
          />
          <View style={styles.viewTextinPress}>
            <Text style={[{color: '#205072'}, styles.textFunction]}>
              Đổi mật khẩu
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={[
            {
              backgroundColor: 'white',
            },
            styles.viewFuction,
          ]}
          onPress={() => navigation.navigate('BeginScreen')}>
          <Image
            source={logoutIcon}
            style={{
              height: (height * 3) / 100,
              width: (width * 5) / 100,
              marginLeft: (width * 3) / 100,
            }}
          />
          {/* set tat ca dispatch ve null */}
          <View style={styles.viewTextinPress}>
            <Text
              style={[
                styles.textFunction,
                {color: 'red', paddingLeft: (width * 1) / 100},
              ]}>
              Đăng xuất
            </Text>
          </View>
        </Pressable>
      </View>

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
          }}
          style={{flex: 1}}>
          <View style={styles.modalViewStyles}>
            <Pressable style={styles.ModalStyles}>
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
                    marginLeft: (width * 25) / 100,
                  }}>
                  Đổi mật khẩu
                </Text>
              </Pressable>
              <Text style={styles.modalTextRemid}>Thay đổi mật khẩu</Text>
              <View>
                <TextInput
                  style={styles.textInputStyleModal}
                  mode="outlined"
                  activeUnderlineColor="#A0A0A0"
                  label="Mật khẩu cũ"
                  placeholder="Nhập mật khẩu cũ"
                  onChangeText={text => {
                    setPassword(text);
                    onChangeTextPWD(text);
                  }}
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
                <Text style={styles.textErrInput}>{PWDtext}</Text>
                <TextInput
                  style={styles.textInputStyleModal}
                  mode="outlined"
                  activeUnderlineColor="#A0A0A0"
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới"
                  onChangeText={text => {
                    setNewPassword(text);
                    onChangeTextPWDnew(text);
                  }}
                  outlineColor="#D0D0D0"
                  activeOutlineColor="#A0A0A0"
                  secureTextEntry={showPassword1}
                  right={
                    <TextInput.Icon
                      name={showPassword1 ? offEye : openEye}
                      onPress={() => {
                        setShowPassword1(!showPassword1);
                      }}
                      style={{marginTop: (height * 2) / 100}}
                    />
                  }
                />
                <Text style={styles.textErrInput}>{PWDnewtext}</Text>
                <TextInput
                  style={styles.textInputStyleModal}
                  mode="outlined"
                  activeUnderlineColor="#A0A0A0"
                  label="Xác nhận mật khẩu"
                  placeholder="Xác nhận mật khẩu mới"
                  onChangeText={text => {
                    setComfirmPWD(text);
                    onChangeTextPWDcomfirm(text);
                  }}
                  outlineColor="#D0D0D0"
                  activeOutlineColor="#A0A0A0"
                  secureTextEntry={showPassword2}
                  right={
                    <TextInput.Icon
                      name={showPassword2 ? offEye : openEye}
                      onPress={() => {
                        setShowPassword2(!showPassword2);
                      }}
                      style={{marginTop: (height * 2) / 100}}
                    />
                  }
                />
                <Text style={styles.textErrInput}>{PWDcomfirmtext}</Text>
              </View>
              <Pressable
                onPress={() => {
                  if (
                    password.length == 0 ||
                    newpassword.length == 0 ||
                    comfirmPWD.length == 0
                  ) {
                    console.log('Khong de trong');
                    return false;
                  } else {
                    if (onChangeTextPWD(password) == false) {
                      console.log('Sai syntax');
                    } else {
                      if (password != pwd) {
                        console.log('Mk sai');
                        console.log(pwd);
                      } else {
                        if (
                          onChangeTextPWDnew(newpassword) == false ||
                          onChangeTextPWDcomfirm(comfirmPWD) == false
                        ) {
                          console.log('Sai syntax cua mat khau moi');
                        } else {
                          if (newpassword == comfirmPWD) {
                            if (pwd == newpassword) {
                              console.log('nhap mat khau cu');
                            } else {
                              postChangePWD(id, newpassword);
                              dispatch(setPWDPatient(newpassword));
                            }
                          } else {
                            console.log('mat khau khong trung nhau');
                          }
                          // lam lai cho nay
                        }
                      }
                    }
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
                        styles.textStyles, // kiem tra
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  textErrInput: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'red',
    marginTop: (height * 1) / 100,
  },
  modalViewStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalStyles: {
    height: (height * 65) / 100,
    width: (width * 90) / 100,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
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
  modalComfirmSearch: {
    height: (height * 7) / 100,
    width: (width * 60) / 100,
    backgroundColor: 'blue',
    borderRadius: 13,
    marginTop: (height * 3) / 100,
  },
  modalTextRemid: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#7BE495',
  },
  textInputStyleModal: {
    width: (width * 65) / 100,
    height: (height * 8) / 100,
    marginTop: (height * 1) / 100,
    backgroundColor: 'white',
  },
  textTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  personalStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#205072',
    marginVertical: (height * 1) / 100,
  },
  viewFuction: {
    width: (width * 85) / 100,
    height: (height * 10) / 100,
    marginBottom: (height * 0.5) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
  },
  textFunction: {
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  viewTextinPress: {
    marginLeft: (width * 8) / 100,
    width: (width * 50) / 100,
  },
});
