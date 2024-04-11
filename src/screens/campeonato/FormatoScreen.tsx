import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Container, Form} from '../../styles/campeonato/CadastroCss';
import {Button} from '../../components/Button';
import {useForm, Controller} from 'react-hook-form';
import NovoCampeonato from '../../components/NovoCampeonato';
import {faq} from '../Utils';
import {useCampeonato} from '../../contexts/Campeonato';
import {Select} from '../../components/Select';
import {Contador} from '../../components/Contador';
import {Formato} from '../../interfaces/formatoModel';
import {FormatoService} from '../../services/formato.service';

type FormData = {
  formato: string;
};

const CadastroSchema = yup.object().shape({
  formato: yup.string().required('Formato é obrigatório'),
});

export function FormatoScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({resolver: yupResolver(CadastroSchema)});
  const {cadastrar, campeonatoData} = useCampeonato();
  const [formatos, setFormatos] = useState<Formato[]>([]);
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

  const [quantidade, setQuantidade] = useState(0);

  function salvar(data: FormData) {
    const campeonato = {
      nome: campeonatoData?.nome,
      quantidadeEquipes: quantidade,
      formato: parseInt(data.formato),
      modalidade: campeonatoData?.modalidade,
      imagem: campeonatoData?.imagem,
    };
    console.log(campeonato);
    cadastrar(campeonato);
  }
  return (
    <Container>
      <NovoCampeonato
        title="Novo Campeonato"
        image={{url: faq, size: 200}}
        descricao="Escolha um nome para o campeonato e selecione a modalidade"
        height={383}
      />
      <Form>
        <Controller
          control={control}
          name="formato"
          render={({field: {onChange, value}}) => (
            <Select
              placeholder="Formato do campeonato"
              lista={formatos}
              errorMessage={errors.formato?.message}
              onValueChange={onChange}
              selectedValue={value}
            />
          )}
        />

        <Contador quantidade={quantidade} setQuantidade={setQuantidade} />

        <Button title={'FINALIZAR'} onPress={handleSubmit(salvar)} />
      </Form>
    </Container>
  );
}
