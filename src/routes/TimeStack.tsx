import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen } from '../screens/time/HomeScreen';
import { TeamProvider } from '../contexts/Team';
import { NovaEquipeScreen } from '../screens/time/NovaEquipeScreen';
import { JogadoresScreen } from '../screens/time/JogadoresScreen';
import AgendaScreen from '../screens/time/AgendaScreen';
import { AmistosoStack } from './AmistosoStack';
import { CampeonatoScreen } from '../screens/campeonato/listar/CampeonatoScreen';
import { CampeonatoStack } from './CampeonatoStack';

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
                <Stack.Screen name="JogadoresScreen" component={JogadoresScreen} />
                <Stack.Screen name="AmistosoTime" component={AmistosoStack} />
                <Stack.Screen name="CampeonatosStakTime" component={CampeonatoStack} />
                <Stack.Screen name="AgendaTime" component={AgendaScreen} />
            </Stack.Navigator>
        </TeamProvider>
    );
}
