import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CadastroScreen} from '../screens/campeonato/CadastroScreen';
import {NomeModalidadeScreen} from '../screens/campeonato/NomeModalidadeScreen';
import {CampeonatoProvider} from '../contexts/Campeonato';
import {FormatoScreen} from '../screens/campeonato/FormatoScreen';
import {CampeonatoInternoScreen} from '../screens/campeonato/listar/CampeonatoInternoScreen';

const Stack = createNativeStackNavigator();

export function CampeonatoStack() {
  return (
    <CampeonatoProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Listar" component={CampeonatoInternoScreen} />
        <Stack.Screen name="Upload" component={CadastroScreen} />
        <Stack.Screen name="NomeModalidade" component={NomeModalidadeScreen} />
        <Stack.Screen name="Formato" component={FormatoScreen} />
      </Stack.Navigator>
    </CampeonatoProvider>
  );
}
