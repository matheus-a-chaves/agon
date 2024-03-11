import React from 'react';
import {Text, View} from 'react-native';
import {Container} from '../styles/components/ConfrontoComponentCss';

interface ConfrontoComponentProps {
  nome: string;
  foto: string;
}

export function ConfrontoComponent(props: ConfrontoComponentProps) {
  return (
    <Container>
      <Text></Text>
    </Container>
  );
}
