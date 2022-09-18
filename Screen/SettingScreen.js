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
import {useSelector} from 'react-redux';
import BackMainScreen from '../CustomComponent/BackMainScreen';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';

const openEye = require('../ImageScreen/hiddenPW.png');
const offEye = require('../ImageScreen/hiddenPWoff.png');
const {width, height} = Dimensions.get('window');
const rowBackImage = require('../ImageScreen/rowBack.png');
const logoutIcon = require('../ImageScreen/logout.png');
const inforIcon = require('../ImageScreen/Infor.png');
const changePWDIcon = require('../ImageScreen/changePWD.png');
export default function SettingScreen({navigation}) {
  const {namepatient, uriImage} = useSelector(state => state.userReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [comfirmPWD, setComfirmPWD] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPassword('');
      setModalVisible(false);
      setShowPassword1(true);
      setShowPassword(true);
      setShowPassword2(true);
    });
    return unsubscribe;
  }, [navigation]);
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
        <Image
          source={{uri: uriImage}}
          style={{
            height: (height * 15) / 100,
            width: (width * 33) / 100,
            borderRadius: 15,
            marginTop: (height * 3) / 100,
          }}
        />

        <View
          style={{
            marginBottom: (height * 3) / 100,
            width: (width * 80) / 100,
            height: (height * 7) / 100,
            alignItems: 'center',
          }}>
          <Text style={styles.personalStyle}>{namepatient}</Text>
          <Text style={styles.personalStyle}>ID :</Text>
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
            <View style={styles.ModalStyles}>
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

              <TextInput
                style={styles.textInputStyleModal}
                mode="outlined"
                activeUnderlineColor="#A0A0A0"
                label="Mật khẩu cũ"
                placeholder="Nhập mật khẩu cũ"
                onSubmitEditing={text => {
                  setPassword(text);
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
              <TextInput
                style={styles.textInputStyleModal}
                mode="outlined"
                activeUnderlineColor="#A0A0A0"
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                onSubmitEditing={text => {
                  setNewPassword(text);
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
              <TextInput
                style={styles.textInputStyleModal}
                mode="outlined"
                activeUnderlineColor="#A0A0A0"
                label="Xác nhận mật khẩu"
                placeholder="Xác nhận mật khẩu mới"
                onSubmitEditing={text => {
                  setComfirmPWD(text);
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
              <Pressable style={styles.modalComfirmSearch}>
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
            </View>
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
    marginTop: (height * 5) / 100,
  },
  modalTextRemid: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#7BE495',
  },
  textInputStyleModal: {
    width: (width * 65) / 100,
    height: (height * 8) / 100,
    marginTop: (height * 3) / 100,
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
    borderColor: '#A0A0A0',
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
