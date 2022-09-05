import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import RowBack from '../CustomComponent/RowBack';

const {width, height} = Dimensions.get('window');

export default function PrescriptionScreen({navigation}) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Thuốc cảm:',
      remind: 'Ngày 3 bữa, sau ăn',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Thuốc hạ sốt:',
      remind: 'Ngày 2 bữa, sau ăn',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Thuốc an thần:',
      remind: 'Ngày 2 bữa, trước ăn',
    },
  ];
  const Item = ({title, remind}) => (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.textDetailPrescriptionStyle}>{title}</Text>
      <Text style={styles.textDetailPrescriptionStyle}>{remind}</Text>
    </View>
  );
  const renderItem = ({item}) => (
    <Item title={item.title} remind={item.remind} />
  );
  return (
    <View style={styles.container}>
      <RowBack
        navigate={() => {
          navigation.navigate('Home');
        }}
        text="ĐƠN THUỐC"
        textRemind="Thông tin đơn thuốc của bạn"
      />

      <View style={styles.viewStatus}>
        <Text style={styles.textRemindStyle}>Tình trạng của bệnh nhân</Text>
        <Text style={styles.textContentStyle}></Text>
      </View>
      <View style={styles.viewPrescription}>
        <Text style={styles.textRemindStyle}>Đơn thuốc và cách sử dụng</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
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
    width: (width * 95) / 100,
    height: (height * 20) / 100,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: (height * 2) / 100,
    alignItems: 'center',
  },
  viewPrescription: {
    width: (width * 95) / 100,
    height: (height * 50) / 100,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  textRemindStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: (height * 1) / 100,
  },
  textContentStyle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: (height * 1) / 100,
  },
  textDetailPrescriptionStyle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: (height * 2) / 100,
    marginHorizontal: (width * 2) / 100,
  },
});
