import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, VStack, Text, HStack, Pressable, FlatList } from 'native-base';
import { upload } from '../../Utils';
import { ViewCampeonato } from '../../../components/ViewCampeonato';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { CampeonatoList, useCampeonato } from '../../../contexts/Campeonato';
import { SafeAreaView } from 'react-native';
import { CampeonatoService } from '../../../services/campeonato.service';

export function CampeonatoScreen() {
  const navigation = useNavigation();
  const [activeInterno, setActiveInterno] = useState('#051326');
  const [activeExterno, setActiveExterno] = useState('');
  const [campeonatos, setCampeonatos] = useState<CampeonatoList[]>([]);
  const { buscarCampeonatosInternos, buscarCampeonatosExternos } = useCampeonato();

  useEffect(() => {
    campeonatoInterno();
  }, []);

  const campeonatoExterno = async () => {
    try {
      setActiveExterno('#051326');
      setActiveInterno('#004AAD');
      const modalidadesData: CampeonatoList[] = await buscarCampeonatosExternos(0);
      setCampeonatos(modalidadesData);
    } catch (error) {
      console.error('Erro ao buscar campeonatos externos:', error);
    }
  };

  const campeonatoInterno = async () => {
    try {
      setActiveInterno('#051326');
      setActiveExterno('#004AAD');
      const modalidadesData: CampeonatoList[] = await CampeonatoService.buscarCampeonatosInternos(
        1
      );
      setCampeonatos(modalidadesData);
    } catch (error) {
      console.error('Erro ao buscar campeonatos internos:', error);
    }
  };

  const handleCampeonato = (id: any) => {
    navigation.navigate('CampeonatosTimes', { id });
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
              onPress={() => handleCampeonato(item.id)}>
              <ViewCampeonato
                nome={item.nome}
                imagem={upload}
                dataInicio={item.dataInicio}
              />
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </VStack>
    </SafeAreaView>
  );
}
