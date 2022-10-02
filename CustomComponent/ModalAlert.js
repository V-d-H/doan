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
export default function ModalAlert({
  open,
  close,
  textTitle,
  textRemind,
  textRemind1,
}) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={close}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textTitleStyle}>{textTitle}</Text>
            <Text style={styles.textRemindStyle}>{textRemind}</Text>
            <Text style={styles.textRemindStyle}>{textRemind1}</Text>
            <Image
              source={warningIcon}
              style={{
                height: (height * 10) / 100,
                width: (width * 20) / 100,
                marginVertical: (height * 1) / 100,
              }}
            />
            <Pressable style={[styles.button]} onPress={close}>
              <Text style={styles.textStyle}>Xác nhận</Text>
            </Pressable>
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
    width: (width * 30) / 100,
    height: (height * 6) / 100,
    elevation: 2,
    backgroundColor: 'blue',
    position: 'absolute',
    marginTop: (height * 29) / 100,
  },
  textTitleStyle: {
    fontSize: 22,
    color: 'red',
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
    marginTop: (height * 2) / 100,
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
