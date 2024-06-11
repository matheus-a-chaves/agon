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
import { DatePicker } from '../../components/DatePicker';

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

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(CadastroSchema) });
    const { setCampeonatoBody } = useCampeonato();
    const [modalidades, setModalidades] = useState<Modalidade[]>([]);
    const navigation = useNavigation();

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

    return (
        <Container>
            <NovoCampeonato
                title="Novo Amistoso"
                image={{ url: bascket, size: 100 }}

                height={200}
            />
            <Form>
                <Controller
                    control={control}
                    name="nomeCampeonato"
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Buscar time..."
                            onChangeText={onChange}
                            errorMessage={errors.nomeCampeonato?.message}
                        />
                    )}
                />

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
                <HStack space={3}>
                    <Controller
                        control={control}
                        name="data"
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                size={'60%'}
                                placeholder="Data do amistoso"
                                lista={modalidades}
                                errorMessage={errors.modalidade?.message}
                                onValueChange={onChange}
                                selectedValue={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="hora"
                        render={({ field: { onChange, value } }) => (

                            <Input
                                widthForm={'36%'}
                                placeholder="horario"
                                errorMessage={errors.modalidade?.message}
                                onChangeText={onChange}
                            />
                        )}
                    />
                </HStack>
                <Controller
                    control={control}
                    name="local"
                    render={({ field: { onChange, value } }) => (

                        <Input
                            placeholder="Local do amistoso"
                            errorMessage={errors.modalidade?.message}
                            onChangeText={onChange}
                        />
                    )}
                />


                <Button title={'CRIAR'} onPress={handleSubmit(handleConsole)} />
            </Form>
        </Container>
    );
}
