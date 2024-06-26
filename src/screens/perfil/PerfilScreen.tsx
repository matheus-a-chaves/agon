import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Image, Pressable, Text, HStack, Center, VStack } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useAuth } from '../../contexts/Auth';
import { environment } from '../../../environment';
import { imageConverter } from '../Utils';

export function PerfilScreen() {
  const navigation = useNavigation();
  const { signOut, authData } = useAuth();
  const imagem = imageConverter(authData?.imagemPerfil, require('../../assets/icons/user.png'));
  return (
    <Box>
      <VStack bgColor={'#0A1423'} margin={'10px'} paddingBottom={'20px'} borderRadius={'5px'}>
        <Center>
          <Text color={'#FFFFFF'} fontSize={'xl'} fontWeight={500} mt={5}>
            Perfil
          </Text>
          <Image
            source={imagem}
            alt="user"
            size={'xl'}
            borderRadius={'full'}
            mt={5}
            borderWidth={2}
            borderColor={'#FFFFFF'}
          />
          <Text color={'#FFFFFF'} fontSize={'xl'} fontWeight={500} mt={5}>
            {authData?.nome}
          </Text>
          <Text color={'#FFFFFF'} fontSize={'sm'} fontWeight={300}>
            {authData?.email}
          </Text>
        </Center>
      </VStack>
      <VStack margin={'10px'} space={2}>
        {authData?.tipoUsuario === environment.PERFIL_ATLETICA && (
          <ButtonCustom onPress={() => {
            navigation.navigate('Solicitacoes' as never)
          }} title='Solicitações'
            children={<Ionicons name={'duplicate-outline'} size={36} color={'#FFF'} />}
          />
        )}
        <ButtonCustom onPress={() => {
          navigation.navigate('EditarContaScreen' as never)
        }} title='Editar conta'
          children={<MaterialCommunityIcons name={'account-circle-outline'} size={36} color={'#FFF'} />}
        />
        <ButtonCustom onPress={() => {
          navigation.navigate('AlterarSenha' as never)
        }} title='Alterar senha'
          children={<SimpleLineIcons name={'lock'} size={36} color={'#FFF'} />} />

        <ButtonCustom onPress={signOut} title='Sair'
          children={<MaterialIcons name="logout" size={36} color={'#FFF'} />} />
      </VStack>
    </Box>
  );

  function ButtonCustom(props: any) {
    return (
      <Pressable bgColor={'#0A1423'} h={'55px'} borderRadius={'5px'} onPress={props.onPress} >
        <HStack justifyContent={'space-between'} alignItems={'center'} h={'100%'} paddingLeft={'20px'}>
          <HStack justifyContent={'space-between'} alignItems={'center'} space={5}>
            {props.children}
            <Text color={'#FFFFFF'} fontSize={'lg'} fontWeight={500}>
              {props.title}
            </Text>
          </HStack>
          <HStack paddingRight={'20px'}>
            <MaterialIcons name="navigate-next" size={36} color={'#FFF'} />
          </HStack>
        </HStack>
      </Pressable>
    );
  }
}
