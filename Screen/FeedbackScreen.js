import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
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
          fontSize: 18,
          fontWeight: 'bold',
          color: 'black',
        }}>
        {text.length}/200
      </Text>
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
    fontWeight: 'bold',
    color: 'black',
  },
});
