import React from 'react';
import {Text, View} from 'react-native';
import {
  Container,
  Head,
  TextHead,
  TextColocacao,
  ViewColocacao,
  ViewPontos,
  ViewTable,
  TextPontos,
  HeadClassificacao,
  HeadPontos,
} from '../styles/components/TabelaGruposComponentCss';

interface FaseDeGrupos {
  nomeTime: string;
  pontos: number;
  colocacao: number;
  saldoGols: number;
  empates: number;
}

export function TabelaGruposComponent(props: FaseDeGrupos) {
  return (
    <Container>
      <Head>
        <HeadClassificacao>
          <Text
            style={{
              flex: 1,
              fontSize: 13,
              textAlign: 'left',
              color: '#fff',
            }}>
            CLASSIFICAÇÃO
          </Text>
        </HeadClassificacao>
        <HeadPontos>
          <TextHead>P</TextHead>
          <TextHead>J</TextHead>
          <TextHead>V</TextHead>
          <TextHead>E</TextHead>
          <TextHead>D</TextHead>
          <TextHead>SG</TextHead>
        </HeadPontos>
      </Head>
      <ViewTable>
        <ViewColocacao>
          <TextColocacao>1</TextColocacao>
          <TextColocacao>{props.nomeTime}</TextColocacao>
        </ViewColocacao>
        <ViewPontos>
          <TextPontos>3</TextPontos>
          <TextPontos style={{backgroundColor: '#FFF'}}>1</TextPontos>
          <TextPontos>1</TextPontos>
          <TextPontos style={{backgroundColor: '#FFF'}}>0</TextPontos>
          <TextPontos>0</TextPontos>
          <TextPontos style={{backgroundColor: '#FFF'}}>2</TextPontos>
        </ViewPontos>
      </ViewTable>
    </Container>
  );
}
