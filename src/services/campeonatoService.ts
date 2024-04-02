import { Campeonato } from "../interfaces/campeonatoModel";
import axios from 'axios';

async function cadastro(campeonato: Campeonato) {
    const body = {
        "nome": campeonato.nome,
        "quantidadeEquipes": campeonato.quantidadeEquipes,
        "dataInicio": "2024-04-01",
        "dataFim": "2024-06-30",
        "regulamento": [20], 
        "imagemCampeonato": [20],
        "formato": campeonato.formato,
        "modalidade": campeonato.modalidade,
    };

    try {
        const response = await axios.post('http://localhost:8080/agon/campeonatos', body);
        return response.data;
    } catch (error) {
        throw error; 
    }
}

export const campeonatoService = { cadastro };
