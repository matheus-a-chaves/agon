import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Container, Form} from '../../styles/campeonato/CadastroCss';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {useForm, Controller} from 'react-hook-form';
import NovoCampeonato from '../../components/NovoCampeonato';
import {bascket} from '../Utils';
import {useCampeonato} from '../../contexts/Campeonato';
import {Modalidade} from '../../interfaces/modalidadesInterface';
import {Select} from '../../components/Select';

const icon = require('../../assets/icons/add.png');

type FormData = {
  nomeCampeonato: string;
  modalidade: string;
};

const modalidade: Modalidade[] = [
  {id: '1', nome: 'Futebol'},
  {id: '2', nome: 'Basquete'},
  {id: '3', nome: 'Volei'},
];

const CadastroSchema = yup.object().shape({
  nomeCampeonato: yup
    .string()
    .required('Nome do campeonato é obrigatório')
    .min(3, 'Nome do campeonato deve ter no mínimo 3 caracteres'),
  modalidade: yup.string().required('Modalidade é obrigatória'),
});

export function NomeModalidadeScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({resolver: yupResolver(CadastroSchema)});
  const {setNome, cadastrar} = useCampeonato();

  const navigation = useNavigation();

  useEffect(() => {}, []);

  function handleConsole(data: FormData) {
    console.log(data);
    setNome(data.nomeCampeonato);
    cadastrar(); // Pass the 'data' argument to the 'cadastrar' function
    navigation.navigate('Upload' as never);
  }

  return (
    <Container>
      <NovoCampeonato
        title="Novo Campeonato"
        image={{url: bascket, size: 200}}
        descricao="Escolha um nome para o campeonato e selecione a modalidade"
        height={383}
      />
      <Form>
        <Controller
          control={control}
          name="nomeCampeonato"
          render={({field: {onChange}}) => (
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
          render={({field: {onChange, value}}) => (
            <Select
              placeholder="Selecione a modalidade"
              modalidades={modalidade}
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
