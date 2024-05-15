import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PerfilScreen } from '../screens/PerfilScreen';

const Stack = createNativeStackNavigator();

export function PerfilStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Notificacao" component={PerfilScreen} />
            <Stack.Screen name="EditarConta" component={PerfilScreen} />
        </Stack.Navigator>
    );
}
