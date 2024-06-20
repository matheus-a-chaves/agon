import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import VisualizarAmistosoScreen from '../screens/amistoso/VisualizarAmistosoScreen';
import { NovoAmistosoScreen } from '../screens/amistoso/NovoAmistosoScreen';
import { PerfilScreen } from '../screens/perfil/PerfilScreen';
import { EnderecoAmistoso } from '../screens/amistoso/EnderecoAmistoso';
import { AmistosoProvider } from '../contexts/Amistoso';

const Stack = createNativeStackNavigator();

export function AmistosoStack() {
    return (
        <AmistosoProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="AmistosoScreen" component={VisualizarAmistosoScreen} />
                <Stack.Screen name="NovoAmistosoScreen" component={NovoAmistosoScreen} />
                <Stack.Screen name="EditarConta" component={PerfilScreen} />
                <Stack.Screen name="EnderecoAmistoso" component={EnderecoAmistoso} />
            </Stack.Navigator>
        </AmistosoProvider>

    );
}
