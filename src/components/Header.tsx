import React from 'react';
import { HStack, Text, IconButton, Box } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MenuTimeScreen } from '../screens/time/MenuTimeScreen';

const Header = (props: any) => {
    const navigation = useNavigation();

    return (
        <HStack>
            <IconButton
                icon={<Ionicons name="arrow-back" size={24} color="#fff" />}
                onPress={() => navigation.goBack()}
            />
            <HStack flex={'1'} justifyContent={'center'} alignItems="center" >
                <Text color="white" fontWeight="medium" fontSize={18} >{props.titulo}</Text>
            </HStack>
            <Box justifyContent={'center'}>
                <MenuTimeScreen navigation={navigation} equipe={props.equipe} />
            </Box>
        </HStack>
    );





};

export default Header;