import axios from 'axios';
import { environment } from '../../environment';
import { AmistosoBody } from '../contexts/Amistoso';
import { converterParaISO } from '../screens/Utils';

const URL = `${environment.URL}/amistosos`;
async function cadastro(amistoso: AmistosoBody, idAtletica: any) {
    try {
        const URL_CADASTRO = `${URL}/equipeCasa/${idAtletica}/equipeVisitante/${amistoso.equipe}/criar`;

        const body = {
            dataHora: converterParaISO(amistoso.data, amistoso.hora),
            modalidade: {
                id: amistoso.modalidade,
            },
            endereco: {
                rua: amistoso.rua,
                numero: amistoso.numero,
                cidade: amistoso.cidade,
                estado: amistoso.estado,
                cep: amistoso.cep,
                bairro: amistoso.bairro
            }
        };
        const response = await axios.post(URL_CADASTRO, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function cancelar(idAmistoso: any) {
    try {
        const response = await axios.put(`${URL}/cancelar/${idAmistoso}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const AmistosoService = {
    cadastro,
    cancelar
};
