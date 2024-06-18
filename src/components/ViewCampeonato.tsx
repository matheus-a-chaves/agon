import React from 'react';
import { Box, HStack, Image, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { dateFormat, imageConverter } from '../screens/Utils';

interface ViewCampeonatoProps {
  nome: string;
  imagem: string;
  dataCriacao?: string;
  dataInicio?: string;
}

export function ViewCampeonato(props: ViewCampeonatoProps) {

  return (
    <Box
      w={'330px'}
      h={'80px'}
      alignItems={'center'}
      justifyContent={'space-around'}
      borderRadius={'8px'}
      padding={'5px'}
      flexDirection={'row'}
      borderWidth={1}
      borderColor={'#EEE'}
      bgColor={'#FFF'}
      shadow={3}
    >
      <Box w="54px" h="54px">
        <Box
          w="100%"
          h="100%"
          borderRadius={'100px'}
          borderWidth={1}
          borderColor={'#004AAD'}>
          <Image
            h="100%"
            w="100%"
            borderRadius={100}
            source={imageConverter(props.imagem, require('../assets/icons/splash.png'))}
            alt="imagem do time"
          />
        </Box>
      </Box>
      <Box w={'180px'} px={'1px'}>
        <Text fontSize={'16px'} fontWeight={'bold'} color={'#A3A3A3'} >
          {props.nome}
        </Text>
        {props.dataCriacao === undefined ? (
          <HStack>
            <Text color={'#A3A3A3'} flex={1}>Data de inicio - {dateFormat(props.dataInicio)}</Text>
          </HStack>
        ) : (
          <Text color={'#A3A3A3'}>Modalidade - {props.dataCriacao}</Text>
        )}
      </Box>
      <Box>
        <MaterialIcons name="navigate-next" size={36} color={'#7ED957'} />
      </Box>
    </Box>
  );
}
