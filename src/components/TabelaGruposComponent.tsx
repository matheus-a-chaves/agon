import React from 'react';
import { Box, VStack, Text, HStack, extendTheme, NativeBaseProvider, Image, FlatList } from 'native-base';
import { upload } from '../screens/Utils';


const data = [
  {
    "id": '1',
    "imagem": "caminho/para/imagem1.png",
    "nome": "Equipe 1",
    "pontos": "10",
    "jogos": "5",
    "vitorias": "3",
    "empates": "1",
    "derrotas": "1",
    "saldoDeGols": "+5"
  },
  {
    "id": '2',
    "imagem": "caminho/para/imagem2.png",
    "nome": "Equipe 2",
    "pontos": "8",
    "jogos": "5",
    "vitorias": "2",
    "empates": "2",
    "derrotas": "1",
    "saldoDeGols": "+3"
  },
  {
    "id": '3',
    "imagem": "caminho/para/imagem2.png",
    "nome": "Equipe 2",
    "pontos": "8",
    "jogos": "5",
    "vitorias": "2",
    "empates": "2",
    "derrotas": "1",
    "saldoDeGols": "+3"
  },
  {
    "id": '4',
    "imagem": "caminho/para/imagem2.png",
    "nome": "Equipe 2",
    "pontos": "8",
    "jogos": "5",
    "vitorias": "2",
    "empates": "2",
    "derrotas": "1",
    "saldoDeGols": "+3"
  }
];


interface FaseDeGrupos {
  nomeTime: string;
  pontos: number;
  colocacao: number;
  saldoGols: number;
  empates: number;
  grupo: string;
}

interface Equipes {
  imagem: string,
  nome: string;
  pontos: string,
  jogos: string;
  vitorias: string;
  empates: string;
  derrotas: string;
  saldoDeGols: string;
}

export function TabelaGruposComponent(props: FaseDeGrupos) {
  const Equipes = (props: Equipes) => {
    return (
      <HStack flexDirection={'row'} h={'35px'} alignItems={'center'} >
        <HStack w={'50%'} alignItems={'center'} >
          <Box
            h="32px"
            w="32px"
            flexDirection={'row'}
            borderColor={"#A3A3A3"}
            borderRadius={100}
            borderWidth={1}
          >
            <Image
              h="32px"
              w="32px"
              source={{ uri: props.imagem }}
              alt="imagem do time"
            />
          </Box>
          <Text px={4}>{props.nome}</Text>
        </HStack>
        <HStack h="100%" w={'50%'} borderTopWidth={'1px'} alignItems={'center'} borderColor={"#E3E3E3"} >
          <Text w={'25px'} h={'25px'} textAlign={'center'} color={"#7E7E7E"}>{props.pontos}</Text>
          <Text w={'25px'} h={'25px'} textAlign={'center'} color={"#7E7E7E"}>{props.jogos}</Text>
          <Text w={'25px'} h={'25px'} textAlign={'center'} color={"#7E7E7E"}>{props.vitorias}</Text>
          <Text w={'25px'} h={'25px'} textAlign={'center'} color={"#7E7E7E"}>{props.empates}</Text>
          <Text w={'25px'} h={'25px'} textAlign={'center'} color={"#7E7E7E"}>{props.derrotas}</Text>
          <Text w={'25px'} h={'25px'} textAlign={'center'} color={"#7E7E7E"}>{props.saldoDeGols}</Text>
        </HStack>
      </HStack>
    )
  }

  return (
    <Box >
      <Text
        color={'#A3A3A3'}
        fontWeight={'bold'}
        fontSize={'16px'}
        py={'10px'}
        fontFamily={'RobotoCondensed700'}>
        Grupo {props.grupo}
      </Text>
      <VStack bgColor={'#FFF'} w={'340px'} h={'210px'} borderRadius={'5px'} paddingLeft={4} >
        <HStack paddingTop={4}>
          <Box w={'50%'}>
            <Text fontWeight={'bold'}>Equipes</Text>
          </Box>
          <Box
            w={'50%'}
            flexDirection={'row'}
            py={'2px'}
            borderBottomColor={'#E3E3E3'}
          >
            <Text w='25px' textAlign={'center'} fontWeight={'bold'}>PT</Text>
            <Text w='25px' textAlign={'center'} fontWeight={'bold'}>JG</Text>
            <Text w='25px' textAlign={'center'} fontWeight={'bold'}>VT</Text>
            <Text w='25px' textAlign={'center'} fontWeight={'bold'}>EP</Text>
            <Text w='25px' textAlign={'center'} fontWeight={'bold'}>DT</Text>
            <Text w='25px' textAlign={'center'} fontWeight={'bold'}>SG</Text>
          </Box>
        </HStack>

        <FlatList
          w={'100%'}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <HStack w={'100%'} marginTop={'5px'}>
                <Equipes
                  nome={item.nome}
                  imagem={upload}
                  pontos={item.pontos}
                  jogos={item.jogos}
                  vitorias={item.vitorias}
                  empates={item.empates}
                  derrotas={item.derrotas}
                  saldoDeGols={item.saldoDeGols}
                />
              </HStack>
            );
          }}
          keyExtractor={item => item.id}
        />



      </VStack>
    </Box>

  );
}
