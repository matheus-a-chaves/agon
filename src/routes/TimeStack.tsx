import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CadastroScreen } from '../screens/campeonato/CadastroScreen';
import { NomeModalidadeScreen } from '../screens/campeonato/NomeModalidadeScreen';
import { FormatoScreen } from '../screens/campeonato/FormatoScreen';
import { HomeScreen } from '../screens/time/HomeScreen';
import { FaseDeGrupoScreen } from '../screens/campeonato/listar/FaseDeGrupoScreen';
import { TeamProvider } from '../contexts/Team';

const Stack = createNativeStackNavigator();
export function TimeStack() {
    return (
        <TeamProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Time" component={HomeScreen} />
                <Stack.Screen name="Upload" component={CadastroScreen} />
                <Stack.Screen name="NomeModalidade" component={NomeModalidadeScreen} />
                <Stack.Screen name="FaseDeGrupos" component={FaseDeGrupoScreen} />
                <Stack.Screen name="Formato" component={FormatoScreen} />
            </Stack.Navigator>
        </TeamProvider>
    );
}
