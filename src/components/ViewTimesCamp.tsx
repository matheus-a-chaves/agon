import React from 'react';
import {Box, HStack, Image, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ViewTimesCampProps {
  numero: number;
  nome: string;
  imagem: string;
}

export function ViewTimesCamp(props: ViewTimesCampProps) {
  return (
    <Box
      w={'330px'}
      h={'60px'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      borderRadius={'5px'}
      padding={'10px'}
      flexDirection={'row'}
      borderColor={'#A3A3A3'}
      bgColor={'#FFF'}>
      <HStack alignItems={'center'} space={5}>
        <Text fontSize={'18px'} fontWeight={'bold'} color={'#A3A3A3'}>
          {props.numero}
        </Text>
        <Box
          w="40px"
          h="40px"
          borderRadius={'100px'}
          borderWidth={1}
          borderColor={'#004AAD'}>
          <Image
            h="100%"
            w="100%"
            borderRadius={100}
            source={{uri: props.imagem}}
            alt="imagem do time"
          />
        </Box>
      </HStack>
      <Box px={5}>
        <Text fontSize={'16px'} fontWeight={'bold'} color={'#A3A3A3'}>
          {props.nome}
        </Text>
      </Box>
    </Box>
  );
}
