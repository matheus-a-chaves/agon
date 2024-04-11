import { Campeonato } from "../interfaces/campeonatoModel";
import axios from 'axios';
import { parseInteiro, uploadImage } from "../screens/Utils";
import { environment } from "../../environment";

const URL = `${environment.URL}/campeonatos`;

async function cadastro(campeonato: Campeonato) {
    
    const uri = await uploadImage(campeonato.imagem,'campeonato/');
    const formatoNumero = parseInteiro(campeonato.formato);

    const body = {
        nome: campeonato.nome,
        quantidadeEquipes: campeonato.quantidadeEquipes,
        dataInicio: "2024-04-01",
        dataFim: "2024-06-30",
        regulamento: campeonato.regulamento, 
        imagemCampeonato: uri,
        formato: formatoNumero,
        modalidade: campeonato.modalidade,
    };

    console.log(body);
    try {
        const response = await axios.post(URL, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

export const CampeonatoService = { cadastro };
