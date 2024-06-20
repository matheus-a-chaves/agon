import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Form
} from '../../styles/campeonato/CadastroCss';
import NovaEquipe from '../../components/NovoCampeonato';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleImage } from '../Utils';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import * as yup from 'yup';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Modalidade } from '../../interfaces/modalidadesInterface';
import UploadComponent from '../../components/UploadComponent';
import { ModalideService } from '../../services/modalidade.service';
import { useTeam } from '../../contexts/Team';

interface EquipeBody {
    nome: string;
    modalidade: number;
    imagem: string;
}

type FormData = {
    nomeEquipe: string;
    modalidade: string;
};

const CadastroSchema = yup.object().shape({
    nomeEquipe: yup
        .string()
        .required('Nome da equipe é obrigatório')
        .min(3, 'Nome da equipe deve ter no mínimo 3 caracteres'),
    modalidade: yup.string().required('Modalidade é obrigatória'),
});

export function NovaEquipeScreen() {
    const logo = require('../../assets/img/equipe/equipe-cadastro.png');
    const navigation = useNavigation();
    const { cadastrar } = useTeam();
    const [nomeImage, setNomeImage] = useState('Imagem de perfil');
    const [uri, setUri] = useState('');
    const [modalidades, setModalidades] = useState<Modalidade[]>([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(CadastroSchema) });

    useEffect(() => {
        async function fetchModalidades() {
            try {
                const modalidade = await ModalideService.buscarModalidade();
                setModalidades(modalidade);
            } catch (error) {
                console.error('Erro ao buscar modalidades:', error);
            }
        }
        fetchModalidades();
    }, []);

    const handleImageCampeonato = async () => {
        const { uri, fileName } = await handleImage();
        setNomeImage(fileName);
        setUri(uri);
    };

    function handleConsole(data: FormData) {

        const equipeBody: EquipeBody = {
            nome: data.nomeEquipe,
            modalidade: parseInt(data.modalidade),
            imagem: uri,
        }
        cadastrar(equipeBody);

        navigation.navigate('Time' as never);
    }

    return (
        <Container>
            <NovaEquipe
                title="Criar nova equipe"
                image={{ url: logo, size: 190 }}
                descricao="Selecione uma imagem de perfil para equipe, nome e modalidade"
                height={400}
            />
            <Form>
                <Controller
                    control={control}
                    name="nomeEquipe"
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Nome da Equipe"
                            onChangeText={onChange}
                            errorMessage={errors.nomeEquipe?.message}
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
                <UploadComponent
                    nome={nomeImage}
                    onPress={() => handleImageCampeonato()}
                />

                <Button title={'CADASTRAR'} onPress={handleSubmit(handleConsole)} />

            </Form>
        </Container>
    );
}
