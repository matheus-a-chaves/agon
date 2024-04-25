import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import { useAuth } from '../../../contexts/Auth';
import LinearGradient from 'react-native-linear-gradient';
import { TextHeader } from '../../../styles/MatamataScreenCss';
import { TabelaGruposComponent } from '../../../components/TabelaGruposComponent';
import { Container } from '../../../styles/FaseDeGrupoScreenCss';
import { ScrollView, VStack } from 'native-base';

const trofeu = require('../assets/icons/trofeu.png');

export function FaseDeGrupoScreen() {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  useEffect(() => { }, []);

  return (
    <ScrollView>
      <VStack alignItems={'center'} py={10}>
        <TabelaGruposComponent
          grupo='A'
          nomeTime={'NOMETIME'}
          pontos={5}
          colocacao={5}
          saldoGols={5}
          empates={5}
        />
        <TabelaGruposComponent
          grupo='B'
          nomeTime={'NOMETIME'}
          pontos={5}
          colocacao={5}
          saldoGols={5}
          empates={5}
        />
        <TabelaGruposComponent
          grupo='C'
          nomeTime={'NOMETIME'}
          pontos={5}
          colocacao={5}
          saldoGols={5}
          empates={5}
        />
      </VStack>
    </ScrollView>
  );
}
