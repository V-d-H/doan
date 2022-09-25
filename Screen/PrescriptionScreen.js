import BackMainScreen from '../CustomComponent/BackMainScreen';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const rowPreIcon = require('../ImageScreen/rowPre.png');
const {width, height} = Dimensions.get('window');

export default function PrescriptionScreen({navigation}) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Thuốc cảm:',
      date: '17/11/2022',
      userManual: 'Trước bữa ăn ',
    },
  ];
  const Item = ({title}) => (
    <Pressable
      style={{
        width: (width * 85) / 100,
        height: (height * 8) / 100,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={styles.textDetailPrescriptionStyle}>{title}</Text>
      <View>
        <Image
          source={rowPreIcon}
          style={{
            height: (height * 2) / 100,
            width: (width * 2) / 100,
            marginLeft: (width * 30) / 100,
          }}
        />
      </View>
    </Pressable>
  );
  const renderItem = ({item}) => (
    <Item title={item.title} remind={item.remind} />
  );
  return (
    <View style={styles.container}>
      <BackMainScreen
        navigate={() => {
          navigation.navigate('Home');
        }}
        text="Đơn thuốc"
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
        <Text style={styles.textRemindStyle}>Tình trạng sức khỏe</Text>
        <View style={styles.viewStatus}>
          <Text style={styles.textContentStyle}>dsfsdfdsdsads</Text>
        </View>
        <Text style={styles.textRemindStyle}>Đơn thuốc và cách sử dụng</Text>
        <View style={styles.viewPrescription}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  viewStatus: {
    width: (width * 90) / 100,
    height: (height * 20) / 100,
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: (height * 2) / 100,
    alignItems: 'flex-start',
    borderColor: '#F8F8F8',
    flex: 1,
  },
  viewPrescription: {
    width: (width * 90) / 100,
    height: (height * 50) / 100,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#F8F8F8',
  },
  textRemindStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#205072',
    marginVertical: (height * 2) / 100,
  },
  textContentStyle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'black',
    marginTop: (height * 1) / 100,
    marginLeft: (width * 2) / 100,
  },
  textDetailPrescriptionStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#205072',
    marginVertical: (height * 2) / 100,
    marginHorizontal: (width * 2) / 100,
    width: (width * 45) / 100,
  },
});
