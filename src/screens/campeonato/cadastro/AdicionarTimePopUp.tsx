import React, { useEffect } from 'react';
import { Box, Button, HStack, Modal, Pressable, Text, VStack } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { applyMask } from '../../Utils';
import { Input } from '../../../components/Input';
import { CampeonatoService } from '../../../services/campeonato.service';
import { useAuth } from '../../../contexts/Auth';


type FormData = {
    cpfCnpj: string;
};

const AdicionarSchema = yup.object().shape({
    cpfCnpj: yup.string().required('CNPJ é obrigatório'),
});

function ValidEmail(email: any) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function AdicionarTimePopUp({ navigation, campeonato }: any) {
    const { authData } = useAuth();
    const [modalVisible, setModalVisible] = React.useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<FormData>({
        resolver: yupResolver(AdicionarSchema),
        defaultValues: {
            cpfCnpj: ''
        }
    });
    const cpfCnpj = watch('cpfCnpj');

    useEffect(() => {
        if (cpfCnpj) {
            setValue('cpfCnpj', applyMask(cpfCnpj));
        }
    }, [cpfCnpj, setValue]);


    async function hundleForm(data: any) {
        try {
            console.log('cnpj', data.cpfCnpj)
            const cnpj = data.cpfCnpj.replace(/[^\d]+/g, '');

            await CampeonatoService.adicionarEquipe(campeonato.id, cnpj, campeonato.modalidade);
            setModalVisible(false);
            setValue('cpfCnpj', '');

        } catch (error) {
            setValue('cpfCnpj', '');
            setModalVisible(false);
            console.error('Erro ao adicionar jogador:', error);
        }
    }

    return (
        <Box>
            <Modal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                justifyContent="center">
                <Modal.Content width={"100%"} height={"35%"}>
                    <LinearGradient
                        colors={['#004AAD', '#7ED957']}
                        style={{ width: '100%', height: '100%' }}>
                        <Modal.Body h={'100%'}>
                            <VStack>
                                <HStack
                                    alignItems={'center'}
                                    justifyContent={'flex-end'}
                                    px={'10px'}>
                                    <Pressable
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                        }} >
                                        <MaterialIcons name="close" size={28} color="#FFF" />
                                    </Pressable>
                                </HStack>
                                <HStack alignItems="center" justifyContent={'center'} >
                                    <VStack
                                        space={2}
                                        alignItems="center"
                                        justifyContent={'center'}
                                        w='95%'>
                                        <Text
                                            color={'#FFF'}
                                            fontWeight={500}
                                            fontSize={'20px'}>
                                            Adicionar equipe
                                        </Text>

                                        <VStack w='100%'>
                                            <Text
                                                color={'#FFF'}
                                                fontWeight={400}
                                                fontSize={'18px'}
                                                p={'3px'}
                                            >
                                                CNPJ da equipe
                                            </Text>
                                            <Controller
                                                control={control}
                                                name="cpfCnpj"
                                                render={({ field: { onChange, value } }) => (
                                                    <Input

                                                        onChangeText={onChange}
                                                        value={value}
                                                        errorMessage={errors.cpfCnpj?.message}
                                                    />
                                                )}
                                            />
                                        </VStack>
                                    </VStack>
                                </HStack>
                                <HStack>
                                    <Button
                                        flex="1"
                                        bgColor={'#004AAD'}
                                        margin={'10px'}
                                        onPress={() => {
                                            setModalVisible(false);
                                        }}>
                                        <Text color={'#FFF'}
                                            fontWeight={500}
                                            fontSize={'16px'}
                                            textTransform={'uppercase'}>Voltar</Text>
                                    </Button>
                                    <Button flex="1"
                                        bgColor={'#C71C1C'}
                                        margin={'10px'}
                                        onPress={
                                            handleSubmit(hundleForm)
                                        }>
                                        <Text color={'#FFF'}
                                            fontWeight={500}
                                            fontSize={'16px'}
                                            textTransform={'uppercase'}>
                                            Adicionar
                                        </Text>
                                    </Button>
                                </HStack>
                            </VStack>
                        </Modal.Body>
                    </LinearGradient>
                </Modal.Content>

            </Modal>
            <VStack space={8} alignItems="center">
                <Pressable
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }} >
                    <HStack py={'10px'} px={'20px'} alignItems={'center'}>
                        <Ionicons name="add-outline" size={26} color="#fff" />
                        <Text fontSize="16px" color="white" fontWeight="bold" ml={'5px'}>
                            Adicionar equipe
                        </Text>
                    </HStack>
                </Pressable>
            </VStack>
        </Box>
    )
}