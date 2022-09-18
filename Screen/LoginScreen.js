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
const {width, height} = Dimensions.get('window');
const openEye = require('../ImageScreen/hiddenPW.png');
const offEye = require('../ImageScreen/hiddenPWoff.png');
const rowBackImage = require('../ImageScreen/rowBack.png');
const loginImage = require('../ImageScreen/LoginScreenImage.png');
export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [CMND, setCMND] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
      setModalVisible(false);
      setCMND('');
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <RowBack
        navigate={() => {
          navigation.navigate('BeginScreen');
        }}
        text="ĐĂNG NHẬP"
        textRemind="Vui lòng điền thông tin đăng nhập"
      />
      <TextInput
        style={styles.textInputStyle}
        mode="outlined"
        activeUnderlineColor="#A0A0A0"
        label="Nhập tài khoản"
        onSubmitEditing={text => {
          setEmail(text);
        }}
        outlineColor="#D0D0D0"
        activeOutlineColor="#A0A0A0"
      />
      <TextInput
        style={styles.textInputStyle}
        mode="outlined"
        activeUnderlineColor="#A0A0A0"
        label="Nhập mật khẩu"
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
      <Pressable
        onPress={() => navigation.navigate('Home')}
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
                    marginLeft: (width * 30) / 100,
                  }}>
                  Tra cứu
                </Text>
              </Pressable>

              <Text style={styles.modalSearchTextStyle}>
                Tài khoản: bn1.hoang
              </Text>
              <Text style={styles.modalSearchTextStyle}>
                Mật khẩu: 123456789
              </Text>
              <Text style={styles.modalTextRemid}>
                Nhập CMND/CCCD của bạn để tra cứu
              </Text>
              <TextInput
                style={styles.textInputStyleModal}
                mode="outlined"
                activeUnderlineColor="#A0A0A0"
                label="Nhập CMND"
                onSubmitEditing={CMND => {
                  setCMND(CMND);
                }}
                outlineColor="#D0D0D0"
                activeOutlineColor="#A0A0A0"
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
