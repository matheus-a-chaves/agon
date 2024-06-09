import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PerfilScreen } from '../screens/PerfilScreen';
import VisualizarAmistosoScreen from '../screens/amistoso/VisualizarAmistosoScreen';
import { NovoAmistosoScreen } from '../screens/amistoso/NovoAmistosoScreen';

const Stack = createNativeStackNavigator();

export function AmistosoStack() {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="AmistosoScreen" component={VisualizarAmistosoScreen} />
            <Stack.Screen name="NovoAmistosoScreen" component={NovoAmistosoScreen} />
            <Stack.Screen name="EditarConta" component={PerfilScreen} />
        </Stack.Navigator>

    );
}
