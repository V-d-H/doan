import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import RowBack from '../CustomComponent/RowBack';
import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');
const openEye = require('../Image/hiddenPW.png');
const offEye = require('../Image/hiddenPWoff.png');
const loginImage = require('../ImageScreen/LoginScreenImage.png');
export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
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
        label="Nhập Email"
        onSubmitEditing={email => {
          setEmail(email);
        }}
        outlineColor="#A0A0A0"
        activeOutlineColor="#A0A0A0"
      />
      <TextInput
        style={styles.textInputStyle}
        mode="outlined"
        activeUnderlineColor="#A0A0A0"
        label="Nhập mật khẩu"
        onSubmitEditing={password => {
          setPassword(password);
        }}
        outlineColor="#A0A0A0"
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
              Đăng nhập
            </Text>
          </LinearGradient>
        )}
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('')}
        style={styles.PressSupport}>
        {({pressed}) => (
          <Text
            style={
              pressed ? styles.textSupportoutPress : styles.textSupportinPress
            }>
            Quên mật khẩu!
          </Text>
        )}
      </Pressable>
      <Image source={loginImage} />
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
});
