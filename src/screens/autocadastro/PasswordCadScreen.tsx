import { Box, HStack, Image, View, VStack, Text, Pressable } from 'native-base';
import { SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useAutoCadastro } from '../../contexts/FormProvider';

type FormData = {
    senha: string;
    confirmar: string;
};

const CadastroSchema = yup.object().shape({
    senha: yup.string().required('Senha é obrigatório').min(8, 'Senha deve ter no mínimo 8 caracteres'),
    confirmar: yup.string()
        .oneOf([yup.ref('senha'), undefined], 'As senhas devem ser iguais')
        .required('Confirmação de senha é obrigatório')
});


export const PasswordCadScreen = () => {
    const navigation = useNavigation();
    const { autoCadastroData, cadastrar } = useAutoCadastro();

    function onData(data: any) {
        const autocadastro = {
            nomeCompleto: autoCadastroData?.nomeCompleto,
            email: autoCadastroData?.email,
            cpfCnpj: autoCadastroData?.cpfCnpj,
            dataNascimento: autoCadastroData?.dataNascimento,
            cep: autoCadastroData?.cep,
            cidade: autoCadastroData?.cidade,
            estado: autoCadastroData?.estado,
            rua: autoCadastroData?.rua,
            numero: autoCadastroData?.numero,
            bairro: autoCadastroData?.bairro,
            senha: data.senha,
            confirmar: data.confirmar
        };
        cadastrar(autocadastro);
        navigation.navigate('ConfirmarCadScreen' as never)
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(CadastroSchema) });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                    <VStack w={'100%'} h={'70%'} justifyContent={'space-between'}>
                        <VStack justifyContent={'center'} alignItems={'center'} py={20} bg={'#fff'}
                            space={5} w={"100%"}>
                            <Controller
                                control={control}
                                name="senha"
                                render={({ field: { onChange, value } }) => (
                                    <HStack>
                                        <Input
                                            placeholder="Senha"
                                            type={showPassword ? 'text' : 'password'}
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.senha?.message}
                                            paddingRight="50px"
                                        />
                                        <Pressable position={'absolute'}
                                            right={3}
                                            top={3} onPress={() => setShowPassword(!showPassword)}>
                                            {showPassword ?
                                                <Ionicons name="eye-outline" size={28} /> :
                                                <Ionicons name="eye-off-outline" size={28}
                                                    color={'#000'} />}
                                        </Pressable>
                                    </HStack>
                                )}
                            />
                            <Controller
                                control={control}
                                name="confirmar"
                                render={({ field: { onChange, value } }) => (
                                    <HStack>
                                        <Input
                                            placeholder="Confirmar Senha"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.confirmar?.message}
                                            paddingRight="50px"
                                        />
                                        <Pressable
                                            position={'absolute'}
                                            right={3}
                                            top={3}
                                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ?
                                                <Ionicons name="eye-outline" size={28} /> :
                                                <Ionicons name="eye-off-outline" size={28} color={'#000'} />
                                            }
                                        </Pressable>
                                    </HStack>

                                )}
                            />
                        </VStack>
                        <Button title={'Finalizar'} size={'full'} onPress={handleSubmit(onData)} />
                    </VStack>
                </VStack>
            </Box>
        </SafeAreaView>
    );
}
