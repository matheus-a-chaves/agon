import axios from "axios";
import { environment } from "../../environment";
import { Equipe } from "../interfaces/equipeInterface";
import { ModalideService } from "./modalidade.service";
import { date } from "yup";

const URL = `${environment.URL}/equipes`;

async function cadastro(equipe: Equipe, idAtletica: any) {
    try {
        const url = `${URL}/atletica/${idAtletica}`;

        const body = {
            nome: equipe.nome,
            imagem: equipe.imagem,
            modalidade: equipe.modalidade,
        };
        console.log(body)
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
        throw new Error('Erro ao buscar times: ' + erro.message);
    }
}

async function buscarTimesCampeonato(idCampeonato: any): Promise<Equipe[]> {
    try {
        const response = await axios.get(URL + `/campeonato/${idCampeonato}`);

        const equipes: Equipe[] = response.data.map((item: any) => {
            return {
                id: item.id,
                imagem: item.imagem,
                nome: item.nome,
                modalidade: item.modalidade
            }
        });
        return equipes;
    } catch (erro: Error | any) {
        throw new Error('Erro ao buscar formato: ' + erro.message);
    }
}

async function buscarTimesAgenda(idModalidade: any, idAtletica: any, data: any): Promise<Equipe[]> {
    try {
        const URL_AGENDA: string = URL + `/disponiveis/modalidade/${idModalidade}/atletica/${idAtletica}`;

        const body = {
            date: data
        }
        const response = await axios.post(URL_AGENDA, body);
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
        throw new Error('Erro ao buscar times: ' + erro.message);
    }
}



export const TeamService = { buscarTimes, cadastro, buscarTimesCampeonato, buscarTimesAgenda }