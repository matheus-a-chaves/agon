import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Box,
  VStack,
  Text,
  HStack,
  FlatList,
  Image,
  Menu,
  Pressable,
} from 'native-base';
import {upload} from '../../Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {CampeonatoList, useCampeonato} from '../../../contexts/Campeonato';
import {ViewTimesCamp} from '../../../components/ViewTimesCamp';
import {SafeAreaView, View} from 'react-native';

export function CampeonatoTimesScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const {id}: any = route.params;

  const [campeonatos, setCampeonatos] = useState<CampeonatoList[]>([]);
  const {buscarCampeonatosInternos, buscarCampeonatosExternos} =
    useCampeonato();

  useEffect(() => {
    campeonatoInterno();
    console.log(id);
  }, []);

  const campeonatoInterno = async () => {
    try {
      const modalidadesData: CampeonatoList[] = await buscarCampeonatosInternos(
        0,
      );
      setCampeonatos(modalidadesData);
    } catch (error) {
      console.error('Erro ao buscar modalidades:', error);
    }
  };

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#004AAD'}}>
      <Box w="100%" h="215px" marginBottom={'20px'} borderBottomRadius={'10px'}>
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
          <Box>
            <Menu
              w="200px"
              marginRight={'25px'}
              trigger={triggerProps => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}>
                    <Entypo name="menu" size={30} color={'#fff'} />
                  </Pressable>
                );
              }}>
              <Menu.Item>Iniciar</Menu.Item>
              <Menu.Item>Informações</Menu.Item>
              <Menu.Item>Regulamento</Menu.Item>
              <Menu.Item>Sair do campeonato</Menu.Item>
            </Menu>
          </Box>
        </HStack>
        <VStack height={'80%'} alignItems={'center'} justifyContent={'center'}>
          <Box
            h="150px"
            w="150px"
            borderWidth={'3px'}
            borderRadius={100}
            alignItems={'center'}
            justifyContent={'center'}>
            <Image
              h="100%"
              w="100%"
              borderRadius={100}
              source={require('../../../assets/logo_login.png')}
              alt="imagem do time"
            />
          </Box>
        </VStack>
      </Box>
      <VStack bg={'#fff'} h={'66%'} borderTopRadius={'10px'} w={'100%'}>
        <Text px={10} py={5} fontSize={'18px'}>
          Times inscritos
        </Text>
        <FlatList
          w={'100%'}
          data={campeonatos}
          renderItem={({item, index}) => {
            let numero = index + 1;
            return (
              <Box
                marginBottom={'10px'}
                alignItems={'center'}
                borderTopWidth={1}
                borderColor={'#A3A3A3'}>
                <ViewTimesCamp
                  nome={item.nome}
                  imagem={upload}
                  numero={numero}
                />
              </Box>
            );
          }}
          keyExtractor={item => item.id}
        />
      </VStack>
    </SafeAreaView>
  );
}
