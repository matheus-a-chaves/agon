import { TeamData } from "../contexts/Team";

async function findTeam(id:string):Promise<TeamData[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(id){
                resolve([
                {
                    id:'451561151',
                    name:'Matheus',
                    date:'19/02/2021',
                },
                {
                    id:'612626665',
                    name:'Kraken',
                    date:'19/02/2021',
                }
            ]);
            } else {
                reject(new Error('Times não encontrado'));
            }
        }, 500 );
    });
}

export const teamService = {findTeam}