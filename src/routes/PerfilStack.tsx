import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AlterarSenhaScreen } from '../screens/perfil/AlterarSenhaScreen';
import { PerfilScreen } from '../screens/perfil/PerfilScreen';
import { SolicitacoesScreen } from '../screens/perfil/SolicitacoesScreen';
import { EditarContaScreen } from '../screens/perfil/EditarContaScreen';

const Stack = createNativeStackNavigator();

export function PerfilStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Solicitacoes" component={SolicitacoesScreen} />
            <Stack.Screen name="AlterarSenha" component={AlterarSenhaScreen} />
            <Stack.Screen name="EditarContaScreen" component={EditarContaScreen} />
        </Stack.Navigator>
    );
}
