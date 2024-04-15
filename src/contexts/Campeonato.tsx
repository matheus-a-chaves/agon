import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {CampeonatoService} from '../services/campeonato.service';

export interface CampeonatoBody {
  nome?: string;
  quantidadeEquipes?: number;
  formato?: number;
  modalidade?: number;
  imagem?: string;
  regulamento?: string;
  dataInicio?: Date;
  dataFim?: Date;
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

  useEffect(() => {}, [campeonatoData]);

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
      CampeonatoService.cadastro(campeonato);
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
