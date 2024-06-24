import axios from 'axios';
import { environment } from '../../environment';
import { Partida } from '../interfaces/partidaModel';
import { mapEndereco } from '../interfaces/enderecoModel';
import { mapEquipe } from '../interfaces/equipeInterface';

const URL = `${environment.URL}/partidas`;

async function buscarAgenda(idEquipe: any, data: any): Promise<Partida[]> {
    try {
        const urlteste = `${URL}/equipe/${idEquipe}`
        const body = {
            data: data
        }
        const response = await axios.post(urlteste, body);

        const agenda: Partida[] = response.data.map((item: any) => {
            return {
                idAmistoso: item.idAmistoso,
                dataPartida: item.dataPartida,
                endereco: mapEndereco(item.endereco),
                equipeCasa: mapEquipe(item.equipeCasa),
                equipeVisitante: mapEquipe(item.equipeVisitante)
            };
        });
        return agenda;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar solicitações ' + erro.message);
    }
}

async function buscarPartidasAmistosas(idEquipe: any): Promise<Partida[]> {
    try {
        const response = await axios.get(`${URL}/amistosos/equipe/${idEquipe}`);

        const agenda: Partida[] = response.data.map((item: any) => {
            return {
                idAmistoso: item.idAmistoso,
                dataPartida: item.dataPartida,
                endereco: mapEndereco(item.endereco),
                equipeCasa: mapEquipe(item.equipeCasa),
                equipeVisitante: mapEquipe(item.equipeVisitante)
            };
        });
        return agenda;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar amistosos ' + erro.message);
    }
}




export const PartidaService = {
    buscarAgenda,
    buscarPartidasAmistosas
};
