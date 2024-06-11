import { Campeonato } from '../interfaces/campeonatoModel';
import axios from 'axios';
import { formatDate } from '../screens/Utils';
import { environment } from '../../environment';
import { AmistosoSolicitacao } from '../screens/perfil/SolicitacoesScreen';


const URL = `${environment.URL}/amistoso`;

async function onAccept(amistoso: number) {
    try {
        const body = {
            id: amistoso,
            status: 'aceito',
        };
        const response = await axios.post(URL, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function onReject(amistoso: number) {
    try {
        const body = {
            id: amistoso,
            status: 'recusado',
        };
        const response = await axios.post(URL, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function buscarSolicitacao(id: any): Promise<AmistosoSolicitacao[]> {
    try {
        const response: any[] = [
            {
                id: 1,
                nome: 'Kraken',
                img: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png",
                local: 'Campo do Kraken',
                dataHora: '12/12/2021 15:00',
            },
            {
                id: 2,
                nome: 'Coritiba',
                img: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png",
                local: 'Campo do Coritiba',
                dataHora: '12/12/2021 15:00',
            },
        ];

        // const urlteste = `${URL}/atletica/${idAtletica}/modalidade/${idModalidade}`
        // const response = await axios.get(`${URL}/atletica/${idAtletica}/modalidade/${idModalidade}`);

        const solicitacao: AmistosoSolicitacao[] = response.map((item: any) => {
            return {
                id: item.id,
                nome: item.nome,
                img: item.img,
                local: item.local,
                dataHora: item.dataHora
            };
        });
        return solicitacao;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar solicitações ' + erro.message);
    }
}

export const SolicitacaoService = {
    onAccept,
    onReject,
    buscarSolicitacao,
};
