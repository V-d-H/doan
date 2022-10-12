import React, {useState} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const warningIcon = require('../ImageScreen/warningIcon.png');
export default function ModalSucessFail({
  open,
  close,
  textTitle,
  textRemind1,
  comfirmTextButton,
  animationType,
  icon,
}) {
  //const iconSuccess = require('../ImageScreen/sucessIcon.png');
  return (
    <View>
      <Modal
        animationType={animationType}
        transparent={true}
        visible={open}
        onRequestClose={close}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textTitleStyle}>{textTitle}</Text>
            <Image source={icon} style={{marginVertical: (height * 2) / 100}} />
            <Text style={styles.textRemindStyle}>{textRemind1}</Text>
            <View
              style={{
                position: 'absolute',
                marginTop: (height * 29) / 100,
              }}>
              <Pressable
                style={[styles.button, {backgroundColor: '#7BE495'}]}
                onPress={close}>
                <Text style={[styles.textStyle, {color: 'white'}]}>
                  {comfirmTextButton}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: (width * 80) / 100,
    height: (height * 32) / 100,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    justifyContent: 'center',
    borderRadius: 20,
    width: (width * 27) / 100,
    height: (height * 6) / 100,
    elevation: 2,
    marginHorizontal: (width * 2) / 100,
  },
  textTitleStyle: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: (height * 2) / 100,
    borderBottomWidth: 0.6,
    borderBottomColor: '#E0ECDE',
    width: (width * 50) / 100,
  },
  textRemindStyle: {
    color: '#205072',
    fontSize: 18,
    textAlign: 'center',
    marginTop: (height * 1) / 100,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});
