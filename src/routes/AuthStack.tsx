import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SignInScreen } from '../screens/SignInScreen';
import { AutoCadastroStack } from './AutoCadastroStack';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="AutoCadastro" component={AutoCadastroStack} />
    </Stack.Navigator>
  );
}
