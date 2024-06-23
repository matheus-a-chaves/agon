import { Box, HStack, VStack, Text } from 'native-base';
import { SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { handleImage } from '../Utils';
import { ButtonAdd, Icon } from '../../styles/campeonato/CadastroCss';
import { useAuth } from '../../contexts/Auth';
import { environment } from '../../../environment';

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
    const icon = require('../../assets/icons/add.png');
    const { update, authData } = useAuth();
    const [uri, setURL] = useState(null);
    const [nomeImage, setNomeImage] = useState('Imagem de perfil');

    const handleImageCampeonato = async () => {
        const { uri, fileName } = await handleImage();
        setNomeImage(fileName);
        setURL(uri);
    };

    const setValues = () => {
        if (authData && authData.cep && authData?.nome && authData?.numero) {
            setValue('zipCode', authData.cep);
            setValue('name', authData?.nome);
            setValue('number', authData?.numero.toString());
        }
    };


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



    useEffect(() => {
        setValue('zipCode', zipCodeMask(zipCode));
        if (zipCode?.length === 9) {
            handleFetchAddress(zipCode);
        }
    }, [handleFetchAddress, zipCode]);

    useEffect(() => {
        setValues();
    }, []);


    const navigation = useNavigation();

    function onData(data: any) {
        if (authData && authData.id) {
            const editarCadastro = {
                nome: data.name,
                cep: data.zipCode,
                cidade: data.city,
                estado: data.state,
                rua: data.street,
                numero: data.number,
                bairro: data.district,
                imagemPerfil: uri || authData.imagemPerfil,
                dataNascimento: authData.dataNascimento,
            };

            update(editarCadastro, authData.id)
            navigation.navigate('Perfil' as never)

        } else {
            console.error('authData or authData.id is undefined');
        }
    }

    return (

        <Box w="100%" h={'100%'} bg={'#fff'} >
            <HStack justifyContent={'space-between'} padding={'5px'} bgColor={'#004AAD'} position={'fixed'}>
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
            <Box w={'100%'} px={5} py={5}>
                <HStack space={5}>
                    <VStack>
                        <Text color="#A3A3A3" fontSize={16} fontWeight={500}>
                            {environment.PERFIL_ATLETICA === authData?.tipoUsuario ?
                                `CNPJ` : `CPF`}
                        </Text>
                        <Text color="#A3A3A3">{environment.PERFIL_ATLETICA === authData?.tipoUsuario ?
                            authData?.cnpj : authData?.cpf}</Text>
                    </VStack>
                    <VStack flex={1}>
                        <Text color="#A3A3A3" fontSize={16} fontWeight={500}>Email</Text>
                        <Text color="#A3A3A3">{authData?.email}</Text>
                    </VStack>

                </HStack>
                <Text color="#A3A3A3" fontSize={24} fontWeight={200}>---------------------------------------------------</Text>
            </Box>
            <SafeAreaView style={{ height: '100%', display: 'flex', justifyContent: 'flex-start' }} >
                <VStack justifyContent={'center'} alignItems={'center'} bg={'#fff'}
                    px={5} space={3}>
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
                        <VStack>
                            <Text color="#A3A3A3" fontSize={16} fontWeight={500} mt={2} mb={1}>Imagem</Text>
                            <Box
                                flexDirection={'row'}
                                alignItems={'center'}
                                w={'100%'}
                                h={50}
                                bgColor={'#fff'}
                                borderRadius={5}
                                justifyContent={'space-between'}
                                shadow={2}
                                px={'4px'}
                                pl={'20px'}
                            >
                                <Text color={'#A3A3A3'} fontSize={16}>{nomeImage}</Text>
                                <ButtonAdd onPress={() => handleImageCampeonato()}>
                                    <Icon source={icon} />
                                </ButtonAdd>
                            </Box>
                        </VStack>

                    </VStack>
                    <Button title={'ATUALIZAR'} size={'full'} onPress={handleSubmit(onData)} />
                </VStack>
            </SafeAreaView>
        </Box>


    );
}

function zipCodeMask(zipCode: string): string {
    const cleaned = zipCode.replace(/\D/g, '');
    const masked = cleaned.replace(/^(\d{5})(\d)/, '$1-$2');
    return masked;
}
