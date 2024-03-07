import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../screens/HomeScreen';
import {PerfilScreen} from '../screens/PerfilScreen';
import {TeamProvider} from '../contexts/Team';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <TeamProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </TeamProvider>
  );
}
