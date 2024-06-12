import axios from "axios";
import { environment } from "../../environment";
import { Modalidade } from "../interfaces/modalidadesInterface";


const URL = `${environment.URL}/modalidades`;

async function buscarModalidade(): Promise<Modalidade[]> {
    try {
        const response = await axios.get(URL);
        const modalidades: Modalidade[] = response.data.map((item: any) => {
            return {
                id: item.id,
                nome: item.nome
            }
        });
        return modalidades;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar modalidade: ' + erro.message);
    }
}

export const ModalideService = {
    buscarModalidade
}