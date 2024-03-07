import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';
import {useAuth} from '../contexts/Auth';

export function PerfilScreen() {
  const navigation = useNavigation();
  const {signOut} = useAuth();
  return (
    <View>
      <Text>Perfil Screen</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}
