import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/Auth';
import {NativeBaseProvider} from 'native-base';

export function Router() {
  const {authData} = useAuth();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {authData ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
