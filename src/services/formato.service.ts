import axios from "axios";
import { environment } from "../../environment";
import { Formato } from "../interfaces/formatoModel";


const URL = `${environment.URL}/formatos`;

async function buscarFormatos(): Promise<Formato[]> {
    try {
        const response = await axios.get(URL);
        const formatos:Formato[] = response.data.map((item:any )=> {
            return {
                id: item.codigoFormato,
                nome: item.descricaoFormato
            }
        });
        return formatos;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar formato: ' + erro.message);
    }
}


export const FormatoService = {buscarFormatos}