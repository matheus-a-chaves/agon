import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../contexts/Auth';
import {UploadFileScreen} from './UploadFileScreen';

const imageCorrida = require('../../assets/cadastro-img/tela01.png');

export function CadastroScreen() {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <>
      <UploadFileScreen />
    </>
  );
}
