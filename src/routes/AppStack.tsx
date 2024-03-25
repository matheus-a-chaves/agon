import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../screens/HomeScreen';
import {PerfilScreen} from '../screens/PerfilScreen';
import {TeamProvider} from '../contexts/Team';
import {MatamataScreen} from '../screens/MatamataScreen';
import {FaseDeGrupoScreen} from '../screens/FaseDeGrupoScreen';
import {CadastroScreen} from '../screens/campeonato/CadastroScreen';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <TeamProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Campeonato" component={CadastroScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FaseGrupos" component={FaseDeGrupoScreen} />
        <Stack.Screen name="Chaveamento" component={MatamataScreen} />
      </Stack.Navigator>
    </TeamProvider>
  );
}
