import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {PerfilScreen} from '../screens/PerfilScreen';
import {MatamataScreen} from '../screens/MatamataScreen';
import {CampeonatoStack} from './CampeonatoStack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: '#004AAD',
          padding: 10,
        },
        tabBarActiveTintColor: '#83e2f6',
        tabBarInactiveTintColor: '#fff',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={CampeonatoStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chaveamento"
        component={MatamataScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <Entypo name="circle-with-plus" size={36} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <FontAwesome name="user-circle-o" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
