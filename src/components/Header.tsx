import React from 'react';
import { HStack, Text, IconButton } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = (props: any) => {
    const navigation = useNavigation();

    return (
        <HStack>
            <IconButton
                icon={<Ionicons name="arrow-back" size={24} color="#fff" />}
                onPress={() => navigation.goBack()}
            />
            <HStack flex={'1'} justifyContent={'center'} alignItems="center" >
                <Text color="white" fontWeight="medium" fontSize={18} textAlign={'end'}>{props.titulo}</Text>
            </HStack>
            <IconButton
                icon={<Ionicons name="menu" size={30} color="#fff" />}
                onPress={() => navigation.goBack()}
            />
        </HStack>
    );
};

export default Header;