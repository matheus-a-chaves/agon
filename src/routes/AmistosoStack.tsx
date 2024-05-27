import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PerfilScreen } from '../screens/PerfilScreen';
import VisualizarAmistosoScreen from '../screens/amistoso/VisualizarAmistosoScreen';


const Stack = createNativeStackNavigator();

export function AmistosoStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="AmistosoScreen" component={VisualizarAmistosoScreen} />
            <Stack.Screen name="Notificacao" component={PerfilScreen} />
            <Stack.Screen name="EditarConta" component={PerfilScreen} />
        </Stack.Navigator>
    );
}
