import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import { Box, FlatList, Pressable, Text, HStack, Avatar, Divider, VStack } from 'native-base';
import Header from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { JogadoresService } from '../../services/jogadores.service';
import { AdicionarJogadorPopUp } from './AdicionarJogadorPopUp';


export interface Jogador {
    id: string;
    name: string;
    imagem: string;
}


export function JogadoresScreen() {
    const navigation = useNavigation();
    const [jogadores, setjogadores] = useState<Jogador[]>([]);

    async function fetchModalidades() {
        try {
            const jogadores = await JogadoresService.buscarJogadores(1);
            setjogadores(jogadores);
        } catch (error) {
            console.error('Erro ao buscar modalidades:', error);
        }
    }
    useEffect(() => {
        fetchModalidades();
    }, []);


    const handleTime = (id: string) => {
        navigation.navigate('NovaEquipe' as never);
    };

    return (
        <Box flex={1} bg={'rgba(0, 74, 173, 1)'}>
            <SafeAreaView style={{ height: '80%' }}>
                <Header titulo="Jogadores" />
                <ImageBackground
                    source={require('../../assets/img/campeonato/basketball.png')}
                    style={{ width: '100%', height: 170 }}>
                    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
                </ImageBackground>
                <Box alignItems={'flex-start'}>
                    <AdicionarJogadorPopUp />
                </Box>
                <VStack space={4} px={5} py={2} borderTopRadius={5} bg={'white'} h={'80%'}>
                    <FlatList
                        data={jogadores}
                        renderItem={({ item }) => (
                            <Pressable
                                marginBottom={'10px'}
                                onPress={() => console.log('item ' + item.id)}>
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
