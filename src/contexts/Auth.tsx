import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import { Alert } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export interface AuthData {
  token: string;
  email: string;
  name: string;
}

interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string) => Promise<AuthData>;
  signOut: () => Promise<void>;
  setTabBarVisibility: (visibility: boolean) => void;
  getTabBarVisibility: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuth] = useState<AuthData>();
  const [getTabBarVisibility, setVisibility] = useState(true);

  useEffect(() => {
    loadFromStorage();
  }, []);

  async function loadFromStorage() {
    const auth = await AsyncStorage.getItem('@AuthData');
    if (auth) {
      const authData = JSON.parse(auth) as AuthData;
      console.log(authData.token);
      setAuth(authData);
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

  return (
    <AuthContext.Provider value={{ authData, signIn, signOut, getTabBarVisibility, setTabBarVisibility }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
