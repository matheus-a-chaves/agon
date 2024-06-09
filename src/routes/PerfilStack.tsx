import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PerfilScreen } from '../screens/PerfilScreen';
import { AlterarSenhaScreen } from '../screens/AlterarSenhaScreen';

const Stack = createNativeStackNavigator();

export function PerfilStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Notificacao" component={PerfilScreen} />
            <Stack.Screen name="AlterarSenha" component={AlterarSenhaScreen} />
        </Stack.Navigator>
    );
}
