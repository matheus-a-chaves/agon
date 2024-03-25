import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {
  Container,
  FundoInfo,
  Image,
  TextInfo,
  Form,
  ButtonAdd,
  Icon,
  UploadCampo,
} from '../../styles/campeonato/UploadFileScreenCss';
import {Button} from '../../styles/SharedStyles';

const image = require('../../assets/img/campeonato/upload-file.png');
const icon = require('../../assets/icons/add.png');

export function UploadFileScreen() {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <Container>
      <FundoInfo>
        <TextInfo>Novo Campeonato</TextInfo>
        <Image source={image} />
        <TextInfo>Adicione arquivos do campeonato</TextInfo>
      </FundoInfo>
      <Form>
        <UploadCampo>
          <Text>Imagem de perfil</Text>
          <ButtonAdd>
            <Icon source={icon} />
          </ButtonAdd>
        </UploadCampo>

        <UploadCampo>
          <Text>Imagem de perfil</Text>
          <ButtonAdd>
            <Icon source={icon} />
          </ButtonAdd>
        </UploadCampo>
        <Button>
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
