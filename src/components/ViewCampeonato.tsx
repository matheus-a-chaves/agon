import React from 'react';
import { Box, Image, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { imageConverter } from '../screens/Utils';

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
      borderRadius={'5px'}
      padding={'5px'}
      flexDirection={'row'}
      borderWidth={1}
      borderColor={'#A3A3A3'}
      bgColor={'#FFF'}
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
      <Box w={'160px'}>
        <Text fontSize={'14px'} fontWeight={'bold'} color={'#A3A3A3'}>
          {props.nome}
        </Text>
        {props.dataCriacao === undefined ? (
          <>
            <Text color={'#A3A3A3'}>Organizador: Externo</Text>
            <Text color={'#A3A3A3'}>Data de inicio: {props.dataInicio}</Text>
          </>
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
