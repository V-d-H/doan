import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Dimensions, View, Image} from 'react-native';
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
// const Tab = createMaterialBottomTabNavigator();
const {width, height} = Dimensions.get('window');
// function Mytab() {
//   return (
//     <Tab.Navigator
//       initialRouteName="HomeScreen"
//       activeColor="red"
//       inactiveColor="black"
//       barStyle={{backgroundColor: 'white'}}>
//       <Tab.Screen
//         name="IntroduceScreen"
//         component={IntroduceScreen}
//         options={{
//           tabBarLabel: 'Giới thiệu',
//           tabBarIcon: ({focused}) => {
//             return (
//               <View>
//                 <Image
//                   source={require('D:/Doantotnghiep/DoAnTotNghiep/Image/inforAboutUs.png')}
//                   style={{
//                     height: (height * 3) / 100,
//                     width: (width * 6.15) / 100,
//                     tintColor: focused ? 'red' : 'black',
//                   }}
//                 />
//               </View>
//             );
//           },
//         }}
//       />
//       <Tab.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Trang chủ',
//           tabBarIcon: ({focused}) => {
//             return (
//               <View>
//                 <Image
//                   source={require('D:/Doantotnghiep/DoAnTotNghiep/Image/homeIcon.png')}
//                   style={{
//                     height: (height * 3) / 100,
//                     width: (width * 6) / 100,
//                     tintColor: focused ? 'red' : 'black',
//                   }}
//                 />
//               </View>
//             );
//           },
//         }}
//       />
//       <Tab.Screen
//         name="SettingScreen"
//         component={SettingScreen}
//         options={{
//           tabBarLabel: 'Tài khoản',
//           tabBarIcon: ({focused}) => {
//             return (
//               <View>
//                 <Image
//                   source={require('D:/Doantotnghiep/DoAnTotNghiep/Image/accountIcon.png')}
//                   style={{
//                     height: (height * 3) / 100,
//                     width: (width * 6.15) / 100,
//                     tintColor: focused ? 'red' : 'black',
//                   }}
//                 />
//               </View>
//             );
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

const Stack = createNativeStackNavigator();
export default () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          //initialRouteName="BeginScreen"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BeginScreen" component={BeginScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="Prescription" component={PrescriptionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
