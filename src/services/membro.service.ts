import axios from 'axios';
import { environment } from '../../environment';
import { Membro } from '../interfaces/membrosModel';

const URL = `${environment.URL}/membros`;

async function bsucarPorJogador(idJogador: any): Promise<Membro> {
    try {
        const response = await axios.get(`${URL}/jogador/${idJogador}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const MembroService = {
    bsucarPorJogador
};
