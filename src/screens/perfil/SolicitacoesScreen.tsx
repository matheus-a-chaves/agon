import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { NativeBaseProvider, Box, VStack, Text, Image, HStack, Pressable } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AmistosoService } from '../../services/amistoso.service';
import { SolicitacaoService } from '../../services/solicitacao.service';



export interface AmistosoSolicitacao {
    id: number;
    nome: string;
    img: string;
    local: string;
    dataHora: string;
}

async function onAceppt(id: number) {
    try {
        await SolicitacaoService.onAccept(id);
    } catch (error) {
        console.error('Erro ao aceitar:', error);
    }
}

async function onReject(id: number) {
    try {
        await SolicitacaoService.onReject(id);
    } catch (error) {
        console.error('Erro ao recusar:', error);
    }
}


export function SolicitacoesScreen() {
    const navigation = useNavigation();

    const [solicitacoes, setSolicitacoes] = useState<AmistosoSolicitacao[]>([]);

    useEffect(() => {
        async function fetchModalidades() {
            try {
                const solicitacoes = await SolicitacaoService.buscarSolicitacao('1');
                setSolicitacoes(solicitacoes);
            } catch (error) {
                console.error('Erro ao buscar solicitacoes:', error);
            }
        }
        fetchModalidades();
    }, []);

    const amistosoItem: ListRenderItem<AmistosoSolicitacao> = ({ item }) => (
        <VStack
            mt={5}
            w='100%'
            padding={5}
            borderWidth={2}
            borderColor={'#ddd'}
            borderRadius={5}
        >
            <VStack>
                <HStack justifyContent={'space-between'}>
                    <Text color={'#333'} fontSize={'16px'} fontWeight={'500'}>
                        Pedido de amistoso
                    </Text>
                    <Image source={require('../../assets/icons/edit.png')} alt={'editar'} />
                </HStack>
                <HStack >
                    <Box
                        w={'40%'}
                        justifyContent={'center'}
                        alignItems={'center'}>
                        <Box
                            w={'50px'}
                            h={'50px'}
                            borderRadius={30}
                            borderColor={'#A3A3A3'}
                            borderWidth={'1px'}>
                            <Image w={'100%'} h={'100%'} borderRadius={30} source={require('../../assets/img/equipe/equipe-cadastro.png')} alt={'time'} />
                        </Box>
                        <Text color={'#A3A3A3'} >{item.nome}</Text>
                    </Box>

                    <Box w={'60%'}>
                        <Text color={'#A3A3A3'} fontWeight={500}>Data - hora</Text>
                        <Text color={'#A3A3A3'} fontSize={12}>{item.dataHora}</Text>
                        <Text color={'#A3A3A3'} fontWeight={500}>Local</Text>
                        <Text color={'#A3A3A3'} fontSize={12}>{item.local}</Text>
                    </Box>
                </HStack>
            </VStack>
            <HStack justifyContent={'space-around'} mt={'10px'}>
                <Pressable onPress={() => onAceppt(item.id)}
                    px={4}
                    py={1}
                    bg={'#004AAD'}
                    borderRadius={'3px'}>
                    <Text color={'#FFF'}>ACEITAR</Text>
                </Pressable>
                <Pressable onPress={() => onReject(item.id)}
                    bg={'#C71C1C'}
                    px={4}
                    py={1}
                    borderRadius={'3px'}>
                    <Text color={'#FFF'}>RECUSAR</Text>
                </Pressable>
            </HStack>

        </VStack>
    );


    return (
        <NativeBaseProvider>
            <Box flex={1} background={"#fff"}>
                <HStack justifyContent={'space-between'} padding={'5px'} bgColor={'#004AAD'}>
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color={'#fff'}
                        onPress={() => navigation.goBack()}
                    />
                    <Text color={'#fff'} fontWeight={'medium'} fontSize={16}>
                        Solicitações
                    </Text>
                    <Box size={25} />
                </HStack>
                <Box
                    background={'white'}
                    height={'100%'}
                    px={4}
                    borderTopRadius={10}
                    m={5}
                >
                    <FlatList
                        data={solicitacoes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={amistosoItem}
                    />
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

