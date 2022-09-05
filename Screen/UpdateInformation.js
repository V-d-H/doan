import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import RowBack from '../CustomComponent/RowBack';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  setNamePatient,
  setAddress,
  setCMNDofPatient,
  setNameCarer,
  setNumberphone,
} from '../redux/action';

const {width, height} = Dimensions.get('window');

export default function UpdateInformation({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <RowBack
        navigate={() => {
          navigation.navigate('Register');
        }}
        text="CẬP NHẬT THÔNG TIN"
        textRemind="Vui lòng điền đầy đủ thông tin"
      />
      <ScrollView
        keyboardDismissMode="none"
        style={{
          width: (width * 90) / 100,
          maxHeight: (height * 80) / 100,
        }}>
        <TextInput
          style={styles.textInputStyle}
          mode="outlined"
          activeUnderlineColor="black"
          label="Họ và tên"
          onChangeText={text => {
            dispatch(setNamePatient(text));
          }}
          outlineColor="black"
          activeOutlineColor="black"
        />
        <TextInput
          style={styles.textInputStyle}
          mode="outlined"
          activeUnderlineColor="black"
          label="CMND/CCCD"
          onChangeText={text => {
            dispatch(setCMNDofPatient(text));
          }}
          outlineColor="black"
          activeOutlineColor="black"
        />
        <TextInput
          style={styles.textInputStyle}
          mode="outlined"
          activeUnderlineColor="black"
          label="Địa chỉ"
          onChangeText={text => {
            dispatch(setAddress(text));
          }}
          outlineColor="black"
          activeOutlineColor="black"
        />
        <TextInput
          style={styles.textInputStyle}
          mode="outlined"
          activeUnderlineColor="black"
          label="Họ tên người chăm sóc"
          onChangeText={text => {
            dispatch(setNameCarer(text));
          }}
          outlineColor="black"
          activeOutlineColor="black"
        />
        <TextInput
          style={styles.textInputStyle}
          mode="outlined"
          activeUnderlineColor="black"
          label="Số điện thoại người chăm sóc"
          onChangeText={text => {
            dispatch(setNumberphone(text));
          }}
          outlineColor="black"
          activeOutlineColor="black"
        />
        <View style={{marginTop: (height * 3) / 100, alignItems: 'center'}}>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#B0C4DE' : 'blue',
              },
              styles.pressablePress,
            ]}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={styles.textInPressable}>Xác nhận</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  },
  textInPressable: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
