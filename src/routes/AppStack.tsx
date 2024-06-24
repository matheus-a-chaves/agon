import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TimeStack } from './TimeStack';
import { MenuStack } from './MenuStack';
import { MenuAddScreen } from '../screens/MenuAddScreen';
import { PerfilStack } from './PerfilStack';
import { useAuth } from '../contexts/Auth';
import { environment } from '../../environment';
import { Badge, Box, Text } from 'native-base';

const Tab = createBottomTabNavigator();

export function AppStack() {
  const { getTabBarVisibility, authData, notification, setCounterNotification } = useAuth();

  useEffect(() => {
    console.log('AppStack', notification)
    setCounterNotification();
  });

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({

        tabBarStyle: {
          height: 60,
          backgroundColor: '#004AAD',
          padding: 10,
          display: getTabBarVisibility ? 'flex' : 'none',
        },
        tabBarActiveTintColor: '#83e2f6',
        tabBarInactiveTintColor: '#fff',

        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="TimeStack"
        component={TimeStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />
      {authData?.tipoUsuario === environment.PERFIL_ATLETICA && (
        <Tab.Screen
          name="Menu"
          component={MenuStack}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
          options={({ navigation }) => ({
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <MenuAddScreen navigation={navigation} />
            ),
          })}
        />)}
      <Tab.Screen
        name="PerfilStack"
        component={PerfilStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Box position="relative" alignItems="center">
              <FontAwesome name="user-circle-o" size={30} color={color} />
              {authData?.tipoUsuario === environment.PERFIL_ATLETICA && notification > 0 && (
                <Box position="absolute" top={-10} right={-10}>
                  <Badge bg="red.500" rounded="full" minWidth={18} minHeight={18}>
                    <Text fontSize={10} color="white">{notification}</Text>
                  </Badge>
                </Box>
              )}
            </Box>
          ),
        }}
      />
    </Tab.Navigator >
  );
}
