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
import { imageConverter } from '../../Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { ViewTimesCamp } from '../../../components/ViewTimesCamp';
import { Alert, SafeAreaView } from 'react-native';
import { environment } from '../../../../environment';
import { useAuth } from '../../../contexts/Auth';
import { AdicionarTimePopUp } from '../cadastro/AdicionarTimePopUp';
import { Equipe } from '../../../interfaces/equipeInterface';
import { TeamService } from '../../../services/time.service';
import { CampeonatoService } from '../../../services/campeonato.service';
import { formato } from '../../../interfaces/formatoModel';
import PartidasComponent from './PartidasComponent';

export function CampeonatoTimesScreen() {
  const { authData } = useAuth()
  const navigation = useNavigation();
  const route = useRoute();

  const { id }: any = route.params;
  const { campeonato }: any = route.params;
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [iniciado, setIniciado] = useState(false);
  const [iniciar, setIniciar] = useState(false);
  const idCampeonato = campeonato.id;

  useEffect(() => {
    fetchEquipes();
  }, []);

  function verificarIniciadoCampeonato() {
    if (campeonato.quantidadeEquipes === equipes.length) {
      setIniciar(true)
      navigation.navigate('EnderecoCampScreen' as never, { idCampeonato })
    } else {
      setIniciar(false)
      Alert.alert('Quantidade de equipes inscritas está diferente da esperada.')
    }
  }


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
      await CampeonatoService.removerEquipe(parseInt(id), campeonato.id);
      fetchEquipes();
    } catch (error) {
      console.error('Erro ao remover uma equipe:', error);
    }
  }

  async function onAdicionarEquipe() {
    try {
      fetchEquipes();
    } catch (error) {
      console.error('Erro ao adicionar uma equipe:', error);
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
              {authData?.tipoUsuario === environment.PERFIL_ATLETICA &&
                campeonato.campeonatoTipo === 0 && (
                  <Menu.Item onPress={
                    () => {
                      verificarIniciadoCampeonato();
                    }}>Iniciar</Menu.Item>
                )
              }
              {campeonato.formato.id === formato.PONTOS_CORRIDOS && (
                <Menu.Item onPress={() => navigation.navigate('PontosCorridos' as never)}>Pontos corridos</Menu.Item>
              )}
              {campeonato.formato.id === formato.ELIMINATORIA_SIMPLES && (
                <Menu.Item onPress={() => navigation.navigate('ChaveamentoCampeonato', { idCampeonato })}>Chaveamento</Menu.Item>
              )}
              {campeonato.formato.id === formato.FASE_GRUPOS_ELIMINATORIA_SIMPLES && (
                <>
                  <Menu.Item onPress={() => navigation.navigate('FaseDeGrupos' as never)}>Fase de grupos</Menu.Item>
                  <Menu.Item onPress={() => navigation.navigate('ChaveamentoCampeonato' as never)}>Chaveamento</Menu.Item>
                </>
              )}
              {campeonato.formato.id === formato.PONTOS_CORRIDOS_ELIMINATORIA_SIMPLES && (
                <>
                  <Menu.Item onPress={() => navigation.navigate('PontosCorridos' as never)}>Pontos corridos</Menu.Item>
                  <Menu.Item onPress={() => navigation.navigate('ChaveamentoCampeonato', { idCampeonato })}>Chaveamento</Menu.Item>
                </>
              )}
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
          {authData?.tipoUsuario === environment.PERFIL_ATLETICA && campeonato.campeonatoTipo === 0 &&
            campeonato.quantidadeEquipes !== equipes.length
            && (
              <Box alignItems={'flex-start'} justifyContent={'flex-start'} w={'95%'}>
                <AdicionarTimePopUp campeonato={campeonato} onChangeSalvar={onAdicionarEquipe} />
              </Box>
            )}
        </VStack>
      </Box>

      <VStack bg={'#fff'} h={'66%'} borderTopRadius={'10px'} w={'100%'}>
        {iniciado ? (

          <PartidasComponent />
        ) : (<ListaEquipes />)}
      </VStack>
    </SafeAreaView>
  );


  function ListaAtletica({ nome, imagem, index, id }: any) {
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
                  imagem={imagem}
                  numero={index + 1}
                />
              </Box>
            </Pressable>
          );
        }}>

        <Menu.Item onPress={() => onRemoveEquipe(id)}>
          <Text fontSize={'14px'} color={'#fff'}>
            Remover equipe
          </Text>
        </Menu.Item>
      </Menu>
    )
  }

  function ListaJogador({ nome, imagem, index }: any) {
    return (
      <Box
        marginBottom={'10px'}
        alignItems={'center'}
        borderTopWidth={1}
        borderColor={'#A3A3A3'}>
        <ViewTimesCamp
          nome={nome}
          imagem={imagem}
          numero={index + 1}
        />
      </Box>
    )
  }

  function ListaEquipes() {

    return (
      <VStack bg={'#fff'} h={'98%'} borderTopRadius={'10px'} w={'100%'}>
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
                  imagem={item.imagem} /> :
                <ListaJogador
                  nome={item.nome}
                  index={index}
                  id={item.id}
                  imagem={item.imagem}
                />

            );
          }}
          keyExtractor={item => item.id}
        />
      </VStack>
    )
  }

}
