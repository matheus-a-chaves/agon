import axios from "axios";
import { environment } from "../../environment";
import { Equipe } from "../interfaces/equipeInterface";
import { ModalideService } from "./modalidade.service";

const URL = `${environment.URL}/times`;

async function cadastro(equipe: Equipe, idAtletica: any) {
    try {
        const url = `${URL}/atletica/${idAtletica}`;

        const body = {
            nome: equipe.nome,
            imagem: equipe.imagem,
            modalidade: equipe.modalidade,
        };
        const response = await axios.post(url, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function buscarTimes(id: any, tipoUsuario: any): Promise<Equipe[]> {
    try {
        let URL_CASE: string = `/jogador/${id}`;
        if (tipoUsuario === environment.PERFIL_ATLETICA) {
            URL_CASE = `/atletica/${id}`
        }
        const response = await axios.get(URL + URL_CASE);
        const modalidades = await ModalideService.buscarModalidade();
        const equipes: Equipe[] = response.data.map((item: any) => {
            const modalidade = modalidades.find((mod) => mod.id === item.modalidade);
            return {
                id: item.id,
                imagem: item.imagem,
                nome: item.nome,
                modalidade: {
                    id: item.modalidade,
                    nome: modalidade?.nome
                }
            }
        });
        return equipes;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar formato: ' + erro.message);
    }
}


export const TeamService = { buscarTimes, cadastro }