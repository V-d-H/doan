import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const rowBackImage = require('../ImageScreen/rowBack.png');

export default function BackMainScreen(props) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#dce8da' : '#E0ECDE',
            },
            styles.pressableRowback,
          ]}
          onPress={props.navigate}>
          <Image source={rowBackImage} style={styles.rowBackStyle} />
        </Pressable>
        <View style={styles.viewText}>
          <Text style={styles.textTitle}>{props.text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: (width * 100) / 100,
    height: (height * 12) / 100,
    alignItems: 'center',
    backgroundColor: '#E0ECDE',
  },
  pressableRowback: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (width * 20) / 100,
    height: (height * 7) / 100,
  },
  rowBackStyle: {
    width: (width * 2) / 100,
    height: (height * 2) / 100,
  },
  textTitle: {
    fontFamily: 'Roboto',
    fontSize: 25,
    color: '#205072',
  },
  viewText: {
    width: (width * 80) / 100,
    height: (height * 7) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: (width * 17) / 100,
  },
  textRemindStyle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: (height * 2) / 100,
  },
});
