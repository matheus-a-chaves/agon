import { Campeonato } from "../interfaces/campeonatoModel";
import axios from 'axios';
import { formatDate, parseInteiro, uploadImage } from "../screens/Utils";
import { environment } from "../../environment";

const URL = `${environment.URL}/campeonatos`;

async function cadastro(campeonato: Campeonato) {
    try {
    const body = {
            nome: campeonato.nome,
            quantidadeEquipes: campeonato.quantidadeEquipes,
            dataInicio: formatDate(campeonato.dataInicio),
            dataFim: formatDate(campeonato.dataFim),
            regulamento: campeonato.regulamento, 
            imagemCampeonato: campeonato.imagem,
            formato: {
                codigoFormato:campeonato.formato
            },
            modalidade:{
                codigoModalidade: campeonato.modalidade
            } ,
        };
    const response = await axios.post(URL, body);
    return response.data;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}


export const CampeonatoService = { cadastro };
