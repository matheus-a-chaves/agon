import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen } from '../screens/time/HomeScreen';
import { FaseDeGrupoScreen } from '../screens/campeonato/listar/FaseDeGrupoScreen';
import { TeamProvider } from '../contexts/Team';
import { NovaEquipeScreen } from '../screens/time/NovaEquipeScreen';

const Stack = createNativeStackNavigator();
export function TimeStack() {
    return (
        <TeamProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Time" component={HomeScreen} />
                <Stack.Screen name="NovaEquipe" component={NovaEquipeScreen} />
                <Stack.Screen name="FaseDeGrupos" component={FaseDeGrupoScreen} />
            </Stack.Navigator>
        </TeamProvider>
    );
}
