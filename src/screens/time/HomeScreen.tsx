import React, { useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TextInput, ActivityIndicator } from 'react-native';
import { InputView } from '../../styles/HomeScreenCss';
import { Box, FlatList, Pressable, Text, VStack, Image } from 'native-base';
import { ViewCampeonato } from '../../components/ViewCampeonato';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/Auth';
import { environment } from '../../../environment';
import { useTeam } from '../../contexts/Team';
import { Equipe } from '../../interfaces/equipeInterface';
import { useCallback } from 'react';

export function HomeScreen() {
  const { authData } = useAuth();
  const { teamData, findAllTeam } = useTeam();
  const navigation = useNavigation();
  const [times, setTimes] = useState<Equipe[]>([]);
  const [timeSearch, setTimeSearch] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTeams() {
    await findAllTeam();
  }

  useEffect(() => {
    setLoading(true);
    fetchTeams();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (teamData) {
      setTimes(teamData);
      setTimeSearch(teamData);
    }
  }, [teamData]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        fetchTeams();
      };
      fetchData();
    }, [])
  );

  function searchTeam(value: string) {
    const teamSearch = timeSearch.filter((team) => {
      const nome = team.nome?.toLowerCase();
      return nome?.includes(value.toLowerCase());
    });
    setTimes(teamSearch);
  }

  const handleTime = (timeModalidade: any, item: any) => {
    const equipe = { idEquipe: item, modalidade: timeModalidade }
    navigation.navigate('JogadoresScreen', { equipe });
  };

  return (
    <VStack p={2} bg={'#FFF'} justifyContent={'center'} alignItems={'center'}>
      <InputView>
        <TextInput
          placeholder="Pesquisar time..."
          onChangeText={(value) => searchTeam(value)}
        />
      </InputView>
      <Box h="88%" w={'100%'} alignItems={'center'}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Box alignItems={'flex-start'} w={'86%'}>
              <Text py={'1px'} color={'#A3A3A3'} fontSize={'16px'}>
                Times
              </Text>
            </Box>
            <FlatList
              data={times}
              renderItem={({ item }) => (
                <Pressable
                  marginBottom={'10px'}
                  onPress={() => handleTime(item.modalidade, item.id)}
                  shadow={2}
                >
                  <ViewCampeonato
                    nome={item.nome}
                    imagem={item.imagem}
                    dataCriacao={item.modalidade?.nome}
                  />
                </Pressable>
              )}
              keyExtractor={item => item.id}
              ListEmptyComponent={
                authData?.tipoUsuario === environment.PERFIL_JOGADOR ?
                  <TimeVazioJogador /> :
                  <TimeVazioAtletica />
              }
            />
          </>
        )}
      </Box>
    </VStack>
  );

  function TimeVazioAtletica() {
    return (
      <Box alignItems={'center'} justifyContent={'center'} my={5}>
        <Text color={'#A3A3A3'} fontSize={'18px'} fontWeight={'500'} mb={2}>
          Você não possui times cadastrados
        </Text>
        <Image
          w={'310px'} h={'310px'}
          source={require('../../assets/img/equipe/vazio.png')}
          alt='Sem times cadastrados'
        />
        <Button title={'CRIAR TIME'} w={'100%'} mt={10}
          onPress={() => navigation.navigate('NovaEquipe' as never)}
        />
      </Box>
    );
  }

  function TimeVazioJogador() {
    return (
      <Box alignItems={'center'} justifyContent={'center'} my={5}>
        <Text color={'#A3A3A3'} fontSize={'18px'} fontWeight={'500'} mb={2} textAlign={'center'}>
          Não há nenhum time no momento.
        </Text>
        <Image
          w={'310px'} h={'310px'}
          source={require('../../assets/img/equipe/vazio.png')}
          alt='Sem times cadastrados'
        />
        <Text color={'#A3A3A3'} fontSize={'18px'} fontWeight={'500'} mt={2} px={5} textAlign={'center'}>
          Por favor, entre em contato com sua atlética para inscrevê-lo.
        </Text>
      </Box>
    );
  }
}
