import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CadastroScreen} from '../screens/campeonato/CadastroScreen';
import {NomeModalidadeScreen} from '../screens/campeonato/NomeModalidadeScreen';
import {CampeonatoProvider} from '../contexts/Campeonato';
import {FormatoScreen} from '../screens/campeonato/FormatoScreen';

const Stack = createNativeStackNavigator();

export function CadastroStack() {
  return (
    <CampeonatoProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Upload" component={CadastroScreen} />
        <Stack.Screen name="NomeModalidade" component={NomeModalidadeScreen} />
        <Stack.Screen name="Formato" component={FormatoScreen} />
      </Stack.Navigator>
    </CampeonatoProvider>
  );
}
