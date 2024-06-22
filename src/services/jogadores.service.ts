import axios from 'axios';
import { environment } from '../../environment';
import { Jogador } from '../screens/time/JogadoresScreen';
import { Alert } from 'react-native';


const URL = `${environment.URL}/amistoso`;
const URL_JOGADORES = `${environment.URL}/equipes`;

async function adicionarJogador(idAtletica: number, cpf: number, idEquipe: number) {
    try {
        const url = URL_JOGADORES + `/${idEquipe}/atletica/${idAtletica}/jogador/adicionar`

        const body = { cpf: cpf }
        const response = await axios.post(url, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function removerJogador(idJogador: number, idEquipe: number, idAtletica: number) {
    try {
        const url = URL_JOGADORES + `/${idEquipe}/atletica/${idAtletica}/jogador/${idJogador}/remover`
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function buscarJogadores(id: any): Promise<Jogador[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(URL_JOGADORES + `/${id}/jogadores`);

            if (!response.data) {
                reject(Alert.alert('Erro', 'Usuário ou senha incorretos'));
            } else {
                const jogadores: Jogador[] = response.data.map((item: any) => {
                    return {
                        id: item.id,
                        nome: item.nome,
                        dataNascimento: item.dataNascimento,
                        cpf: item.cpf,
                        cnpj: item.cnpj,
                        imagemPerfil: item.imagemPerfil,
                        bairro: item.bairro,
                        cep: item.cep,
                        cidade: item.cidade,
                        estado: item.estado,
                        numero: item.numero,
                        rua: item.rua,
                        tipoUsuario: item.tipoUsuario
                    }
                });
                resolve(jogadores);
            }
        } catch (error: Error | any) {
            reject(Alert.alert('Erro ao atualizar'));
        }
    });

}


export const JogadoresService = {
    adicionarJogador,
    buscarJogadores,
    removerJogador
};
