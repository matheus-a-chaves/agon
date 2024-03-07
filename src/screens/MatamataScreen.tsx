import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';
import {useAuth} from '../contexts/Auth';

export function MatamataScreen() {
  return (
    <View>
      <View>Chaveamento Screen</View>
      <Button title="Sair" />
    </View>
  );
}
