import React, { createContext, useContext, useEffect, useState } from 'react';

export interface IFormAuto {
    nomeCompleto?: string;
    email?: string;
    cpfCnpj?: string;
    dataNascimento?: Date;
    cep?: string;
    cidade?: string;
    estado?: string;
    rua?: string;
    numero?: number;
    bairro?: string;
    senha?: string;
    confirmar?: string;
}


interface AutoCadastroContextData {
    autoCadastroData?: IFormAuto;
    setAutoCadastroBody(autoCadastro: any): void;
    cadastrar(autocadastro: any): void;
}

interface AutoCadastroProviderProps {
    children: React.ReactNode;
}

export const AutoCadastroContext = createContext<AutoCadastroContextData>(
    {} as AutoCadastroContextData,
);

export const AutoCadastroProvider: React.FC<AutoCadastroProviderProps> = ({
    children,
}) => {
    const [autoCadastroData, setAutoCadastro] = useState<Partial<IFormAuto>>();

    useEffect(() => { }, [autoCadastroData]);

    function setAutoCadastroBody(novaPropriedade: Partial<IFormAuto>) {
        setAutoCadastro(prevAutoCadastroData => ({
            ...prevAutoCadastroData,
            ...novaPropriedade,
        }));
    }

    function cadastrar(autocadastro: any) {
        try {
            //   CampeonatoService.cadastro(campeonato);
            console.log(autocadastro);
        } catch (error: any) {
            console.log('404');
            return error;
        }
    }


    return (
        <AutoCadastroContext.Provider
            value={{
                autoCadastroData,
                setAutoCadastroBody,
                cadastrar
            }}>
            {children}
        </AutoCadastroContext.Provider>
    );
};

export function useAutoCadastro() {
    const context = useContext(AutoCadastroContext);
    return context;
}
