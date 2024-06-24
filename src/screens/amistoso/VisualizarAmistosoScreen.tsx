import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text, VStack, HStack, Collapse, Avatar, Pressable } from 'native-base';
import Back from '../../components/Back';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PopUpConfirm } from '../../components/PopUpConfirm';
import { useAuth } from '../../contexts/Auth';
import { environment } from '../../../environment';
import { PartidaService } from '../../services/partidas.service';
import { formatDateTime, imageConverter } from '../Utils';
import { AmistosoService } from '../../services/amistoso.service';


const VisualizarAmistosoScreen = () => {
    const imagem = require('../../assets/img/amistoso/brasao.png')
    const route = useRoute();
    const navigation = useNavigation();
    const { authData } = useAuth()
    const { equipe } = route.params as any;
    const [openGameId, setOpenGameId] = useState(null);
    const [amistosos, setAmistosos] = useState<any[]>([]);


    useEffect(() => {
        fetchAmistosos();
    }, []);

    const fetchAmistosos = async () => {
        try {
            const amistosos = await PartidaService.buscarPartidasAmistosas(equipe.idEquipe);
            setAmistosos(amistosos);
        } catch (error) {
            console.error('Erro ao buscar amistosos:', error);
        }
    };

    const cancelar = async (id: any) => {
        try {
            await AmistosoService.cancelar(id);
            fetchAmistosos();
        } catch (error) {
            console.error('Erro ao buscar amistosos:', error);
        }
    };




    const handlePress = (gameId: any) => {
        setOpenGameId(openGameId === gameId ? null : gameId);
    };
    return (
        <ScrollView>
            <Back titulo={'Amistosos'} navigation={navigation} />
            <VStack space={4} px={6} py={6}>
                <Text textAlign={'center'} fontSize={'md'} fontWeight={'500'}>JOGOS AMISTOSOS DE {equipe.modalidade.nome.toUpperCase()}</Text>
                {amistosos.map((amistoso, index) => {
                    const formatDate = formatDateTime(amistoso.dataPartida)
                    return (
                        <Pressable key={index} p={'10px'} bg="white" borderRadius="md" shadow={2}
                            onPress={
                                () => handlePress(amistoso.idAmistoso)
                            }
                        >
                            <HStack >
                                <Box w={'30%'} alignItems="center">
                                    <Avatar bg={'#004AAD'} size={'40px'} source={imageConverter(amistoso.equipeCasa.imagem, imagem)} />
                                    <Text fontWeight={'500'}>{amistoso.equipeCasa.nome}</Text>
                                </Box>
                                <Box w={'40%'} alignItems={'center'} justifyContent={'center'}>
                                    <Text fontSize={'xl'} fontWeight={'bold'}>X</Text>
                                </Box>
                                <Box alignItems={'center'} w={'30%'}>
                                    <Avatar bg={'#004AAD'} size={'40px'} source={imageConverter(amistoso.equipeVisitante.imagem, imagem)} />
                                    <Text fontWeight={'500'}>{amistoso.equipeVisitante.nome}</Text>
                                </Box>
                            </HStack>
                            <Collapse isOpen={openGameId === amistoso.idAmistoso}>
                                <Box
                                    mt={4}
                                    borderWidth={'1px'}
                                    borderRadius={'5px'}
                                    borderColor={'#A3A3A3'} >
                                    <HStack px={2} py={'5px'} space={2}>
                                        <Box flex={1} pl={4}>
                                            <Text
                                                fontSize={'md'}
                                                fontWeight={'500'}
                                                color={'#333'}
                                            >INFORMAÇÕES</Text>
                                        </Box>
                                        {authData?.tipoUsuario === environment.PERFIL_ATLETICA && (
                                            <Box bgColor={'#004AAD'} borderRadius={20} w='25px' h={'25px'} alignItems={'center'} justifyContent={'center'}>
                                                <PopUpConfirm
                                                    title={'Deseja cancelar o amistoso?'}
                                                    botaoSecondaryText='Cancelar'
                                                    botaoPrimaryText='Voltar'
                                                    navigation={navigation}
                                                    botaoPrimaryAction={() => null}
                                                    botaoSecondaryAction={() => cancelar(amistoso.idAmistoso)}
                                                    icon={
                                                        <MaterialCommunityIcons name="delete" size={18} color="#FFF" />
                                                    } />
                                            </Box>
                                        )}
                                    </HStack>
                                    <VStack space={2} px={6} py={2}>
                                        <HStack space={2} alignItems={'center'}>
                                            <FontAwesome6 name="map-location-dot" size={24} color="#333" />
                                            <Text fontSize={'15px'} color={'#333'}>{amistoso.endereco.rua + ", " + amistoso.endereco.numero + ", " + amistoso.endereco.bairro}</Text>
                                        </HStack>
                                        <HStack space={2}>
                                            <FontAwesome5 name="calendar-alt" size={25} color="#333" />
                                            <Text fontSize={'15px'} color={'#333'}>{formatDate.data} - {formatDate.hora} horas</Text>
                                        </HStack>
                                    </VStack>
                                </Box>
                            </Collapse>
                        </Pressable>
                    )
                })}
            </VStack>
        </ScrollView>
    );
};


export default VisualizarAmistosoScreen;
