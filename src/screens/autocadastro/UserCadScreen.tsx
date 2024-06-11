import { Box, HStack, Image, View, VStack, Text } from 'native-base';
import { SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from '../../components/DatePicker';
import { useEffect } from 'react';
import { useAutoCadastro } from '../../contexts/FormProvider';
import { applyMask } from '../Utils';

type FormData = {
    nomeCompleto: string;
    email: string;
    cpfCnpj: string;
    dataNascimento: Date;
};

const CadastroSchema = yup.object().shape({
    nomeCompleto: yup.string().required('Nome é obrigatório').matches(/^[a-zA-Z'-\s]*$/, 'Nome inválido'),
    email: yup.string().required('Email é obrigatório').test('email', 'Email inválido', (value) => ValidEmail(value)),
    cpfCnpj: yup.string().required('Cpf é obrigatório'),
    dataNascimento: yup.date().required('Data de nascimento é obrigatória')
});

function ValidEmail(email: any) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export const UserCadScreen = () => {
    const navigation = useNavigation();
    const { setAutoCadastroBody } = useAutoCadastro();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<FormData>({
        resolver: yupResolver(CadastroSchema),
        defaultValues: {
            nomeCompleto: '',
            email: '',
            cpfCnpj: '',
            dataNascimento: new Date(),
        }
    });

    const cpfCnpj = watch('cpfCnpj');

    function onData(data: any) {
        setAutoCadastroBody({
            nomeCompleto: data.nomeCompleto,
            email: data.email,
            cpfCnpj: data.cpfCnpj,
            dataNascimento: data.dataNascimento
        });
        navigation.navigate('EnderecoCadScreen' as never)
    }

    useEffect(() => {
        if (cpfCnpj) {
            setValue('cpfCnpj', applyMask(cpfCnpj));
        }
    }, [cpfCnpj, setValue]);

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
                    px={5} space={3}
                >
                    <View>
                        <Image
                            style={{ width: 240, height: 120 }}
                            source={require('../../assets/logo_login.png')}
                            alt={'Logo'}
                        />
                    </View>
                    <VStack w={'100%'} h={'70%'} justifyContent={'space-between'}>
                        <VStack justifyContent={'center'} alignItems={'center'} py={5} bg={'#fff'}
                            space={3} w={"100%"}>

                            <Controller
                                control={control}
                                name="nomeCompleto"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        placeholder="Nome do completo"
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.nomeCompleto?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        placeholder="Email"
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.email?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="cpfCnpj"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        placeholder="CPF/CNPJ"
                                        onChangeText={onChange}
                                        maxLength={18}
                                        value={value}
                                        errorMessage={errors.cpfCnpj?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="dataNascimento"
                                render={({ field: { onChange } }) => (
                                    <DatePicker
                                        placeholder="Data de Nascimento"
                                        size={'100%'}
                                        onDateChange={(value: any) => {
                                            onChange(value);
                                        }}
                                        errorMessage={errors.dataNascimento?.message}
                                    />
                                )}
                            />
                        </VStack>
                        <Button title={'Proximo'} size={'full'} onPress={handleSubmit(onData)} mt={10} />
                    </VStack>
                </VStack>
            </Box>
        </SafeAreaView>
    );
}
