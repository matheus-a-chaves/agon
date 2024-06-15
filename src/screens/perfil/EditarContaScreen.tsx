import { Box, HStack, Image, View, VStack, Text } from 'native-base';
import { SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from '@react-navigation/native';

import { Controller, set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../../components/Input';
import Button from '../../components/Button';



type FormData = {
    zipCode: string;
    street: string;
    number: string;
    city: string;
    state: string;
    district: string;
    name: string;
};

const CadastroSchema = yup.object().shape({
    zipCode: yup.string().required('CEP é obrigatório').min(9, 'CEP inválido').max(9, 'CEP inválido'),
    street: yup.string().required('Rua é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
    city: yup.string().required('Cidade é obrigatório'),
    state: yup.string().required('UF é obrigatório').min(2, 'UF inválido').max(2, 'UF inválido'),
    district: yup.string().required('Bairro é obrigatório'),
    name: yup.string().required('Nome é obrigatório'),
});


export const EditarContaScreen = () => {

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(CadastroSchema),
        defaultValues: {
            zipCode: '',
            street: '',
            number: '',
            city: '',
            state: '',
            district: '',
            name: ''
        }
    });

    const zipCode = watch('zipCode');

    const handleSetData = useCallback((data: any) => {
        setValue('street', data.logradouro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
        setValue('district', data.bairro);
    }, []);


    const handleFetchAddress = useCallback(async (cep: string) => {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        handleSetData(data);
    }, []);

    const campeonatoOrAmistoso = (screen: string) => {

    }

    useEffect(() => {
        setValue('zipCode', zipCodeMask(zipCode));
        if (zipCode?.length === 9) {
            handleFetchAddress(zipCode);
        }

    }, [handleFetchAddress, zipCode]);

    const navigation = useNavigation();

    function onData(data: any) {

        // setCampeonatoBody({
        //     cep: data.zipCode,
        //     cidade: data.city,
        //     estado: data.state,
        //     rua: data.street,
        //     numero: data.number,
        //     bairro: data.district
        // });
        navigation.navigate('Perfil' as never)

    }

    return (
        <SafeAreaView style={{ height: '100%', display: 'flex', justifyContent: 'center' }} >
            <Box w="100%" h={'100%'} bg={'#fff'} >
                <HStack justifyContent={'space-between'} padding={'5px'} bgColor={'#004AAD'}>
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color={'#fff'}
                        onPress={() => navigation.goBack()}
                    />
                    <Text color={'#fff'} fontWeight={'medium'} fontSize={16}>
                        Editar conta
                    </Text>
                    <Box size={25} />
                </HStack>
                <VStack justifyContent={'center'} alignItems={'center'} py={5} bg={'#fff'}
                    px={5} space={3}>
                    <Box w={'100%'}>
                        <HStack>
                            <VStack flex={1} >
                                <Text color="#A3A3A3" fontSize={16} fontWeight={500}>CNPJ</Text>
                                <Text color="#A3A3A3">75.095.679/0001-49</Text>
                            </VStack>
                            <VStack flex={1}>
                                <Text color="#A3A3A3" fontSize={16} fontWeight={500}>Email</Text>
                                <Text color="#A3A3A3">Kraken@ufpr</Text>
                            </VStack>

                        </HStack>
                        <Text color="#A3A3A3" fontSize={24} fontWeight={200}>---------------------------------------------------</Text>
                    </Box>
                    <VStack w={'100%'} justifyContent={'space-between'}>
                        <VStack justifyContent={'center'} py={1}
                            space={3} w={"100%"} >
                            <Text color="#A3A3A3" fontSize={16} fontWeight={500}>Nome</Text>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        widthForm='100%'
                                        placeholder="Nome"
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.name?.message}
                                    />
                                )}
                            />
                        </VStack>

                        <VStack justifyContent={'center'} py={1}
                            space={3} w={"100%"}>
                            <Text color="#A3A3A3" fontSize={16} fontWeight={500}>Endereço</Text>
                            <HStack space={2}>
                                <Controller
                                    control={control}
                                    name="zipCode"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            widthForm='38%'
                                            maxLength={9}
                                            placeholder="CEP"
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.zipCode?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="city"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            widthForm='42%'
                                            placeholder="Cidade"
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.city?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="state"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            widthForm='15%'
                                            placeholder="UF"
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.state?.message}
                                        />
                                    )}
                                />
                            </HStack>

                            <Controller
                                control={control}
                                name="street"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        widthForm='100%'
                                        placeholder="Rua"
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.street?.message}
                                    />
                                )}
                            />

                            <HStack space={2}>
                                <Controller
                                    control={control}
                                    name="number"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            widthForm='38%'
                                            placeholder="Nº"
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.number?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="district"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            widthForm='60%'
                                            placeholder="Bairro"
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.district?.message}
                                        />
                                    )}
                                />
                            </HStack>
                        </VStack>

                    </VStack>
                    <Button title={'ATUALIZAR'} size={'full'} onPress={handleSubmit(onData)} />
                </VStack>

            </Box>

        </SafeAreaView>
    );
}

function zipCodeMask(zipCode: string): string {
    const cleaned = zipCode.replace(/\D/g, '');
    const masked = cleaned.replace(/^(\d{5})(\d)/, '$1-$2');
    return masked;
}
