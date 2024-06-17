import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Form } from '../../styles/campeonato/CadastroCss';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useForm, Controller } from 'react-hook-form';
import NovoCampeonato from '../../components/NovoCampeonato';
import { useCampeonato } from '../../contexts/Campeonato';
import { Modalidade } from '../../interfaces/modalidadesInterface';
import { Select } from '../../components/Select';
import { ModalideService } from '../../services/modalidade.service';
import { HStack } from 'native-base';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { PopUpAgenda } from './PopUpAgenda';

type FormData = {
    nomeCampeonato: string;
    modalidade: string;
    data: string;
    hora: string;
    local: string;
};

const CadastroSchema = yup.object().shape({
    nomeCampeonato: yup
        .string()
        .required('Nome do campeonato é obrigatório')
        .min(3, 'Nome do campeonato deve ter no mínimo 3 caracteres'),
    modalidade: yup.string().required('Modalidade é obrigatória'),
    data: yup.string().required('Modalidade é obrigatória'),
    hora: yup.string().required('Modalidade é obrigatória'),
    local: yup.string().required('Modalidade é obrigatória'),
});

export function NovoAmistosoScreen() {
    const bascket = require('../../assets/img/amistoso/novo_amistoso.png');
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(CadastroSchema) });
    const { setCampeonatoBody } = useCampeonato();
    const [modalidades, setModalidades] = useState<Modalidade[]>([]);
    const [modalidadeSelecionada, setModalidadeSelecionada] = useState<number>(0);

    useEffect(() => {
        // Função para buscar as modalidades quando o componente for montado
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
        setCampeonatoBody({
            nome: data.nomeCampeonato,
            modalidade: parseInt(data.modalidade),
        });
        console.log('formatos')
        navigation.navigate('Formato' as never);
    }

    const handleItemSelect = (id: number, data: any) => {
        console.log('Selected item ID:', id);
        console.log('Selected item data:', data);
    };


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
                                render={({ field: { onChange, value } }) => (

                                    <Input
                                        widthForm={'100%'}
                                        placeholder="horario"
                                        errorMessage={errors.modalidade?.message}
                                        onChangeText={onChange}
                                    />
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
        justifyContent: 'center', // Center the input in the middle of the screen
    },
});