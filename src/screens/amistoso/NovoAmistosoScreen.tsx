import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Form } from '../../styles/campeonato/CadastroCss';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useForm, Controller, set } from 'react-hook-form';
import NovoCampeonato from '../../components/NovoCampeonato';
import { useCampeonato } from '../../contexts/Campeonato';
import { Modalidade } from '../../interfaces/modalidadesInterface';
import { Select } from '../../components/Select';
import { ModalideService } from '../../services/modalidade.service';
import { HStack } from 'native-base';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { PopUpAgenda } from './PopUpAgenda';
import { TimePicker } from '../../components/TimePicker';
import { equipe } from '../Utils';
import { AmistosoBody, useAmistoso } from '../../contexts/Amistoso';

type FormData = {
    equpeId: string;
    modalidade: string;
    data: string;
    hora: string;
};

const CadastroSchema = yup.object().shape({
    equpeId: yup
        .string()
        .required('Escolher um time é obrigatório'),
    modalidade: yup.string().required('Modalidade é obrigatória'),
    data: yup.string().required('Modalidade é obrigatória'),
    hora: yup.string().required('Modalidade é obrigatória'),
});

export function NovoAmistosoScreen() {
    const { cadastrar } = useAmistoso();
    const bascket = require('../../assets/img/amistoso/novo_amistoso.png');
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(CadastroSchema) });
    const { amistosoData } = useAmistoso();
    const [modalidades, setModalidades] = useState<Modalidade[]>([]);

    useEffect(() => {
        async function fetchModalidades() {
            try {
                const modalidadesData = await ModalideService.buscarModalidade();
                setModalidades(modalidadesData);
            } catch (error) {
                console.error('Erro ao buscar modalidades:', error);
            }
        }
        fetchModalidades();
    }, []);

    function handleConsole(data: FormData) {

        const body: AmistosoBody = {
            equipe: data.equpeId,
            modalidade: parseInt(data.modalidade),
            data: data.data,
            hora: data.hora,
            cep: amistosoData?.cep,
            rua: amistosoData?.rua,
            numero: amistosoData?.numero,
            bairro: amistosoData?.bairro,
            cidade: amistosoData?.cidade,
            estado: amistosoData?.estado,
        }
        cadastrar(body);
        navigation.navigate('Time' as never);
    }

    const handleItemSelect = (id: any, data: any) => {
        setValue('data', data);
        setValue('equpeId', id);
    };

    const changeValue = (value: any) => {
        setValue('hora', value);
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <Container>
                    <NovoCampeonato
                        title="Novo Amistoso"
                        image={{ url: bascket, size: 270 }}
                        height={370}
                    />
                    <Form>
                        <Controller
                            control={control}
                            name="modalidade"
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    placeholder="Selecione a modalidade"
                                    lista={modalidades}
                                    errorMessage={errors.modalidade?.message}
                                    onValueChange={onChange}
                                    selectedValue={value}
                                />
                            )}
                        />
                        <PopUpAgenda flex={1} onItemSelect={handleItemSelect} modalidade={watch('modalidade')} />

                        <HStack space={1}>
                            <Controller
                                control={control}
                                name="hora"
                                render={({ field: { onChange } }) => (
                                    <Pressable>
                                        <TimePicker changeValue={onChange} />
                                    </Pressable>
                                )}
                            />

                        </HStack>
                        <Button title={'AGENDAR'} onPress={handleSubmit(handleConsole)} />
                    </Form>
                </Container>
            </KeyboardAvoidingView >
        </SafeAreaView>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});