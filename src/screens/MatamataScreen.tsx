import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {useAuth} from '../contexts/Auth';
import LinearGradient from 'react-native-linear-gradient';
import {
  Header,
  TextHeader,
  QuartasFinaisView,
  Container,
  LinhaAfter,
  After,
  SemiFinalView,
  Before,
  Final,
  LinhaUnica,
  ImageTrofeu,
  Campeao,
} from '../styles/MatamataScreenCss';
import {ConfrontoComponent} from '../components/ConfrontoComponent';
import {Text} from 'react-native';

const trofeu = require('../assets/icons/trofeu.png');

export function MatamataScreen() {
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
      <Header>
        <TextHeader>Chaveamento</TextHeader>
      </Header>
      <Container>
        <QuartasFinaisView>
          <ConfrontoComponent nome="matheus" foto="foto" />
          <ConfrontoComponent nome="matheus" foto="foto" />
          <ConfrontoComponent nome="matheus" foto="foto" />
          <ConfrontoComponent nome="matheus" foto="foto" />
        </QuartasFinaisView>
        <After>
          <LinhaAfter />
          <LinhaAfter />
        </After>
        <SemiFinalView>
          <ConfrontoComponent nome="matheus" foto="foto" />
          <Before />
          <ConfrontoComponent nome="matheus" foto="foto" />
        </SemiFinalView>
        <Final>
          <LinhaUnica />
          <ConfrontoComponent nome="matheus" foto="foto" />
        </Final>
        <Campeao>
          <ImageTrofeu source={trofeu} />
          <ConfrontoComponent nome="matheus" foto="foto" />
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
            }}>
            Campeão
          </Text>
        </Campeao>
        <Final style={{alignItems: 'flex-start'}}>
          <LinhaUnica />
          <ConfrontoComponent nome="matheus" foto="foto" />
        </Final>
        <SemiFinalView>
          <ConfrontoComponent nome="matheus" foto="foto" />
          <Before style={{borderLeftWidth: 2, borderRightWidth: 0}} />
          <ConfrontoComponent nome="matheus" foto="foto" />
        </SemiFinalView>
        <After>
          <LinhaAfter style={{borderLeftWidth: 2, borderRightWidth: 0}} />
          <LinhaAfter style={{borderLeftWidth: 2, borderRightWidth: 0}} />
        </After>
        <QuartasFinaisView>
          <ConfrontoComponent nome="matheus" foto="foto" />
          <ConfrontoComponent nome="matheus" foto="foto" />
          <ConfrontoComponent nome="matheus" foto="foto" />
          <ConfrontoComponent nome="matheus" foto="foto" />
        </QuartasFinaisView>
      </Container>
    </LinearGradient>
  );
}
