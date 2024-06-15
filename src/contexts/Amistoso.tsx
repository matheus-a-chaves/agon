import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AmistosoService } from '../services/amistoso.service';
import { AmistosoSolicitacao } from '../screens/perfil/SolicitacoesScreen';

export interface AmistosoBody {
    equipe?: string;
    quantidadeEquipes?: number;
    formato?: number;
    modalidade?: number;
    imagem?: string;
    regulamento?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
    rua?: string;
    numero?: number;
    bairro?: string;
    data?: Date;
    dataFim?: Date;
}

interface AmistosoContextData {
    amistosoData?: AmistosoBody;
    cadastrar(campeonato: any): void;
    setAmistosoBody(novaPropriedade: Partial<AmistosoBody>): void;
    buscarSolicitacao(id: any): Promise<AmistosoSolicitacao[]>;
}

interface AmistosoProviderProps {
    children: React.ReactNode;
}

export const AmistosoContext = createContext<AmistosoContextData>(
    {} as AmistosoContextData,
);

export const AmistosoProvider: React.FC<AmistosoProviderProps> = ({
    children,
}) => {
    const [amistosoData, setAmistoso] = useState<Partial<AmistosoBody>>();

    useEffect(() => { }, [amistosoData]);

    function setAmistosoBody(novaPropriedade: Partial<AmistosoBody>) {
        setAmistoso(prevAmistosoData => ({
            ...prevAmistosoData,
            ...novaPropriedade,
        }));
    }

    function cadastrar(campeonato: any) {
        try {
            AmistosoService.cadastro(campeonato);
        } catch (error: any) {
            Alert.alert('404');
            return error;
        }
    }

    function buscarSolicitacao(id: any): Promise<AmistosoSolicitacao[]> {
        try {
            return AmistosoService.buscarSolicitacao(id);
        } catch (error: any) {
            Alert.alert('404');
            return error;
        }
    }


    return (
        <AmistosoContext.Provider
            value={{
                amistosoData,
                setAmistosoBody,
                cadastrar,
                buscarSolicitacao,
            }}>
            {children}
        </AmistosoContext.Provider>
    );
};

export function useAmistoso() {
    const context = useContext(AmistosoContext);
    return context;
}
