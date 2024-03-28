import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';
import {Button} from '../../styles/SharedStyles';
import {
  ButtonAdd,
  Container,
  Form,
  Icon,
  UploadCampo,
} from '../../styles/campeonato/CadastroCss';
import NovoCampeonato from '../../components/NovoCampeonato';
import {upload} from '../Utils';

const icon = require('../../assets/icons/add.png');

export function UploadFileScreen() {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <Container>
      <NovoCampeonato
        title="Novo Campeonato"
        image={{url: upload, size: 230}}
        descricao="Adicione os arquivos necessários para criar um campeonato"
        height={438}
      />
      <Form>
        <UploadCampo>
          <Text>Imagem de perfil</Text>
          <ButtonAdd>
            <Icon source={icon} />
          </ButtonAdd>
        </UploadCampo>

        <UploadCampo>
          <Text>Regulamento pdf</Text>
          <ButtonAdd>
            <Icon source={icon} />
          </ButtonAdd>
        </UploadCampo>
        <Button
          style={{marginTop: 10}}
          onPress={() => navigation.navigate('NomeModalidade' as never)}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: '500',
            }}>
            PROXIMO
          </Text>
        </Button>
      </Form>
    </Container>
  );
}
