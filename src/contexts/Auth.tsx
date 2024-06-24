import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import { Alert } from 'react-native';
import { UsuarioService } from '../services/usuario.service';
import { SolicitacaoService } from '../services/solicitacao.service';

export interface AuthData {
  token?: string;
  email?: string;
  senha?: string;
  id?: number,
  nome?: string,
  dataNascimento?: Date,
  cpf?: string | null,
  cnpj?: string | null,
  imagemPerfil?: string | null,
  bairro?: string,
  cep?: string,
  cidade?: string,
  estado?: string,
  numero?: number,
  rua?: string,
  tipoUsuario?: number,
  idJogador?: number
}

interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string) => Promise<AuthData>;
  signOut: () => Promise<void>;
  setTabBarVisibility: (visibility: boolean) => void;
  getTabBarVisibility: boolean;
  update: (autocadastro: any, id: number) => Promise<AuthData>;
  setCounterNotification: () => void;
  notification: number;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuth] = useState<Partial<AuthData>>();
  const [getTabBarVisibility, setVisibility] = useState(true);
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    loadFromStorage();
  }, []);

  function setAuthDataBody(novaPropriedade: Partial<AuthData>) {
    setAuth(prevAuthData => ({
      ...prevAuthData,
      ...novaPropriedade,
    }));
  }

  async function setCounterNotification() {
    try {
      const counter = await SolicitacaoService.buscarCounterNotification(authData?.id);
      setNotification(counter);
    } catch (error: any) {
      console.log('404');
      return error;
    }
  }

  async function loadFromStorage() {
    const auth = await AsyncStorage.getItem('@AuthData');
    if (auth) {
      const authData = JSON.parse(auth) as AuthData;
      setAuth(authData);
      if (authData?.id)
        await findById(authData?.id);
    }
  }

  async function signIn(email: string, password: string): Promise<AuthData> {
    try {
      const auth = await authService.signIn(email, password);
      setAuth(auth);
      AsyncStorage.setItem('@AuthData', JSON.stringify(auth));
      return auth;
    } catch (error: any) {
      Alert.alert('404');
      return error;
    }
  }

  async function signOut(): Promise<void> {
    setAuth(undefined);
    AsyncStorage.removeItem('@AuthData');
  }

  async function setTabBarVisibility(visibility: boolean) {
    setVisibility(visibility);
  }

  async function update(autocadastro: any, id: any) {
    try {
      await UsuarioService.update(autocadastro, id);
      await findById(id);
    } catch (error: any) {
      console.log('404');
      return error;
    }
  }

  async function findById(id: number) {
    try {
      const data = await UsuarioService.findById(id);
      setAuthDataBody(data);

    } catch (error: any) {
      console.log('404');
      return error;
    }
  }

  return (
    <AuthContext.Provider value={{
      authData,
      signIn,
      signOut,
      getTabBarVisibility,
      setTabBarVisibility,
      update,
      setCounterNotification,
      notification
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
