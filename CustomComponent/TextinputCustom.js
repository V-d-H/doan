import React from 'react';
import {View, TextInput, StyleSheet, Dimensions, Text} from 'react-native';
const {width, height} = Dimensions.get('window');
export default function TextInputCustom(props) {
  const customInput = props.customInput
    ? styles.textinputBlur
    : styles.textinputFocus;
  const customInputText = props.customInputText
    ? styles.textTitleBlur
    : styles.textTitleFocus;
  return (
    <View style={{flex: 1}}>
      <TextInput
        {...props}
        style={[customInput, styles.textinput]}
        mode="outlined"
        placeholder={props.placeholder}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
      />
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          marginLeft: (width * 3) / 100,
        }}>
        <Text style={[customInputText, styles.textTitle]}>{props.text}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textinputFocus: {
    borderWidth: 1,
    elevation: 2,
  },
  textinputBlur: {
    borderWidth: 2,
    elevation: 5,
  },
  textinput: {
    width: (width * 90) / 100,
    height: (height * 8) / 100,
    marginTop: (height * 2) / 100,
    backgroundColor: 'white',
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#205072',
    borderRadius: 8,
    paddingLeft: (width * 3) / 100,
  },
  textTitle: {fontFamily: 'Roboto', fontSize: 16, color: 'black'},
  textTitleFocus: {fontWeight: 'normal'},
  textTitleBlur: {fontWeight: 'bold'},
});
