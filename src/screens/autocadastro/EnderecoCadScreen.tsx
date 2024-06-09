import { Box, HStack, Image, View, VStack, Text } from 'native-base';
import { SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { Controller, set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from '../../components/DatePicker';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useAutoCadastro } from '../../contexts/FormProvider';


type FormData = {
    zipCode: string;
    street: string;
    number: string;
    city: string;
    state: string;
    district: string;
};

const CadastroSchema = yup.object().shape({
    zipCode: yup.string().required('CEP é obrigatório').min(9, 'CEP inválido').max(9, 'CEP inválido'),
    street: yup.string().required('Rua é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
    city: yup.string().required('Cidade é obrigatório'),
    state: yup.string().required('UF é obrigatório'),
    district: yup.string().required('Bairro é obrigatório'),
});


export const EnderecoCadScreen = () => {
    const { setAutoCadastroBody } = useAutoCadastro();

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

    useEffect(() => {
        setValue('zipCode', zipCodeMask(zipCode));
        if (zipCode?.length === 9) {
            handleFetchAddress(zipCode);
        }
    }, [handleFetchAddress, zipCode]);

    const navigation = useNavigation();

    function onData(data: any) {
        setAutoCadastroBody({
            cep: data.zipCode,
            cidade: data.city,
            estado: data.state,
            rua: data.street,
            numero: data.number,
            bairro: data.district
        });
        navigation.navigate('PasswordCadScreen' as never)
    }

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <Box w="100%" h={'100%'} bg={'#fff'} marginBottom={'20px'}>
                <HStack justifyContent={'space-between'} padding={'5px'} bgColor={'#004AAD'}>
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color={'#fff'}
                        onPress={() => navigation.goBack()}
                    />
                    <Text color={'#fff'} fontWeight={'medium'} fontSize={16}>
                        Cadastro
                    </Text>
                    <Box size={25} />
                </HStack>
                <VStack justifyContent={'center'} alignItems={'center'} py={5} bg={'#fff'}
                    px={5} space={3}>
                    <View>
                        <Image
                            style={{ width: 240, height: 120 }}
                            source={require('../../assets/logo_login.png')}
                            alt={'Logo'}
                        />
                    </View>
                    <VStack w={'100%'} justifyContent={'space-between'} h={'70%'}>
                        <VStack justifyContent={'center'} alignItems={'center'} py={5}
                            space={3} w={"100%"}>
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
                        <Button title={'Proximo'} size={'full'} onPress={handleSubmit(onData)} />
                    </VStack>
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
