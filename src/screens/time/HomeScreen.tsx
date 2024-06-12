import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  TextInput,
} from 'react-native';
import { InputView } from '../../styles/HomeScreenCss';
import { Box, FlatList, Pressable, Text, VStack, Image } from 'native-base';
import { ViewCampeonato } from '../../components/ViewCampeonato';
import { upload } from '../Utils';
import { TeamService } from '../../services/time.service';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/Auth';
import { environment } from '../../../environment';


export function HomeScreen() {
  const { authData } = useAuth();
  const navigation = useNavigation();
  const [times, setTimes] = useState<any[]>([]);
  const [timeSearch, setTimeSearch] = useState<any[]>([]);

  async function fetchTeams() {
    const idAtletica = '1';
    const team = await TeamService.buscarTimes(idAtletica);
    setTimes(team);
    setTimeSearch(team)
  };
  useEffect(() => {
    fetchTeams();
  }, []);

  function searchTeam(value: string) {
    const teamSerch = timeSearch.filter((team) => {
      const nome = team.nome.toLowerCase();
      return nome.includes(value.toLowerCase())
    });
    setTimes(teamSerch);
  }
  const handleTime = (id: string) => {
    navigation.navigate('JogadoresScreen' as never);
  };


  return (
    <VStack p={2} bg={'#FFF'} justifyContent={'center'} alignItems={'center'}>
      <InputView>
        <TextInput placeholder="Pesquisar time..."
          onChangeText={
            (value) =>
              searchTeam(value)} />
      </InputView>
      <Box h="88%" w={'100%'} alignItems={'center'}>
        <Box alignItems={'flex-start'} w={'86%'}>
          <Text
            py={'1px'} color={'#A3A3A3'} fontSize={'16px'}>
            Times
          </Text>
        </Box>
        <FlatList
          data={times}
          renderItem={({ item }) => (
            <Pressable
              marginBottom={'10px'}
              onPress={() => handleTime(item.id)}
              shadow={2}
            >
              <ViewCampeonato
                nome={item.nome}
                imagem={upload}
                dataCriacao={item.modalidade.nome}
              />
            </Pressable>
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            authData?.tipoPerfil === environment.PERFIL_JOGADOR ?
              <TimeVazioJogador /> :
              <TimeVazioAtletica />
          }
        />
      </Box>
    </VStack>
  );


  function TimeVazioAtletica() {
    return (
      <Box alignItems={'center'} justifyContent={'center'} my={5}>
        <Text
          color={'#A3A3A3'}
          fontSize={'18px'}
          fontWeight={'500'}
          mb={2}
        >Você não possui times cadastrados</Text>
        <Image
          w={'310px'} h={'310px'}
          source={require('../../assets/img/equipe/vazio.png')}
          alt='Sem times cadastrados' />
        <Button title={'CRIAR TIME'} w={'100%'} mt={10}
          onPress={() => navigation.navigate('NovaEquipe' as never)}
        />
      </Box>
    );
  }

  function TimeVazioJogador() {
    return (
      <Box alignItems={'center'} justifyContent={'center'} my={5}>
        <Text
          color={'#A3A3A3'}
          fontSize={'18px'}
          fontWeight={'500'}
          mb={2}
          textAlign={'center'}
        >Não há nenhum time no momento.</Text>

        <Image
          w={'310px'} h={'310px'}
          source={require('../../assets/img/equipe/vazio.png')}
          alt='Sem times cadastrados' />
        <Text
          color={'#A3A3A3'}
          fontSize={'18px'}
          fontWeight={'500'}
          mt={2}
          px={5}
          textAlign={'center'}
        >
          Por favor, entre em contato com sua atlética para inscrevê-lo.</Text>
      </Box>
    );
  }
}
