import axios from 'axios';
import { environment } from '../../environment';
import { Solicitacao } from '../interfaces/solicitacaoModel';
import { mapEndereco } from '../interfaces/enderecoModel';
import { mapEquipe } from '../interfaces/equipeInterface';
import { ModalideService } from './modalidade.service';

const URL = `${environment.URL}/solicitacoes`;

async function onAccept(idAmistoso: number) {
    try {
        const URL_ACCEPT = `${URL}/${idAmistoso}/responder/aceitar`;
        console.log(URL_ACCEPT);
        const response = await axios.put(URL_ACCEPT);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function onReject(idAmistoso: number) {
    try {
        const URL_REJECT = `${URL}/${idAmistoso}/responder/recusar`;
        const response = await axios.put(URL_REJECT);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function buscarSolicitacao(id: any): Promise<Solicitacao[]> {
    try {
        const modalidades = await ModalideService.buscarModalidade();
        const response = await axios.get(`${URL}/idAtletica/${id}`);
        const solicitacao: Solicitacao[] = response.data.map((item: any) => {
            const modalidade = modalidades.find((mod) => mod.id === item.equipeCasa.modalidade);
            return {
                id: item.id,
                dataSolicitacao: item.dataSolicitacao,
                status: item.status,
                endereco: mapEndereco(item.endereco),
                equipeCasa: mapEquipe(item.equipeCasa),
                equipeVisitante: mapEquipe(item.equipeVisitante),
                modalidade: {
                    id: item.modalidade,
                    nome: modalidade?.nome
                }
            };
        });
        return solicitacao;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar solicitações ' + erro.message);
    }
}

async function buscarCounterNotification(id: any): Promise<number> {
    try {
        let counter = 0;
        const response = await axios.get(`${URL}/idAtletica/${id}`);
        response.data.map((item: any) => {
            counter++;
        });
        console.log(counter);
        return counter;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar solicitações ' + erro.message);
    }
}


export const SolicitacaoService = {
    onAccept,
    onReject,
    buscarSolicitacao,
    buscarCounterNotification
};
