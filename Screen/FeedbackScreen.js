import BackMainScreen from '../CustomComponent/BackMainScreen';
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
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const feedbackIamge = require('../ImageScreen/feedbackImage.png');
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
      <BackMainScreen
        text="Gửi phản hồi"
        navigate={() => {
          navigation.navigate('Home');
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          marginTop: (height * 10) / 100,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          width: (width * 100) / 100,
          alignItems: 'center',
        }}>
        <Text style={styles.textRemind}>Nhập phản hồi của bạn</Text>
        <TextInput
          multiline={true}
          textAlign="left"
          maxLength={200}
          //placeholder="Gửi phản hồi của bạn ở đây"
          style={styles.viewFeedbackstyles}
          value={text}
          onChangeText={text => {
            setText(text);
            if (text.length == 200) {
              Alert.alert('Khong duoc qua 200 ky tu');
            }
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
        <Image
          source={feedbackIamge}
          style={{
            marginTop: (height * 3) / 100,
            height: (height * 30) / 100,
            width: (width * 71) / 100,
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.pressablePress}>
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
                    styles.textInPressable,
                  ]}>
                  Gửi
                </Text>
              </LinearGradient>
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              setText('');
            }}
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
        <Text style={styles.textRemind}>
          Phản hồi của bạn sẽ được gửi đến bác sĩ
        </Text>
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
  linearGradient: {
    flex: 1,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width * 30) / 100,
    height: (height * 6) / 100,
  },
  textRemind: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#205072',
    marginTop: (height * 4) / 100,
  },
  viewFeedbackstyles: {
    width: (width * 90) / 100,
    height: (height * 20) / 100,
    borderWidth: 0.5,
    borderRadius: 12,
    marginTop: (height * 3) / 100,
    fontFamily: 'Roboto',
    fontSize: 18,
    borderColor: '#D0D0D0',
    textAlignVertical: 'top',
  },
  pressablePress: {
    borderColor: 'black',
    borderRadius: 12,
    width: (width * 30) / 100,
    height: (height * 6) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (height * 5) / 100,
    marginHorizontal: (width * 2) / 100,
  },
  textInPressable: {
    fontFamily: 'Roboto',
    fontSize: 18,
  },
});
