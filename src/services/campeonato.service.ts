import { Campeonato } from '../interfaces/campeonatoModel';
import axios from 'axios';
import { formatDate, upload } from '../screens/Utils';
import { environment } from '../../environment';
import { CampeonatoList } from '../contexts/Campeonato';

const URL = `${environment.URL}/campeonatos`;

async function cadastro(campeonato: Campeonato, idAtletica: any) {
  try {
    const body = {
      nome: campeonato.nome,
      quantidadeEquipes: campeonato.quantidadeEquipes,
      dataInicio: formatDate(campeonato.dataInicio),
      dataFim: formatDate(campeonato.dataFim),
      regulamento: campeonato.regulamento,
      imagemCampeonato: campeonato.imagem,
      formato: {
        id: campeonato.formato,
      },
      modalidade: {
        id: campeonato.modalidade,
      },
    };
    const response = await axios.post(URL + `/create/usuario/${idAtletica}`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function buscarCampeonatosInternos(idEquipe: any, idModalidade: any): Promise<CampeonatoList[]> {
  try {
    const response = await axios.get(`${URL}/interno/atletica/${idEquipe}/modalidade/${idModalidade}`);
    const campeonatos: CampeonatoList[] = response.data.map((item: any) => {
      return {
        id: item.id,
        nome: item.nome,
        imagem: item.imagemCampeonato,
        dataInicio: item.dataInicio,
        modalidade: item.modalidade.id,
        campeonatoTipo: 0
      };
    });
    return campeonatos;
  } catch (erro: Error | any) {
    throw new Error('Erro ao buscar campeonato: ' + erro.message);
  }
}
async function buscarCampeonatosExternos(idEquipe: any, idModalidade: any): Promise<CampeonatoList[]> {
  try {
    const response = await axios.get(`${URL}/externo/atletica/${idEquipe}/modalidade/${idModalidade}`);

    const campeonatos: CampeonatoList[] = response.data.map((item: any) => {
      return {
        id: item.id,
        nome: item.nome,
        imagem: item.imagemCampeonato,
        dataInicio: item.dataInicio,
        campeonatoTipo: 1
      };
    });
    return campeonatos;
  } catch (erro: Error | any) {
    throw new Error('Erro ao buscar campeonato: ' + erro.message);
  }
}

async function cadastrarEndereco(campeonato: Campeonato) {
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

async function adicionarEquipe(idModalidade: number, cnpj: number, idCampeonato: number) {
  try {
    const url = URL + `/${idCampeonato}/modalidade/${idModalidade}/adicionar`
    console.log(url)
    const body = { cnpj: cnpj }
    console.log(body)
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const CampeonatoService = {
  cadastro,
  buscarCampeonatosInternos,
  buscarCampeonatosExternos,
  cadastrarEndereco,
  adicionarEquipe
};
