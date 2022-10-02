import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import {Store} from './redux/store';

import BeginScreen from './Screen/BeginScreen';
import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';
import IntroduceScreen from './Screen/IntroduceScreen';
import SettingScreen from './Screen/SettingScreen';
import ProfileScreen from './Screen/ProfileScreen';
import PrescriptionScreen from './Screen/PrescriptionScreen';
import FeedbackScreen from './Screen/FeedbackScreen';

const Stack = createNativeStackNavigator();
export default () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          //initialRouteName="BeginScreen"
        >
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Prescription" component={PrescriptionScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
          <Stack.Screen name="BeginScreen" component={BeginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
