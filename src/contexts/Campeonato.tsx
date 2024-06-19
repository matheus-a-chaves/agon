import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CampeonatoService } from '../services/campeonato.service';

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

export interface CampeonatoList {
  id: string;
  nome: string;
  imagem: string;
  dataInicio: string;
}

export interface PartidasEndereco {
  cep?: string;
  cidade?: string;
  estado?: string;
  rua?: string;
  numero?: number;
  bairro?: string;
}

interface CampeonatoContextData {
  campeonatoData?: CampeonatoBody;
  cadastrar(campeonato: any): void;
  setCampeonatoBody(novaPropriedade: Partial<CampeonatoBody>): void;
  buscarCampeonatosInternos(id: any): Promise<CampeonatoList[]>;
  buscarCampeonatosExternos(id: any): Promise<CampeonatoList[]>;
  cadastrarEndereco(endereco: any): void;
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

  useEffect(() => { }, [campeonatoData]);

  function setCampeonatoBody(novaPropriedade: Partial<CampeonatoBody>) {
    setCampeonato(prevCampeonatoData => ({
      ...prevCampeonatoData,
      ...novaPropriedade,
    }));
  }

  function cadastrar(campeonato: any) {
    try {
      CampeonatoService.cadastro(campeonato);
    } catch (error: any) {
      Alert.alert('404');
      return error;
    }
  }

  function cadastrarEndereco(endereco: any) {
    try {
      CampeonatoService.cadastrarEndereco(endereco);
    } catch (error: any) {
      Alert.alert('404');
      return error;
    }
  }

  function buscarCampeonatosInternos(id: any): Promise<CampeonatoList[]> {
    try {
      return CampeonatoService.buscarCampeonatosInternos(id, 1);
    } catch (error: any) {
      Alert.alert('404');
      return error;
    }
  }

  function buscarCampeonatosExternos(id: any): Promise<CampeonatoList[]> {
    try {
      return CampeonatoService.buscarCampeonatosExternos(id);
    } catch (error: any) {
      Alert.alert('404');
      return error;
    }
  }

  return (
    <CampeonatoContext.Provider
      value={{
        campeonatoData,
        setCampeonatoBody,
        cadastrar,
        buscarCampeonatosInternos,
        buscarCampeonatosExternos,
        cadastrarEndereco,
      }}>
      {children}
    </CampeonatoContext.Provider>
  );
};

export function useCampeonato() {
  const context = useContext(CampeonatoContext);
  return context;
}
