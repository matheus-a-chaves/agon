import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/Auth';
import { TabelaGruposComponent } from '../../../components/TabelaGruposComponent';
import { Box, HStack, ScrollView, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const trofeu = require('../assets/icons/trofeu.png');

export function FaseDeGrupoScreen() {
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
    }
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
          Fase de Grupos
        </Text>
        <Box size={25} />
      </HStack>
      <VStack alignItems={'center'} py={10}>
        <TabelaGruposComponent
          grupo='A'
          nomeTime={'NOMETIME'}
          equipes={data}
        />
        <TabelaGruposComponent
          grupo='B'
          nomeTime={'NOMETIME'}
          equipes={data}
        />
        <TabelaGruposComponent
          grupo='C'
          nomeTime={'NOMETIME'}
          equipes={data}
        />
      </VStack>
    </ScrollView>
  );
}
