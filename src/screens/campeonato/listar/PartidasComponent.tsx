import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text, VStack, HStack, Collapse, Avatar, Pressable, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/Auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/Button';
import { Controller, set, useForm } from 'react-hook-form';
import { TimePicker } from '../../../components/TimePicker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '../../../components/DatePicker';
import { Input } from '../../../components/Input';
import Feather from 'react-native-vector-icons/Feather';
import { EditarEnderecoPopUp } from '../cadastro/EditarEnderecoPopUp';
import { InserirDataHora } from '../cadastro/InserirDataHora';

const partidas = [
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

const PartidasComponent = () => {
    const navigation = useNavigation();
    const [rodada, setRodada] = useState(1);
    const [resultados, setResultados] = useState()
    const totalRodadas = 5;

    const [expirado, setExpirado] = useState(false);
    const { authData } = useAuth()

    const [openGameId, setOpenGameId] = useState(null);

    const handlePress = (partidaId: any) => {
        setOpenGameId(openGameId === partidaId ? null : partidaId);
    };
    function expirar() {
        setExpirado(true);
    }

    function onChangeDados(dados: any) {
        setResultados(dados)
    }

    return (
        <Box>
            <ScrollView>
                <VStack space={4}>
                    <HStack justifyContent={'center'} alignItems={'center'}
                        borderColor={'#A3A3A3'} borderBottomWidth={1}
                        py={2}
                    >
                        {rodada > 1 ?
                            <IconButton
                                w={'50px'}
                                icon={<Ionicons name="arrow-back" size={24} color="#A3A3A3" />}
                                onPress={() => setRodada(rodada - 1)}
                            /> : <Box w={'50px'} />}

                        <Text
                            textAlign={'center'}
                            fontSize={20}
                            fontWeight={'600'}
                            color="#A3A3A3" >
                            RODADA {rodada}
                        </Text>
                        {rodada < totalRodadas ?
                            <IconButton
                                w={'50px'}
                                icon={<Ionicons name="arrow-forward" size={24} color="#A3A3A3" />}
                                onPress={() => setRodada(rodada + 1)}
                            /> : <Box w={'50px'} />}

                    </HStack>
                    <HStack justifyContent={'center'} >
                        <Text textAlign={'center'} color={'#E50000'} fontSize={'14px'} >
                            Por favor, insira data e hora das partidas da rodada {rodada}
                        </Text>
                    </HStack>
                    <VStack px={4} space={4}>
                        {partidas.map((partida, index) => (
                            <Pressable key={index} p={'10px'} bg="white" borderRadius="md" shadow={4}
                                borderColor={'#EEE'} borderWidth={1}

                                onPress={
                                    () => handlePress(partida.id)

                                }
                            >
                                <HStack >
                                    <Box w={'30%'} alignItems="center">
                                        <Box w={'53px'} h={'53px'} borderRadius={5} alignItems={'center'}
                                            justifyContent={'center'}>
                                            <LinearGradient
                                                colors={['#004AAD', '#7ED957']}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <Avatar bg={'#FFF'} size={'50px'} source={{ uri: partida.imgHome }} />
                                            </LinearGradient>
                                        </Box>
                                    </Box>


                                    {openGameId === partida.id ?
                                        <HStack w={'40%'} alignItems={'center'} justifyContent={'space-between'}>

                                            <Input widthForm='50px' h={'50px'} />
                                            <Text fontSize={'26px'} fontWeight={'bold'} color={'#A3A3A3'}>X</Text>
                                            <Input widthForm='50px' h={'50px'} />
                                        </HStack>
                                        :
                                        <Box w={'40%'} alignItems={'center'} justifyContent={'center'}>
                                            <Text fontSize={'26px'} fontWeight={'bold'} color={'#A3A3A3'}>X</Text>
                                        </Box>
                                    }

                                    <Box alignItems={'center'} w={'30%'}>
                                        <Box w={'53px'} h={'53px'} borderRadius={5} alignItems={'center'}
                                            justifyContent={'center'}>
                                            <LinearGradient
                                                colors={['#004AAD', '#7ED957']}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <Avatar bg={'#FFF'} size={'50px'} source={{ uri: partida.imgHome }} />
                                            </LinearGradient>
                                        </Box>
                                    </Box>
                                </HStack>
                                <Collapse isOpen={openGameId === partida.id}>
                                    <DataExpiradaComponent onChange={onChangeDados} />
                                    {/* <InformacoesPartida /> */}
                                    {/* <InserirDataHora /> */}
                                </Collapse>
                            </Pressable>
                        ))}
                    </VStack>
                </VStack>
                <Button title={'PROXIMA FASE'} mx={5} my={5}>Próxima rodada</Button>
            </ScrollView>

        </Box>
    );
};




function InformacoesPartida() {
    return (
        <VStack my={2} borderRadius={5} borderWidth={1} p={4} borderColor={"#E2E2E2"}>

            <HStack justifyContent={'space-evenly'} alignItems={'center'} >
                <Box w={'24px'} />
                <Text textAlign={'center'} color={'#333'} fontSize={16} fontWeight={500}  >
                    INFORMAÇÕES DA PARTIDA
                </Text>
                <EditarEnderecoPopUp />
            </HStack>
            <VStack mx={2} space={1}>
                <Text color={'#333'}>
                    Endereço: Rua dos Bobos, nº 0
                </Text >
                <Text color={'#333'}>
                    Data: 12/12/2021
                </Text>
                <Text color={'#333'}>
                    Hora:  18:00 PM
                </Text>
            </VStack>
        </VStack>)
}

function DataExpiradaComponent({ onChange }: any) {

    type FormResultados = {
        carAmareloEq1: string;
        carAmareloEq2: string;
        carVermelhoEq1: string;
        carVermelhoEq2: string;
        penaltisEq1: string;
        penaltisEq2: string;
    };


    const CadastroSchema = yup.object().shape({
        carAmareloEq1: yup
            .string()
            .required('Escolher um time é obrigatório'),
        carAmareloEq2: yup.string().required('Modalidade é obrigatória'),
        carVermelhoEq1: yup.string().required('Modalidade é obrigatória'),
        carVermelhoEq2: yup.string().required('Modalidade é obrigatória'),
        penaltisEq1: yup.string().required('Modalidade é obrigatória'),
        penaltisEq2: yup.string().required('Modalidade é obrigatória'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormResultados>({ resolver: yupResolver(CadastroSchema) });

    function handleResultados(data: any) {
        onChange(data);
    }


    return (
        <VStack my={2} borderRadius={5} borderWidth={1} p={4} borderColor={"#E2E2E2"}>


            <VStack alignItems={'center'}>
                <Text color="#A3A3A3">Cartões amarelos</Text>
                <HStack w={'100%'} alignItems={'center'} justifyContent={'space-between'}>

                    <Controller
                        control={control}
                        name="carAmareloEq1"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                widthForm='40%'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.carAmareloEq1?.message}
                            />

                        )}
                    />

                    <Text fontSize={'26px'} fontWeight={'bold'} color={'#A3A3A3'}>X</Text>
                    <Controller
                        control={control}
                        name="carAmareloEq2"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                widthForm='40%'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.carAmareloEq2?.message}
                            />

                        )}
                    />
                </HStack>
            </VStack>


            <VStack alignItems={'center'}>
                <Text color="#A3A3A3">Cartões Vermelhos</Text>
                <HStack w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                    <Controller
                        control={control}
                        name="carVermelhoEq1"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                widthForm='40%'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.carVermelhoEq1?.message}
                            />

                        )}
                    />
                    <Text fontSize={'26px'} fontWeight={'bold'} color={'#A3A3A3'}>X</Text>
                    <Controller
                        control={control}
                        name="carVermelhoEq2"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                widthForm='40%'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.carVermelhoEq2?.message}
                            />
                        )}
                    />
                </HStack>
            </VStack>

            <VStack alignItems={'center'}>
                <Text color="#A3A3A3">Pênaltis</Text>
                <HStack w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                    <Controller
                        control={control}
                        name="penaltisEq1"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                widthForm='40%'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.penaltisEq1?.message}
                            />
                        )}
                    />
                    <Text fontSize={'26px'} fontWeight={'bold'} color={'#A3A3A3'}>X</Text>
                    <Controller
                        control={control}
                        name="penaltisEq2"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                widthForm='40%'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.penaltisEq2?.message}
                            />
                        )}
                    />
                </HStack>
            </VStack>

            <Button mt={5} h={'50px'} w={'full'} title={'SALVAR'} onPress={handleSubmit(handleResultados)} />
        </VStack>)
}


export default PartidasComponent;
