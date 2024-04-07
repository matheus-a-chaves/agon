import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

export interface CampeonatoBody {
  nome?: string;
  quantidadeEquipes?: number;
  formato?: any;
  modalidade?: string;
  urlImage?: string;
}

interface CampeonatoContextData {
  campeonatoData?: CampeonatoBody;
  cadastrar(campeonato: any): void;
  setCampeonatoBody(novaPropriedade: Partial<CampeonatoBody>): void;
}

interface CampeonatoProviderProps {
  children: React.ReactNode;
}

export const CampeonatoContext = createContext<CampeonatoContextData>(
  {} as CampeonatoContextData,
);

export const CampeonatoProvider: React.FC<CampeonatoProviderProps> = ({
  children,
}) => {
  const [campeonatoData, setCampeonato] = useState<Partial<CampeonatoBody>>();

  useEffect(() => {
    console.log('campeonatoData', campeonatoData);
  }, [campeonatoData]);

  function setCampeonatoBody(novaPropriedade: Partial<CampeonatoBody>) {
    setCampeonato(prevCampeonatoData => ({
      ...prevCampeonatoData,
      ...novaPropriedade,
    }));
  }

  return (
    <CampeonatoContext.Provider
      value={{
        campeonatoData,
        setCampeonatoBody,
        cadastrar,
      }}>
      {children}
    </CampeonatoContext.Provider>
  );

  function cadastrar(campeonato: any) {
    try {
      console.log('cadastro', campeonato);
    } catch (error: any) {
      Alert.alert('404');
      return error;
    }
  }
};

export function useCampeonato() {
  const context = useContext(CampeonatoContext);
  return context;
}
