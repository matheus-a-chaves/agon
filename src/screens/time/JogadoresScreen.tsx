import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import { Box, FlatList, Pressable, Text, HStack, Avatar, Divider, VStack, ScrollView } from 'native-base';
import Header from '../../components/Header';


export function JogadoresScreen() {
    const navigation = useNavigation();
    const [jogadores, setjogadores] = useState<any[]>([]);

    async function fetchTeams() {
        const idAtletica = '1';

        const players = [
            {
                id: '1',
                name: 'Mateus Irineu Mallmann',
                avatarUrl: 'https://example.com/mateus.jpg',
            },
            {
                id: '2',
                name: 'Rafaela Mantovani Fontana',
                avatarUrl: 'https://example.com/rafaela.jpg',
            },
            {
                id: '3',
                name: 'Matheus Alves Chaves',
                avatarUrl: 'https://example.com/matheus.jpg',
            },
            {
                id: '4',
                name: 'Matheus Alves Chaves',
                avatarUrl: 'https://example.com/matheus.jpg',
            },
            {
                id: '5',
                name: 'Matheus Alves Chaves',
                avatarUrl: 'https://example.com/matheus.jpg',
            },
            {
                id: '6',
                name: 'Matheus Alves Chaves',
                avatarUrl: 'https://example.com/matheus.jpg',
            },
            {
                id: '7',
                name: 'Matheus Alves Chaves',
                avatarUrl: 'https://example.com/matheus.jpg',
            },
            {
                id: '8',
                name: 'Matheus Alves Chaves',
                avatarUrl: 'https://example.com/matheus.jpg',
            },
        ];

        setjogadores(players);
    };
    useEffect(() => {
        fetchTeams();
    }, []);


    const handleTime = (id: string) => {
        navigation.navigate('NovaEquipe' as never);
        console.log(id);
    };


    return (

        <Box flex={1} bg={'rgba(0, 74, 173, 1)'}>
            <SafeAreaView style={{ height: '70%' }}>
                <Header titulo="Jogadores" />
                <ImageBackground
                    source={require('../../assets/img/campeonato/basketball.png')}
                    style={{ width: '100%', height: 150 }}>
                    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
                </ImageBackground>
                <VStack space={4} px={5} py={2} borderTopRadius={5} bg={'white'} >
                    <FlatList
                        data={jogadores}
                        renderItem={({ item }) => (
                            <Pressable
                                marginBottom={'10px'}
                                onPress={() => handleTime(item.id)}>
                                <Box key={item.id}>
                                    <HStack space={3} alignItems="center">
                                        <Avatar source={require('../../assets/img/campeonato/basketball.png')} />
                                        <Text fontSize="md">{item.name}</Text>
                                    </HStack>
                                    <Divider mt={2} />
                                </Box>
                            </Pressable>
                        )}
                        keyExtractor={item => item.id}
                    />
                </VStack>
            </SafeAreaView>
        </Box >

    );
}
