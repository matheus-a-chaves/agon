import { Box, HStack, VStack } from 'native-base';
import { SafeAreaView } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useCampeonato } from '../../../contexts/Campeonato';
import NovoCampeonato from '../../../components/NovoCampeonato';
import { Input } from '../../../components/Input';
import Button from '../../../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Endereco } from '../../../interfaces/enderecoModel';
import { CampeonatoService } from '../../../services/campeonato.service';


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


export const EnderecoCampScreen = () => {
    const bascket = require('../../../assets/img/campeonato/basketball.png');
    const route = useRoute();
    const { idCampeonato }: any = route.params;
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

    async function onData(data: any) {
        const endereco: Endereco = {
            cep: data.zipCode,
            rua: data.street,
            numero: data.number,
            cidade: data.city,
            estado: data.state,
            bairro: data.district
        }
        await CampeonatoService.iniciarCampeonato(idCampeonato, endereco)
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraHeight={150}
                keyboardShouldPersistTaps="handled"
            >
                <Box w="100%" h={'100%'} bg={'#fff'} >

                    <VStack justifyContent={'center'} alignItems={'center'} py={5} bg={'#fff'}
                        px={5} space={3}>
                        <NovoCampeonato
                            title={"Endereço Campeonato"}
                            image={{ url: bascket, size: 190 }}
                            descricao="Preencha o endereço onde ocorrerá o evento."
                            height={380}
                        />
                        <VStack w={'100%'} justifyContent={'space-between'}>
                            <VStack justifyContent={'center'} alignItems={'center'} py={1}
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

                        </VStack>
                        <Button title={'INICIAR CAMPEONATO'} size={'full'} onPress={handleSubmit(onData)} />
                    </VStack>

                </Box>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

function zipCodeMask(zipCode: string): string {
    const cleaned = zipCode.replace(/\D/g, '');
    const masked = cleaned.replace(/^(\d{5})(\d)/, '$1-$2');
    return masked;
}
