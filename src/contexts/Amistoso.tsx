import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AmistosoService } from '../services/amistoso.service';
import { AmistosoSolicitacao } from '../screens/perfil/SolicitacoesScreen';
import { useAuth } from './Auth';

export interface AmistosoBody {
    equipe?: string;
    formato?: number;
    modalidade?: number;
    cep?: string;
    cidade?: string;
    estado?: string;
    rua?: string;
    numero?: number;
    bairro?: string;
    data?: string;
    hora?: string;
}

interface AmistosoContextData {
    amistosoData?: AmistosoBody;
    cadastrar(amistoso: AmistosoBody): void;
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
    const { authData } = useAuth();

    useEffect(() => { }, [amistosoData]);

    function setAmistosoBody(novaPropriedade: Partial<AmistosoBody>) {
        setAmistoso(prevAmistosoData => ({
            ...prevAmistosoData,
            ...novaPropriedade,
        }));
    }

    function cadastrar(amistoso: AmistosoBody) {
        try {
            AmistosoService.cadastro(amistoso, authData?.id);
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
