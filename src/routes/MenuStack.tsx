import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CampeonatoStack } from './CampeonatoStack';
import { TimeStack } from './TimeStack';
import { AmistosoStack } from './AmistosoStack';



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
            <Stack.Screen name="AmistosoStack" component={AmistosoStack} initialParams={{ screen: 'EnderecoAmistoso' }} />
        </Stack.Navigator>
    );
}
