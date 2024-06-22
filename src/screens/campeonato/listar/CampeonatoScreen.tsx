import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, VStack, Text, HStack, Pressable, FlatList, Image } from 'native-base';
import { ViewCampeonato } from '../../../components/ViewCampeonato';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CampeonatoList } from '../../../contexts/Campeonato';
import { SafeAreaView } from 'react-native';
import { CampeonatoService } from '../../../services/campeonato.service';
import { useAuth } from '../../../contexts/Auth';


export function CampeonatoScreen() {
  const navigation = useNavigation();
  const [activeInterno, setActiveInterno] = useState('#051326');
  const [activeExterno, setActiveExterno] = useState('');
  const [campeonatos, setCampeonatos] = useState<CampeonatoList[]>([]);
  const { authData } = useAuth()
  const route = useRoute()
  const { equipe } = route.params as any
  useEffect(() => {
    campeonatoInterno();
  }, []);

  const campeonatoExterno = async () => {
    try {
      setActiveExterno('#051326');
      setActiveInterno('#004AAD');
      console.log(equipe)
      const modalidadesData: CampeonatoList[] = await CampeonatoService.buscarCampeonatosExternos(equipe.idEquipe, equipe.modalidade.id);
      setCampeonatos(modalidadesData);
    } catch (error) {
      console.error('Erro ao buscar campeonatos externos:', error);
    }
  };

  const campeonatoInterno = async () => {
    try {
      setActiveInterno('#051326');
      setActiveExterno('#004AAD');

      const campeonatos: CampeonatoList[] = await CampeonatoService.buscarCampeonatosInternos(equipe.idEquipe, equipe.modalidade.id);
      setCampeonatos(campeonatos);
    } catch (error) {
      console.error('Erro ao buscar campeonatos internos:', error);
    }
  };

  const handleCampeonato = (campeonato: any) => {
    navigation.navigate('CampeonatosTimes', { campeonato });
  };

  return (
    <SafeAreaView style={{ height: '80%' }}>
      <Box
        w="100%"
        h="110px"
        bgColor={'#004AAD'}
        marginBottom={'20px'}
        borderBottomRadius={'10px'}>
        <HStack justifyContent={'space-between'} padding={'10px'}>
          <Ionicons
            name="arrow-back"
            size={30}
            color={'#fff'}
            onPress={() => navigation.goBack()}
          />
          <Text color={'#fff'} fontWeight={'medium'} fontSize={18}>
            Campeonatos
          </Text>
          <Box w={30} />
        </HStack>
        <HStack justifyContent={'center'}>
          <Pressable
            borderRadius={'10px'}
            px="45px"
            py="10px"
            bgColor={activeInterno}
            onPress={() => campeonatoInterno()}>
            <Text color={'#fff'} fontWeight={'medium'} fontSize={18}>
              Internos
            </Text>
          </Pressable>
          <Pressable
            borderRadius={'10px'}
            px="45px"
            py="10px"
            bgColor={activeExterno}
            onPress={() => campeonatoExterno()}>
            <Text color={'#fff'} fontWeight={'medium'} fontSize={18}>
              Externos
            </Text>
          </Pressable>
        </HStack>
      </Box>
      <VStack alignItems={'center'}>
        <FlatList
          data={campeonatos}
          renderItem={({ item }) => (
            <Pressable
              marginBottom={'10px'}
              onPress={() => handleCampeonato(item)}>
              <ViewCampeonato
                nome={item.nome}
                imagem={item.imagem}
                dataInicio={item.dataInicio}
              />
            </Pressable>
          )}
          ListEmptyComponent={
            <Box alignItems={'center'} justifyContent={'space-between'} my={5} h={'450px'}>
              <Text color={'#A3A3A3'} fontSize={'18px'} fontWeight={'500'} mb={2}>
                Não há campeonatos  no momento
              </Text>
              <VStack my={10}>
                <Image source={require('../../../assets/img/campeonato/podium.png')} alt={'sem campeonato'} />
              </VStack>
            </Box>
          }
          keyExtractor={item => item.id}
        />
      </VStack>
    </SafeAreaView>
  );
}
