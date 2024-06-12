import React, { createContext, useContext, useState } from 'react';
import { TeamService } from '../services/time.service';
import { Equipe } from '../interfaces/equipeInterface';

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
  findAllTeam: (idAtletica: string) => void;
  cadastrar(equipe: any): void;
}

export const TeamContext = createContext<TeamContextData>(
  {} as TeamContextData,
);

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [teamData, setTeamData] = useState<Equipe[]>([]);

  async function findAllTeam(idAtletica: string): Promise<void> {
    try {
      const team = await TeamService.buscarTimes(idAtletica);
      setTeamData(team)
    } catch (error: any) {
      return error;
    }
  }

  async function cadastrar(equipe: any) {
    try {
      await TeamService.cadastro(equipe, '1');
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
