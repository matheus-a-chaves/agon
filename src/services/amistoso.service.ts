import axios from 'axios';
import { environment } from '../../environment';
import { AmistosoSolicitacao } from '../screens/perfil/SolicitacoesScreen';
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
                cep: amistoso.cep
            }
        };
        console.log(body)
        const response = await axios.post(URL_CADASTRO, body);
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

export const AmistosoService = {
    cadastro,
    buscarSolicitacao
};
