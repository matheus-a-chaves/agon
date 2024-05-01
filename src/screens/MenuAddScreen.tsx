import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Menu, Pressable } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

export function MenuAddScreen(navigationStack: any) {

    const navigation = useNavigation();
    return (
        <Menu
            w="200px"
            h="200px"
            placement='top'
            trigger={triggerProps => {
                return (
                    <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}>
                        <Entypo name="circle-with-plus" size={36} color={'#FFF'} />
                    </Pressable>
                );
            }}>
            <Menu.Item onPress={() => navigation.navigate('Menu')}>Novo time</Menu.Item>
            <Menu.Item>Novo amistoso</Menu.Item>
            <Menu.Item onPress={() => navigation.navigate('NovoCampeonato')}>Novo campeonato</Menu.Item>
        </Menu >
    );
}
