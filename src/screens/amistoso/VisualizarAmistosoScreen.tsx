import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text, VStack, HStack, Collapse, Avatar, Pressable } from 'native-base';
import Back from '../../components/Back';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PopUpConfirm } from '../../components/PopUpConfirm';
import { useAuth } from '../../contexts/Auth';
import { environment } from '../../../environment';


const games = [
    {
        id: 1,
        home: 'Kraken',
        away: 'Athletico-Pr',
        imgHome: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png",
        imgWay: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png"
    },
    {
        id: 2,
        home: 'Coritiba',
        away: 'Kraken',
        imgHome: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png",
        imgWay: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png"
    },
    {
        id: 3,
        home: 'Kraken',
        away: 'Real Madrid',
        imgHome: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png",
        imgWay: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png"
    },
    {
        id: 4,
        home: 'Kraken',
        away: 'Palmeiras',
        imgHome: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png",
        imgWay: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png"
    },
    {
        id: 5,
        home: 'Coritiba',
        away: 'Kraken',
        imgHome: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png",
        imgWay: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png"
    },
    {
        id: 6,
        home: 'Kraken',
        away: 'Palmeiras',
        imgHome: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png",
        imgWay: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png"
    },
    {
        id: 7,
        home: 'Kraken',
        away: 'Palmeiras',
        imgHome: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png",
        imgWay: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png"
    },
];

const VisualizarAmistosoScreen = () => {
    const navigation = useNavigation();
    const { authData } = useAuth()

    const [openGameId, setOpenGameId] = useState(null);

    const handlePress = (gameId: any) => {
        setOpenGameId(openGameId === gameId ? null : gameId);
    };
    return (
        <ScrollView>
            <Back titulo={'Amistosos'} navigation={navigation} />
            <VStack space={4} px={6} py={6}>
                <Text textAlign={'center'} fontSize={'md'} fontWeight={'500'}>JOGOS AMISTOSOS DE FUTSAL</Text>
                {games.map((game, index) => (
                    <Pressable key={index} p={'10px'} bg="white" borderRadius="md" shadow={2}
                        onPress={
                            () => handlePress(game.id)
                        }
                    >
                        <HStack >
                            <Box w={'30%'} alignItems="center">
                                <Avatar bg={'#004AAD'} size={'40px'} source={{ uri: game.imgHome }} />
                                <Text fontWeight={'500'}>{game.home}</Text>
                            </Box>
                            <Box w={'40%'} alignItems={'center'} justifyContent={'center'}>
                                <Text fontSize={'xl'} fontWeight={'bold'}>X</Text>
                            </Box>
                            <Box alignItems={'center'} w={'30%'}>
                                <Avatar bg={'#004AAD'} size={'40px'} source={{ uri: game.imgWay }} />
                                <Text fontWeight={'500'}>{game.away}</Text>
                            </Box>
                        </HStack>
                        <Collapse isOpen={openGameId === game.id}>
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
                                        <>
                                            <Box bgColor={'#004AAD'} borderRadius={20} w='25px' h={'25px'} alignItems={'center'} justifyContent={'center'}>
                                                <PopUpConfirm
                                                    title={'Deseja cancelar o amistoso?'}
                                                    botaoSecondaryText='Cancelar'
                                                    botaoPrimaryText='Voltar'
                                                    navigation={navigation}
                                                    botaoPrimaryAction={() => null}
                                                    botaoSecondaryAction={() => null}
                                                    icon={
                                                        <MaterialCommunityIcons name="delete" size={18} color="#FFF" />
                                                    } />
                                            </Box>
                                            {/* 
                                            <Box bgColor={'#004AAD'} borderRadius={20} w='25px' h={'25px'} alignItems={'center'} justifyContent={'center'}>
                                                <EditarAmistosoPopUp navigation={navigation} />
                                            </Box> */}
                                        </>
                                    )}
                                </HStack>
                                <HStack space={2} px={6} py={2}>
                                    <VStack space={2} alignItems={'center'}>
                                        <FontAwesome6 name="map-location-dot" size={24} color="#333" />
                                        <FontAwesome5 name="calendar-alt" size={25} color="#333" />
                                    </VStack>
                                    <VStack space={2}>
                                        <Text fontSize={'15px'} color={'#333'}>Rua tal numero, 45</Text>
                                        <Text fontSize={'15px'} color={'#333'}>10/05/2023 - 18:00 horas</Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        </Collapse>
                    </Pressable>
                ))}
            </VStack>
        </ScrollView>
    );
};


export default VisualizarAmistosoScreen;
