import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

interface CampeonatoBody {
  nome?: string;
  quantidadeEquipes?: number;
  formato?: any;
  modalidade?: any;
}

interface CampeonatoContextData {
  campeonatoData?: CampeonatoBody;
  cadastrar: () => void;
  setNome: (nome: string) => void;
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
  const [campeonatoData, setCampeonato] = useState<CampeonatoBody>();

  useEffect(() => {}, []);

  async function cadastrar() {
    try {
      //chamar a service aqui, TODO: criar a service
      console.log(campeonatoData);
    } catch (error: any) {
      Alert.alert('404');
      return error;
    }
  }

  function setNome(name: string) {
    setCampeonato({...campeonatoData, nome: name});
  }

  return (
    <CampeonatoContext.Provider value={{campeonatoData, cadastrar, setNome}}>
      {children}
    </CampeonatoContext.Provider>
  );
};

export function useCampeonato() {
  const context = useContext(CampeonatoContext);
  return context;
}
