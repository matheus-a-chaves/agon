import axios from "axios";
import { environment } from "../../environment";
import { Modalidade } from "../interfaces/modalidadesInterface";


const URL = `${environment.URL}/modalidades`;

async function buscarModalidade(): Promise<Modalidade[]> {
    try {
        const response = await axios.get(URL);
        console.log('ModalidadeService: buscarModalidade:', response.data);
        return response.data;
    } catch (erro: Error | any) {
        console.log("ERRO", erro);
        throw new Error('Erro ao buscar modalidade: ' + erro.message);
    }
}


export const ModalideService = {buscarModalidade}