import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CadastroScreen} from '../screens/campeonato/CadastroScreen';
import {NomeModalidadeScreen} from '../screens/campeonato/NomeModalidadeScreen';
import {CampeonatoProvider} from '../contexts/Campeonato';
import {FormatoScreen} from '../screens/campeonato/FormatoScreen';
import {CampeonatoScreen} from '../screens/campeonato/listar/CampeonatoScreen';
import {CampeonatoTimesScreen} from '../screens/campeonato/listar/CampeonatoTimesScreen';
import {FaseDeGrupoScreen} from '../screens/campeonato/listar/FaseDeGrupoScreen';

const Stack = createNativeStackNavigator();
export function CampeonatoStack() {
  return (
    <CampeonatoProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Campeonatos" component={FaseDeGrupoScreen} />
        <Stack.Screen name="Upload" component={CadastroScreen} />
        <Stack.Screen name="NomeModalidade" component={NomeModalidadeScreen} />
        <Stack.Screen name="Formato" component={FormatoScreen} />
        <Stack.Screen
          name="CampeonatosTimes"
          component={CampeonatoTimesScreen}
        />
      </Stack.Navigator>
    </CampeonatoProvider>
  );
}
