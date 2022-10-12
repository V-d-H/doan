import React from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');

const beginScreen = require('../ImageScreen/BeginScreenImage.png');

export default function BeginScreen({navigation}) {
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
              Bắt đầu
            </Text>
          </LinearGradient>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: '#CDE0C9',
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
    marginTop: (height * 15) / 100,
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
});
