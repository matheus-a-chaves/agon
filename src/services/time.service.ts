import axios from "axios";
import { environment } from "../../environment";
import { Equipe } from "../interfaces/equipeInterface";

const URL = `${environment.URL}/times`;

async function buscarTimes(id:any): Promise<Equipe[]> {
    try {
        const response = await axios.get(URL);
        const equipes:Equipe[] = response.data.map((item:any )=> {
            return {
                id: item.id,
                imagem: item.imagem,
                nome: item.nome,
                modalidade: item.modalidade,
            }
        });
        return equipes;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar formato: ' + erro.message);
    }
}

export const TeamService = {buscarTimes}