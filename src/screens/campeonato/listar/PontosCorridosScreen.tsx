import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/Auth';
import { Box, HStack, ScrollView, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PontosCorridosComponent } from '../../../components/PontosCorridosComponent';

const trofeu = require('../assets/icons/trofeu.png');

export function PontosCorridosScreen() {
    const navigation = useNavigation();
    const { signOut } = useAuth();

    useEffect(() => { }, []);

    const data = [
        {
            "id": '1',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '2',
            "imagem": "caminho/para/imagem2.png",
            "nome": "Equipe 2",
            "pontos": "8",
            "jogos": "5",
            "vitorias": "2",
            "empates": "2",
            "derrotas": "1",
            "saldoDeGols": "+3"
        },
        {
            "id": '3',
            "imagem": "caminho/para/imagem2.png",
            "nome": "Equipe 2",
            "pontos": "8",
            "jogos": "5",
            "vitorias": "2",
            "empates": "2",
            "derrotas": "1",
            "saldoDeGols": "+3"
        },
        {
            "id": '4',
            "imagem": "caminho/para/imagem2.png",
            "nome": "Equipe 2",
            "pontos": "8",
            "jogos": "5",
            "vitorias": "2",
            "empates": "2",
            "derrotas": "1",
            "saldoDeGols": "+3"
        },
        {
            "id": '5',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '6',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '7',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '8',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '9',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '10',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '11',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '12',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '13',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '14',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        }, {
            "id": '15',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
        {
            "id": '16',
            "imagem": "caminho/para/imagem1.png",
            "nome": "Equipe 1",
            "pontos": "10",
            "jogos": "5",
            "vitorias": "3",
            "empates": "1",
            "derrotas": "1",
            "saldoDeGols": "+5"
        },
    ];

    return (
        <ScrollView>
            <HStack justifyContent={'space-between'} padding={'5px'} bgColor={'#004AAD'}>
                <Ionicons
                    name="arrow-back"
                    size={25}
                    color={'#fff'}
                    onPress={() => navigation.goBack()}
                />
                <Text color={'#fff'} fontWeight={'medium'} fontSize={16}>
                    Pontos corridos
                </Text>
                <Box size={25} />
            </HStack>
            <VStack alignItems={'center'} py={5}>
                <PontosCorridosComponent
                    title={'Classificação'}
                    equipes={data}
                />
            </VStack>
        </ScrollView>
    );
}
