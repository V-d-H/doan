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
const rowBackImage = require('../Image/rowBack.png');

export default function RowBack(props) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#FFFAFA' : 'white',
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
      <Text style={styles.textRemindStyle}>{props.textRemind}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: (width * 100) / 100,
    height: (height * 12) / 100,
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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
