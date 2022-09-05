import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import RowBack from '../CustomComponent/RowBack';
import {TextInput} from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const openEye = require('../Image/hiddenPW.png');
const offEye = require('../Image/hiddenPWoff.png');

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setcomfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showcomfirmPassword, setShowcomfirmPassword] = useState(true);
  const inputText1 = useRef(null);
  const inputText2 = useRef(null);
  const inputText3 = useRef(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      inputText1.current.focus();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <RowBack
        navigate={() => {
          navigation.navigate('BeginScreen');
        }}
        text="ĐĂNG KÝ"
        textRemind="Vui lòng điền thông tin đăng ký"
      />
      <TextInput
        style={styles.textInputStyle}
        mode="outlined"
        activeUnderlineColor="black"
        label="Nhập Email"
        value={email}
        onSubmitEditing={email => {
          setEmail(email);
        }}
        outlineColor="black"
        activeOutlineColor="black"
        ref={inputText1}
        autoFocus={true}
        onEndEditing={() => {
          inputText2.current.focus();
        }}
      />
      <TextInput
        style={styles.textInputStyle}
        mode="outlined"
        activeUnderlineColor="black"
        label="Nhập mật khẩu"
        value={password}
        onSubmitEditing={password => {
          setPassword(password);
        }}
        outlineColor="black"
        activeOutlineColor="black"
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
        ref={inputText2}
        onEndEditing={() => {
          inputText3.current.focus();
        }}
      />
      <TextInput
        style={styles.textInputStyle}
        mode="outlined"
        activeUnderlineColor="black"
        label="Nhập lại mật khẩu"
        value={comfirmPassword}
        onSubmitEditing={comfirmPassword => {
          setcomfirmPassword(comfirmPassword);
        }}
        outlineColor="black"
        activeOutlineColor="black"
        secureTextEntry={showcomfirmPassword}
        right={
          <TextInput.Icon
            name={showcomfirmPassword ? offEye : openEye}
            onPress={() => {
              setShowcomfirmPassword(!showcomfirmPassword);
            }}
            style={{marginTop: (height * 2) / 100}}
          />
        }
        ref={inputText3}
      />
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#B0C4DE' : 'blue',
          },
          styles.pressablePress,
        ]}
        onPress={() => navigation.navigate('UpdateInfor')}>
        <Text style={styles.textInPressable}>Đăng ký</Text>
      </Pressable>
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
  pressablePress: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    width: (width * 60) / 100,
    height: (height * 9) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (height * 10) / 100,
  },
  textInPressable: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
