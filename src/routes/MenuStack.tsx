import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CadastroScreen } from '../screens/campeonato/CadastroScreen';
import { NomeModalidadeScreen } from '../screens/campeonato/NomeModalidadeScreen';
import { MenuAddScreen } from '../screens/MenuAddScreen';
import { CampeonatoScreen } from '../screens/campeonato/listar/CampeonatoScreen';
import { CampeonatoProvider } from '../contexts/Campeonato';
import { CampeonatoStack } from './CampeonatoStack';
import { TimeStack } from './TimeStack';



const Stack = createNativeStackNavigator();


export function MenuStack() {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="CampeonatoStack"
                component={CampeonatoStack}
                initialParams={{ screen: 'Upload' }} />
            <Stack.Screen name="TimeStack" component={TimeStack} initialParams={{ screen: 'NovaEquipe' }} />
            <Stack.Screen name="AmistosoStack" component={MenuAddScreen} />
        </Stack.Navigator>
    );
}
