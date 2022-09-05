import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import RowBack from '../CustomComponent/RowBack';

const {width, height} = Dimensions.get('window');

export default function FeedbackScreen({navigation}) {
  const [text, setText] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setText('');
    });
    return unsubscribe;
  }, [navigation]);
  const AlertNofication = () => {
    Alert.alert('Gửi phản hồi thành công!');
  };
  return (
    <View style={styles.container}>
      <RowBack
        text="GỬI PHẢN HỒI"
        textRemind="Gửi phản hồi của bạn về tình trạng sức khỏe"
        navigate={() => {
          navigation.navigate('Home');
        }}
      />
      <TextInput
        multiline={true}
        textAlign="center"
        maxLength={200}
        placeholder="Gửi phản hồi của bạn ở đây"
        style={styles.viewFeedbackstyles}
        value={text}
        onChangeText={text => {
          setText(text);
        }}
      />
      <Text
        style={{
          fontFamily: 'Roboto',
          fontSize: 16,
          color: 'black',

          marginLeft: (width * 75) / 100,
        }}>
        {text.length}/200
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#B0C4DE' : 'blue',
            },
            styles.pressablePress,
          ]}>
          <Text style={[{color: 'white'}, styles.textInPressable]}>Gửi</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#B0C4DE' : 'white',
              borderWidth: 1,
            },
            styles.pressablePress,
          ]}>
          <Text style={[{color: 'black'}, styles.textInPressable]}>Hủy</Text>
        </Pressable>
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
  viewFeedbackstyles: {
    width: (width * 90) / 100,
    height: (height * 20) / 100,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: (height * 5) / 100,
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'black',
  },
  pressablePress: {
    borderColor: 'black',
    borderRadius: 12,
    width: (width * 30) / 100,
    height: (height * 6) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (height * 10) / 100,
    marginHorizontal: (width * 2) / 100,
  },
  textInPressable: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
