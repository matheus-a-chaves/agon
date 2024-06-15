import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CadastroScreen } from '../screens/campeonato/CadastroScreen';
import { NomeModalidadeScreen } from '../screens/campeonato/NomeModalidadeScreen';
import { CampeonatoProvider } from '../contexts/Campeonato';
import { FormatoScreen } from '../screens/campeonato/FormatoScreen';
import { CampeonatoTimesScreen } from '../screens/campeonato/listar/CampeonatoTimesScreen';
import { CampeonatoScreen } from '../screens/campeonato/listar/CampeonatoScreen';
import ChaveamentoScreen from '../screens/campeonato/ChaveamentoScreen';
import { FaseDeGrupoScreen } from '../screens/campeonato/listar/FaseDeGrupoScreen';
import { PontosCorridosScreen } from '../screens/campeonato/listar/PontosCorridosScreen';
import { EnderecoComponent } from '../components/EnderecoComponent';

const Stack = createNativeStackNavigator();
export function CampeonatoStack() {
  return (
    <CampeonatoProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Upload" component={CadastroScreen} />
        <Stack.Screen name="Campeonatos" component={CampeonatoScreen} />
        <Stack.Screen name="NomeModalidade" component={NomeModalidadeScreen} />
        <Stack.Screen name="Formato" component={FormatoScreen} />
        <Stack.Screen name="CampeonatosTimes" component={CampeonatoTimesScreen} />
        <Stack.Screen name="ChaveamentoCampeonato" component={ChaveamentoScreen} />
        <Stack.Screen name="PontosCorridos" component={FaseDeGrupoScreen} />
        <Stack.Screen name="FaseDeGrupos" component={PontosCorridosScreen} />
        <Stack.Screen name="EnderecoCampeonato" component={EnderecoComponent} />
      </Stack.Navigator>
    </CampeonatoProvider>
  );
}
