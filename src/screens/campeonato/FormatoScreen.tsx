import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Form } from '../../styles/campeonato/CadastroCss';
import { Button } from '../../components/Button';
import { useForm, Controller } from 'react-hook-form';
import NovoCampeonato from '../../components/NovoCampeonato';
import { useCampeonato } from '../../contexts/Campeonato';
import { Select } from '../../components/Select';
import { Contador } from '../../components/Contador';
import { Formato } from '../../interfaces/formatoModel';
import { FormatoService } from '../../services/formato.service';
import { DatePicker } from '../../components/DatePicker';
import { Box } from 'native-base';

type FormData = {
  formato: string;
  dataInicio: Date;
  dataFim: Date;
  quantidade: number;
};

const CadastroSchema = yup.object().shape({
  formato: yup.string().required('Formato é obrigatório'),
  dataInicio: yup.date().required('Data inicio é obrigatória'),
  dataFim: yup
    .date()
    .required('Data de fim é obrigatória')
    .min(yup.ref('dataInicio'), 'Deve ser maior que a de início'),
  quantidade: yup
    .number()
    .required('Quantidade é obrigatória')
    .min(2, 'Quantidade deve ser no minimo 2'),
});

export function FormatoScreen() {
  const faq = require('../../assets/img/campeonato/basketball.png');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(CadastroSchema) });

  const { cadastrar, campeonatoData } = useCampeonato();
  const [formatos, setFormatos] = useState<Formato[]>([]);
  const [dataInicio, setDataInicio] = useState('');
  const [quantidade, setQuantidade] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchFormatos() {
      try {
        const formatosData = await FormatoService.buscarFormatos();
        setFormatos(formatosData);
      } catch (error) {
        console.error('Erro ao buscar modalidades:', error);
      }
    }
    fetchFormatos();
  }, []);

  function salvar(data: FormData) {
    const campeonato = {
      nome: campeonatoData?.nome,
      quantidadeEquipes: quantidade,
      formato: parseInt(data.formato),
      modalidade: campeonatoData?.modalidade,
      imagem: campeonatoData?.imagem,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      regulamento: campeonatoData?.regulamento,
    };
    cadastrar(campeonato);
    navigation.navigate('CampeonatosTimes' as never);
  }
  return (
    <Container>
      <NovoCampeonato
        title="Novo Campeonato"
        image={{ url: faq, size: 200 }}
        descricao="Escolha um nome para o campeonato e selecione a modalidade"
        height={383}
      />
      <Form>
        <Controller
          control={control}
          name="formato"
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Formato do campeonato"
              lista={formatos}
              errorMessage={errors.formato?.message}
              onValueChange={onChange}
              selectedValue={value}
            />
          )}
        />
        <Box
          flexDirection={'row'}
          display={'flex'}
          justifyContent={'space-between'}>
          <Controller
            control={control}
            name="dataInicio"
            render={({ field: { onChange } }) => (
              <DatePicker
                title={'Previsão de início'}
                defaultValue={new Date()}
                onDateChange={(value: any) => {
                  onChange(value);
                  setDataInicio(value);
                }}
                errorMessage={errors.dataInicio?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="dataFim"
            render={({ field: { onChange } }) => (
              <DatePicker
                title={'Previsão de fim'}
                defaultValue={dataInicio || new Date()}
                onDateChange={(value: any) => {
                  onChange(value);
                }}
                errorMessage={errors.dataFim?.message}
              />
            )}
          />
        </Box>
        <Controller
          control={control}
          name="quantidade"
          render={({ field: { onChange } }) => (
            <Contador
              quantidade={quantidade}
              onChangeContador={(quantidade: number) => {
                onChange(quantidade);
                setQuantidade(quantidade);
              }}
              errorMessage={errors.quantidade?.message}
            />
          )}
        />

        <Button title={'FINALIZAR'} onPress={handleSubmit(salvar)} />
      </Form>
    </Container>
  );
}
