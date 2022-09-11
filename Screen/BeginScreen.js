import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
const rowBackImage = require('../ImageScreen/rowBack.png');
const {width, height} = Dimensions.get('window');

const beginScreen = require('../ImageScreen/BeginScreenImage.png');

export default function BeginScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [CMND, setCMND] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setModalVisible(false);
      setCMND('');
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.textSloganStyle}>
        Sức khỏe của bạn – Hạnh phúc của chúng tôi
      </Text>
      <Image source={beginScreen} />
      <Pressable
        style={styles.StartedPressStyle}
        onPress={() => navigation.navigate('LoginScreen')}>
        {({pressed}) => (
          <LinearGradient
            colors={
              pressed
                ? ['#A0A0A0', '#A0A0A0', '#A0A0A0']
                : ['#329D9C', '#329D9C', '#7BE495']
            }
            style={styles.linearGradient}>
            <Text
              style={[
                {
                  fontSize: 18,
                  color: 'white',
                  fontWeight: 'bold',
                },
                styles.textStyles,
              ]}>
              Bắt đầu
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
            <Text style={styles.modalSearchTextStyle}>Mật khẩu: 123456789</Text>
            <Text style={styles.modalTextRemid}>
              Nhập CMND/CCCD của bạn để tra cứu
            </Text>
            <TextInput
              style={styles.textInputStyle}
              mode="outlined"
              activeUnderlineColor="#A0A0A0"
              label="Nhập CMND"
              onSubmitEditing={CMND => {
                setCMND(CMND);
              }}
              outlineColor="#A0A0A0"
              activeOutlineColor="#A0A0A0"
            />
            <Pressable style={styles.modalComfirmSearch}>
              {({pressed}) => (
                <LinearGradient
                  colors={
                    pressed
                      ? ['#F0F0F0', '#F0F0F0', '#F0F0F0']
                      : ['#329D9C', '#329D9C', '#7BE495']
                  }
                  style={styles.linearGradient}>
                  <Text
                    style={[
                      {
                        fontSize: 18,
                        color: 'white',
                        fontWeight: 'bold',
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
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#CDE0C9',
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
  },
  textSloganStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'black',
    marginTop: (height * 10) / 100,
    marginBottom: (height * 7) / 100,
  },
  StartedPressStyle: {
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
  textStyles: {
    fontFamily: 'Roboto',
  },
  modalViewStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    width: (width * 65) / 100,
    height: (height * 8) / 100,
    marginTop: (height * 3) / 100,
    backgroundColor: 'white',
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
    fontWeight: 'bold',
  },
});
