import React from 'react';
import { Text, HStack, IconButton, Box } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



const Back = (props: any) => {
    const navigation = useNavigation()
    return (
        <HStack bg={'#004AAD'}>
            <IconButton
                w={'50px'}
                icon={<Ionicons name="arrow-back" size={24} color="#fff" />}
                onPress={() => navigation.goBack()}
            />
            <Box flex={1} alignItems={'center'}
                justifyContent={'center'}>
                <Text color={'#fff'} fontSize={'md'}>{props.titulo}</Text>
            </Box>
            <Box w={'50px'} />
        </HStack>
    );
};

export default Back;
