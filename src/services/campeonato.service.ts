import {Campeonato} from '../interfaces/campeonatoModel';
import axios from 'axios';
import {formatDate, upload} from '../screens/Utils';
import {environment} from '../../environment';
import {CampeonatoList} from '../contexts/Campeonato';

const URL = `${environment.URL}/campeonatos`;

async function cadastro(campeonato: Campeonato) {
  try {
    const body = {
      nome: campeonato.nome,
      quantidadeEquipes: campeonato.quantidadeEquipes,
      dataInicio: formatDate(campeonato.dataInicio),
      dataFim: formatDate(campeonato.dataFim),
      regulamento: campeonato.regulamento,
      imagemCampeonato: campeonato.imagem,
      formato: {
        codigoFormato: campeonato.formato,
      },
      modalidade: {
        codigoModalidade: campeonato.modalidade,
      },
    };
    const response = await axios.post(URL, body);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function buscarCampeonatosInternos(id: any): Promise<CampeonatoList[]> {
  try {
    const idAtletica =1;
    const idModalidade=2;
    const response = await axios.get(`${URL}/atletica/${idAtletica}/modalidade/${idModalidade}`);
  
    const campeonatos: CampeonatoList[] = response.data.map((item: any) => {
      return {
        id: item.id,
        nome: item.nome,
        imagem: item.imagem,
        dataInicio: item.dataInicio,
      };
    });
    return campeonatos;
  } catch (erro: Error | any) {
    throw new Error('Erro ao buscar campeonato: ' + erro.message);
  }
}
async function buscarCampeonatosExternos(id: any): Promise<CampeonatoList[]> {
  try {
    //const response = await axios.get(URL);
    const response = {
      data: [{id: 1, imagem: upload, nome: 'Campeonato 1', date: '20-12-2023'}],
    };
    const campeonatos: CampeonatoList[] = response.data.map((item: any) => {
      return {
        id: item.id,
        nome: item.nome,
        imagem: item.imagem,
        dataInicio: item.date,
      };
    });
    return campeonatos;
  } catch (erro: Error | any) {
    throw new Error('Erro ao buscar campeonato: ' + erro.message);
  }
}

export const CampeonatoService = {
  cadastro,
  buscarCampeonatosInternos,
  buscarCampeonatosExternos,
};
