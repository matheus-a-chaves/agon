import React, {createContext, useContext, useState} from 'react';
import {teamService} from '../services/teamService';

export interface TeamData {
  id: string;
  name: string;
  date: string;
}

interface TeamProviderProps {
  children: React.ReactNode;
}

interface TeamContextData {
  teamData?: TeamData[];
  findAllTeam: (idAtletica: string) => Promise<TeamData[]>;
}

export const TeamContext = createContext<TeamContextData>(
  {} as TeamContextData,
);

export const TeamProvider: React.FC<TeamProviderProps> = ({children}) => {
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  async function findAllTeam(idAtletica: string): Promise<TeamData[]> {
    try {
      const team = await teamService.findTeam(idAtletica);
      console.log(team);
      setTeamData(team);
      return team;
    } catch (error: any) {
      return error;
    }
  }

  return (
    <TeamContext.Provider value={{teamData, findAllTeam}}>
      {children}
    </TeamContext.Provider>
  );
};

export function useTeam() {
  return useContext(TeamContext);
}
