import React, { createContext, useContext, useState } from 'react';
import { TeamService } from '../services/time.service';
import { Equipe } from '../interfaces/equipeInterface';
import { useAuth } from './Auth';
import { Jogador } from '../screens/time/JogadoresScreen';

export interface TeamData {
  id: string;
  name: string;
  date: string;
}

interface TeamProviderProps {
  children: React.ReactNode;
}

interface TeamContextData {
  teamData?: Equipe[];
  findAllTeam: () => void;
  cadastrar(equipe: any): void;
  idModalidade: number,
  setIdModalidadeEquipe(id: number): void;
}

export const TeamContext = createContext<TeamContextData>(
  {} as TeamContextData,
);

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [teamData, setTeamData] = useState<Equipe[]>([]);
  const [idModalidade, setIdModalidade] = useState<number>(0);
  const { authData } = useAuth();

  async function findAllTeam(): Promise<void> {
    try {
      const team = await TeamService.buscarTimes(authData?.id, authData?.tipoUsuario);
      setTeamData(team)
    } catch (error: any) {
      return error;
    }
  }

  async function cadastrar(equipe: any) {
    try {
      await TeamService.cadastro(equipe, authData?.id);
    } catch (error: any) {
      return error;
    }
  }

  function setIdModalidadeEquipe(id: number) {
    setIdModalidade(id)
  }

  return (
    <TeamContext.Provider value={{ teamData, findAllTeam, cadastrar, setIdModalidadeEquipe, idModalidade }}>
      {children}
    </TeamContext.Provider>
  );
};

export function useTeam() {
  return useContext(TeamContext);
}
