import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { UserCadScreen } from '../screens/autocadastro/UserCadScreen';
import { AutoCadastroProvider } from '../contexts/FormProvider';
import { EnderecoCadScreen } from '../screens/autocadastro/EnderecoCadScreen';
import { PasswordCadScreen } from '../screens/autocadastro/PasswordCadScreen';
import { ConfirmarCadScreen } from '../screens/autocadastro/ConfirmarCadScreen';


const Stack = createNativeStackNavigator();

export function AutoCadastroStack() {
    return (
        <AutoCadastroProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="UserCadScreen" component={UserCadScreen} />
                <Stack.Screen name="PasswordCadScreen" component={PasswordCadScreen} />
                <Stack.Screen name="EnderecoCadScreen" component={EnderecoCadScreen} />
                <Stack.Screen name="ConfirmarCadScreen" component={ConfirmarCadScreen} />
            </Stack.Navigator>
        </AutoCadastroProvider>

    );
}
