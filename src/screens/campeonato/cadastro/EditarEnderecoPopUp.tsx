import React, { useCallback, useEffect } from 'react';
import { Box, Button, HStack, Modal, Pressable, Text, VStack } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Input } from '../../../components/Input';
import { useAutoCadastro } from '../../../contexts/FormProvider';
import * as yup from 'yup';
import { DatePicker } from '../../../components/DatePicker';
import { TimePicker } from '../../../components/TimePicker';

const CadastroSchema = yup.object().shape({
    zipCode: yup.string().required('CEP é obrigatório').min(9, 'CEP inválido').max(9, 'CEP inválido'),
    street: yup.string().required('Rua é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
    city: yup.string().required('Cidade é obrigatório'),
    state: yup.string().required('UF é obrigatório'),
    district: yup.string().required('Bairro é obrigatório'),
    data: yup.string().required('Data é obrigatória'),
    hora: yup.string().required('Hora é obrigatória'),
});

type FormData = {
    zipCode: string;
    street: string;
    number: string;
    city: string;
    state: string;
    district: string;
    data: string;
    hora: string;
};

export function EditarEnderecoPopUp({ navigation }: any) {
    const [modalVisible, setModalVisible] = React.useState(false);
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
    }, [setValue]);

    const handleFetchAddress = useCallback(async (cep: string) => {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        handleSetData(data);
    }, [handleSetData]);

    useEffect(() => {
        setValue('zipCode', zipCodeMask(zipCode));
        if (zipCode?.length === 9) {
            handleFetchAddress(zipCode);
        }
    }, [zipCode, handleFetchAddress, setValue]);

    const onSubmit = (data: FormData) => {
        setAutoCadastroBody({
            cep: data.zipCode,
            cidade: data.city,
            estado: data.state,
            rua: data.street,
            numero: data.number,
            bairro: data.district,
        });
        setModalVisible(false);
    };

    return (
        <Box>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} justifyContent="center">
                <Modal.Content width={"100%"} height={"56%"}>
                    <LinearGradient colors={['#004AAD', '#7ED957']} style={{ width: '100%', height: '100%' }}>
                        <Modal.Body h={'100%'}>
                            <VStack>
                                <HStack alignItems={'center'} justifyContent={'flex-end'} px={'10px'}>
                                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                        <MaterialIcons name="close" size={28} color="#FFF" />
                                    </Pressable>
                                </HStack>
                                <HStack alignItems="center" justifyContent={'center'}>
                                    <VStack space={2} alignItems="center" justifyContent={'center'} w='95%'>
                                        <Text color={'#FFF'} fontWeight={500} fontSize={'20px'}>Atualizar Endereço</Text>
                                        <VStack w={'100%'} justifyContent={'center'} alignItems={'center'} py={5} space={3}>
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
                                            <HStack flexDirection={'row'} w='full' space={2}>
                                                <Controller
                                                    control={control}
                                                    name="data"
                                                    render={({ field: { onChange } }) => (
                                                        <DatePicker
                                                            placeholder="Dia do jogo"
                                                            size={'50%'}
                                                            onDateChange={(value: any) => {
                                                                onChange(value);
                                                            }}
                                                            errorMessage={errors.data?.message}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    control={control}
                                                    name="hora"
                                                    render={({ field: { onChange } }) => (
                                                        <Pressable>
                                                            <TimePicker changeValue={onChange} size={'156px'} />
                                                        </Pressable>
                                                    )}
                                                />
                                            </HStack>
                                        </VStack>

                                    </VStack>
                                </HStack>
                                <HStack>
                                    <Button flex="1" bgColor={'#004AAD'} margin={'10px'} onPress={() => setModalVisible(false)}>
                                        <Text color={'#FFF'} fontWeight={500} fontSize={'16px'} textTransform={'uppercase'}>Voltar</Text>
                                    </Button>
                                    <Button flex="1" bgColor={'#C71C1C'} margin={'10px'} onPress={handleSubmit(onSubmit)}>
                                        <Text color={'#FFF'} fontWeight={500} fontSize={'16px'} textTransform={'uppercase'}>Atualizar</Text>
                                    </Button>
                                </HStack>
                            </VStack>
                        </Modal.Body>
                    </LinearGradient>
                </Modal.Content>
            </Modal>
            <VStack space={8} alignItems="center">
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Feather name="edit" size={24} color="#A3A3A3" />
                </Pressable>
            </VStack>
        </Box>
    );
}

function zipCodeMask(zipCode: string): string {
    const cleaned = zipCode.replace(/\D/g, '');
    const masked = cleaned.replace(/^(\d{5})(\d)/, '$1-$2');
    return masked;
}
