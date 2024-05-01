import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CadastroScreen } from '../screens/campeonato/CadastroScreen';
import { NomeModalidadeScreen } from '../screens/campeonato/NomeModalidadeScreen';
import { MenuAddScreen } from '../screens/MenuAddScreen';

const Stack = createNativeStackNavigator();
function EmptyScreen() {
    return null;
}
export function MenuStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="MenuAdd" component={MenuAddScreen} />
            <Stack.Screen name="NovoTime" component={MenuAddScreen} />
            <Stack.Screen name="NovoCampeonato" component={CadastroScreen} />
            <Stack.Screen name="NovoAmistoso" component={NomeModalidadeScreen} />
        </Stack.Navigator>
    );
}
