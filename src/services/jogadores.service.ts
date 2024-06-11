import axios from 'axios';
import { environment } from '../../environment';
import { Jogador } from '../screens/time/JogadoresScreen';


const URL = `${environment.URL}/amistoso`;

async function adicionarJogador(id: number, cpf: number) {
    try {
        const body = {
            idAtletica: id,
            cpf: cpf,
        };
        const response = await axios.post(URL, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function buscarJogadores(id: any): Promise<Jogador[]> {
    try {
        const response: any[] = [
            {
                id: '1',
                name: 'Mateus Irineu Mallmann',
                avatarUrl: 'https://example.com/mateus.jpg',
            },
            {
                id: '2',
                name: 'Rafaela Mantovani Fontana',
                avatarUrl: 'https://example.com/rafaela.jpg',
            },
            {
                id: '3',
                name: 'Matheus Alves Chaves',
                avatarUrl: 'https://example.com/matheus.jpg',
            },
            {
                id: '4',
                name: 'Lucas Ribeiro',
                avatarUrl: 'https://example.com/matheus.jpg',
            },
            {
                id: '5',
                name: 'José Alencar',
                avatarUrl: 'https://example.com/matheus.jpg',
            }
        ];

        // const urlteste = `${URL}/atletica/${idAtletica}/modalidade/${idModalidade}`
        // const response = await axios.get(`${URL}/atletica/${idAtletica}/modalidade/${idModalidade}`);

        const solicitacao: Jogador[] = response.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                imagem: item.avatarUrl,
            };
        });
        return solicitacao;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar solicitações ' + erro.message);
    }
}


export const JogadoresService = {
    adicionarJogador,
    buscarJogadores
};
