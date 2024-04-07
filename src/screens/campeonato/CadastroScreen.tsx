import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {UploadFileScreen} from './UploadFileScreen';

export function CadastroScreen() {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <>
      <UploadFileScreen />
    </>
  );
}
