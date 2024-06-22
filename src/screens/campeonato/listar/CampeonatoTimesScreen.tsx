import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { imageConverter, upload } from '../../Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { ViewTimesCamp } from '../../../components/ViewTimesCamp';
import { SafeAreaView } from 'react-native';
import { environment } from '../../../../environment';
import { useAuth } from '../../../contexts/Auth';
import { AdicionarTimePopUp } from '../cadastro/AdicionarTimePopUp';
import { Equipe } from '../../../interfaces/equipeInterface';
import { TeamService } from '../../../services/time.service';

export function CampeonatoTimesScreen() {
  const { authData } = useAuth()
  const navigation = useNavigation();
  const route = useRoute();

  const { id }: any = route.params;
  const { campeonato }: any = route.params;
  const [equipes, setEquipes] = useState<Equipe[]>([]);


  useEffect(() => {
    fetchEquipes();
  }, []);

  const fetchEquipes = async () => {
    try {
      const equipesData: Equipe[] = await TeamService.buscarTimesCampeonato(campeonato.id);
      setEquipes(equipesData);
    } catch (error) {
      console.error('Erro ao buscar modalidades:', error);
    }
  };

  async function onRemoveEquipe(id: string) {
    try {
      // await JogadoresService.removerJogador(parseInt(id), 1);
    } catch (error) {
      console.error('Erro ao remover jogador:', error);
    }
  }


  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: '#004AAD' }}>
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
              {authData?.tipoUsuario === environment.PERFIL_ATLETICA && campeonato.campeonatoTipo === 0 && (
                <Menu.Item onPress={() => navigation.navigate('EnderecoCampScreen' as never, { id })}>Iniciar</Menu.Item>
              )}
              <Menu.Item onPress={() => navigation.navigate('ChaveamentoCampeonato' as never)}>Chaveamento</Menu.Item>
              <Menu.Item onPress={() => navigation.navigate('FaseDeGrupos' as never)}>Fase de grupos</Menu.Item>
              <Menu.Item onPress={() => navigation.navigate('PontosCorridos' as never)}>Pontos corridos</Menu.Item>
            </Menu>
          </Box>
        </HStack>
        <VStack height={'80%'} alignItems={'center'} justifyContent={'center'}>
          <Box
            h="150px"
            w="150px"
            borderWidth={'2px'}
            borderRadius={100}
            alignItems={'center'}
            justifyContent={'center'}>
            <Image
              h="100%"
              w="100%"
              borderRadius={100}
              source={imageConverter(campeonato.imagem, require('../../../assets/logo_login.png'))}
              alt="imagem do time"
            />
          </Box>
          {authData?.tipoUsuario === environment.PERFIL_ATLETICA && campeonato.campeonatoTipo === 0 && (
            <Box alignItems={'flex-start'} justifyContent={'flex-start'} w={'95%'}>
              <AdicionarTimePopUp campeonato={campeonato} />
            </Box>
          )}
        </VStack>
      </Box>

      <VStack bg={'#fff'} h={'66%'} borderTopRadius={'10px'} w={'100%'}>
        <ListaEquipes />
        {/* <PartidasComponent /> */}
      </VStack>
    </SafeAreaView>
  );


  function ListaAtletica({ nome, upload, index, id }: any) {
    return (
      <Menu
        w="200px"
        marginLeft={'40px'}
        marginTop={'-18px'}
        bg={'#004AAD'}
        trigger={triggerProps => {
          return (
            <Pressable
              accessibilityLabel="More options menu"
              {...triggerProps}
            >
              <Box
                marginBottom={'10px'}
                alignItems={'center'}
                borderTopWidth={1}
                borderColor={'#A3A3A3'}>
                <ViewTimesCamp
                  nome={nome}
                  imagem={upload}
                  numero={index + 1}
                />
              </Box>
            </Pressable>
          );
        }}>

        <Menu.Item onPress={() => onRemoveEquipe(id)}>
          <Text fontSize={'14px'} color={'#fff'}>
            Remover jogador
          </Text>
        </Menu.Item>
      </Menu>
    )
  }

  function ListaJogador({ nome, upload, index }: any) {
    return (
      <Box
        marginBottom={'10px'}
        alignItems={'center'}
        borderTopWidth={1}
        borderColor={'#A3A3A3'}>
        <ViewTimesCamp
          nome={nome}
          imagem={upload}
          numero={index + 1}
        />
      </Box>
    )
  }

  function ListaEquipes() {

    return (
      <VStack bg={'#fff'} h={'66%'} borderTopRadius={'10px'} w={'100%'}>
        <Text px={10} py={5} fontSize={'18px'}>
          Equipes inscritas
        </Text>
        <FlatList
          w={'100%'}
          data={equipes}
          renderItem={({ item, index }) => {
            return (
              authData?.tipoUsuario === environment.PERFIL_ATLETICA && campeonato.campeonatoTipo === 0 ?
                <ListaAtletica
                  nome={item.nome}
                  index={index}
                  id={item.id}
                  upload={upload} /> :
                <ListaJogador
                  nome={item.nome}
                  index={index}
                  id={item.id}
                  upload={upload}
                />

            );
          }}
          keyExtractor={item => item.id}
        />
      </VStack>
    )
  }

}
