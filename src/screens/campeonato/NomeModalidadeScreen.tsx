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

type FormData = {
  nomeCampeonato: string;
  modalidade: string;
};

const CadastroSchema = yup.object().shape({
  nomeCampeonato: yup
    .string()
    .required('Nome do campeonato é obrigatório')
    .min(3, 'Nome do campeonato deve ter no mínimo 3 caracteres'),
  modalidade: yup.string().required('Modalidade é obrigatória'),
});

export function NomeModalidadeScreen() {
  const bascket = require('../../assets/img/campeonato/basketball.png');

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
    navigation.navigate('Formato' as never);
  }

  return (
    <Container>
      <NovoCampeonato
        title="Novo Campeonato"
        image={{ url: bascket, size: 200 }}
        descricao="Escolha um nome para o campeonato e selecione a modalidade"
        height={383}
      />
      <Form>
        <Controller
          control={control}
          name="nomeCampeonato"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Nome do Campeonato"
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

        <Button title={'PROXIMO'} onPress={handleSubmit(handleConsole)} />
      </Form>
    </Container>
  );
}
