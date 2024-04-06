import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';
import {Button} from '../../styles/SharedStyles';
import {
  ButtonAdd,
  Container,
  Form,
  UploadCampo,
  Icon,
} from '../../styles/campeonato/CadastroCss';
import NovoCampeonato from '../../components/NovoCampeonato';
import {handleImage, upload} from '../Utils';
import {useCampeonato} from '../../contexts/Campeonato';

export function UploadFileScreen() {
  const icon = require('../../assets/icons/add.png');
  const navigation = useNavigation();
  const {setCampeonatoBody} = useCampeonato();

  useEffect(() => {}, []);

  const handleImageCampeonato = async () => {
    const imageUrl = await handleImage();
    setCampeonatoBody({urlImage: imageUrl});
  };

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
          <ButtonAdd onPress={() => handleImageCampeonato()}>
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
