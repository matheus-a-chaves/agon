import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {useAuth} from '../contexts/Auth';
import LinearGradient from 'react-native-linear-gradient';
import {TextHeader} from '../styles/MatamataScreenCss';
import {ConfrontoComponent} from '../components/ConfrontoComponent';
import {Text} from 'react-native';
import {TabelaGruposComponent} from '../components/TabelaGruposComponent';
import {Container} from '../styles/FaseDeGrupoScreenCss';

const trofeu = require('../assets/icons/trofeu.png');

export function FaseDeGrupoScreen() {
  const navigation = useNavigation();
  const {signOut} = useAuth();

  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);

  return (
    <LinearGradient
      colors={['#004AAD', '#7ED957']}
      style={{
        flex: 1,
        padding: 0,
      }}>
      <TextHeader>FASE DE GRUPOS</TextHeader>
      <Container>
        <TabelaGruposComponent
          nomeTime={'NOMETIME'}
          pontos={5}
          colocacao={5}
          saldoGols={5}
          empates={5}
        />
        <TabelaGruposComponent
          nomeTime={'NOMETIME'}
          pontos={5}
          colocacao={5}
          saldoGols={5}
          empates={5}
        />
        <TabelaGruposComponent
          nomeTime={'NOMETIME'}
          pontos={5}
          colocacao={5}
          saldoGols={5}
          empates={5}
        />
        <TabelaGruposComponent
          nomeTime={'NOMETIME'}
          pontos={5}
          colocacao={5}
          saldoGols={5}
          empates={5}
        />
      </Container>
    </LinearGradient>
  );
}
