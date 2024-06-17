import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import { Box, FlatList, Pressable, Text, HStack, Avatar, Divider, VStack, Menu } from 'native-base';
import Header from '../../components/Header';
import { JogadoresService } from '../../services/jogadores.service';
import { AdicionarJogadorPopUp } from './AdicionarJogadorPopUp';
import { environment } from '../../../environment';
import { useAuth } from '../../contexts/Auth';

export interface Jogador {
    id: string;
    name: string;
    imagem: string;
}

export function JogadoresScreen() {
    const { authData } = useAuth()
    const navigation = useNavigation();
    const [jogadores, setjogadores] = useState<Jogador[]>([]);

    async function fetchJogadores() {
        try {
            const jogadores = await JogadoresService.buscarJogadores(1);
            setjogadores(jogadores);
        } catch (error) {
            console.error('Erro ao buscar modalidades:', error);
        }
    }
    useEffect(() => {
        fetchJogadores();
    }, []);


    const handleTime = (id: string) => {
        navigation.navigate('NovaEquipe' as never);
    };

    async function onRemovePlayer(id: string) {
        try {
            await JogadoresService.removerJogador(parseInt(id), 1);
        } catch (error) {
            console.error('Erro ao remover jogador:', error);
        }
    }

    const porcentagem = (): string => {
        if (authData?.tipoUsuario === environment.PERFIL_ATLETICA) {
            return '80%'
        }
        return '88%'
    }
    return (
        <Box flex={1} bg={'rgba(0, 74, 173, 1)'}>
            <SafeAreaView style={{ height: '80%' }} >
                <Header titulo="Jogadores" />
                <ImageBackground
                    source={require('../../assets/img/campeonato/basketball.png')}
                    style={{ width: '100%', height: 170 }}>
                    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
                </ImageBackground>
                {authData?.tipoUsuario === environment.PERFIL_ATLETICA && (
                    <Box alignItems={'flex-start'}>
                        <AdicionarJogadorPopUp />
                    </Box>
                )}

                <VStack space={4} px={5} py={2} borderTopRadius={5} bg={'white'} h={porcentagem()}>
                    <FlatList
                        data={jogadores}
                        renderItem={({ item }) => (
                            authData?.tipoUsuario === environment.PERFIL_ATLETICA ?
                                <ListaAtletica item={item} /> : <ListaJogador item={item} />
                        )}
                        keyExtractor={item => item.id}
                    />
                </VStack>
            </SafeAreaView>
        </Box >

    );

    function ListaAtletica({ item }: any) {
        console.log(item)
        return (
            <Menu
                w="200px"
                marginRight={'25px'}
                bg={'#004AAD'}
                trigger={triggerProps => {
                    return (
                        <Pressable
                            marginBottom={'10px'}
                            accessibilityLabel="More options menu"
                            {...triggerProps}
                        >
                            <Box key={item.id}>
                                <HStack space={3} alignItems="center">
                                    <Avatar source={require('../../assets/img/campeonato/basketball.png')} />
                                    <Text fontSize="md">{item.name}</Text>
                                </HStack>
                                <Divider mt={2} />
                            </Box>
                        </Pressable>
                    );
                }}>

                <Menu.Item onPress={() => onRemovePlayer(item.id)}>
                    <Text fontSize={'14px'} color={'#fff'}>
                        Remover jogador
                    </Text>
                </Menu.Item>
            </Menu>
        )
    }

    function ListaJogador({ item }: any) {
        return (
            <Box key={item.id} marginBottom={'10px'}>
                <HStack space={3} alignItems="center">
                    <Avatar source={require('../../assets/img/campeonato/basketball.png')} />
                    <Text fontSize="md">{item.name}</Text>
                </HStack>
                <Divider mt={2} />
            </Box>
        )
    }
}
