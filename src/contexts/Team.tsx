import React, { createContext, useContext, useState } from 'react';
import { TeamService } from '../services/time.service';
import { Equipe } from '../interfaces/equipeInterface';
import { AuthData, useAuth } from './Auth';

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
}

export const TeamContext = createContext<TeamContextData>(
  {} as TeamContextData,
);

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [teamData, setTeamData] = useState<Equipe[]>([]);
  const { authData } = useAuth();

  async function findAllTeam(): Promise<void> {
    try {
      console.log('authData:', authData);
      const team = await TeamService.buscarTimes(authData?.id);
      setTeamData(team)
    } catch (error: any) {
      return error;
    }
  }

  async function cadastrar(equipe: any) {
    try {
      await TeamService.cadastro(equipe, authData?.id);
      await findAllTeam();
    } catch (error: any) {
      return error;
    }
  }

  return (
    <TeamContext.Provider value={{ teamData, findAllTeam, cadastrar }}>
      {children}
    </TeamContext.Provider>
  );
};

export function useTeam() {
  return useContext(TeamContext);
}
