import {Formato} from './formatoModel';
import {Modalidade} from './modalidadesInterface';
import {Partidas} from './partidasInterface';

interface CampeonatoInterface {
  id?: number;
  nome?: string;
  dataInicio?: Date;
  dataFim?: Date;
  quantidadeEquipes?: number;
  formato?: Formato;
  modalidade?: Modalidade;
  imagem?: string;
  regulamento?: Uint8Array;
  partidas?: Partidas;
}

export class Campeonato {
  id?: number;
  imagem?: string;
  nome?: string;
  regulamento?: Uint8Array;
  dataInicio?: Date;
  dataFim?: Date;
  quantidadeEquipes?: number;
  formato?: Formato;
  modalidade?: Modalidade;
  partidas?: Partidas;

  constructor(campeonatoData: CampeonatoInterface) {
    this.id = campeonatoData.id;
    this.nome = campeonatoData.nome;
    this.dataInicio = campeonatoData.dataInicio;
    this.dataFim = campeonatoData.dataFim;
    this.quantidadeEquipes = campeonatoData.quantidadeEquipes;
    this.formato = campeonatoData.formato;
    this.modalidade = campeonatoData.modalidade;
    this.imagem = campeonatoData.imagem;
    this.regulamento = campeonatoData.regulamento;
    this.partidas = campeonatoData.partidas;
  }

  getImagem(): string | undefined {
    return this.imagem;
  }

  setImagem(imagem: string | undefined) {
    this.imagem = imagem;
  }

  getId(): number | undefined {
    return this.id;
  }

  setId(id: number | undefined) {
    this.id = id;
  }

  getNome(): string | undefined {
    return this.nome;
  }

  setNome(nome: string | undefined) {
    this.nome = nome;
  }

  getRegulamento(): Uint8Array | undefined {
    return this.regulamento;
  }

  setRegulamento(regulamento: Uint8Array | undefined) {
    this.regulamento = regulamento;
  }

  getDataInicio(): Date | undefined {
    return this.dataInicio;
  }

  setDataInicio(dataInicio: Date | undefined) {
    this.dataInicio = dataInicio;
  }

  getDataFim(): Date | undefined {
    return this.dataFim;
  }

  setDataFim(dataFim: Date | undefined) {
    this.dataFim = dataFim;
  }

  getQuantidadeEquipes(): number | undefined {
    return this.quantidadeEquipes;
  }

  setQuantidadeEquipes(quantidadeEquipes: number | undefined) {
    this.quantidadeEquipes = quantidadeEquipes;
  }

  getFormato(): Formato | undefined {
    return this.formato;
  }

  setFormato(formato: Formato | undefined) {
    this.formato = formato;
  }

  getModalidade(): Modalidade | undefined {
    return this.modalidade;
  }

  setModalidade(modalidade: Modalidade | undefined) {
    this.modalidade = modalidade;
  }

  getPartidas(): Partidas | undefined {
    return this.partidas;
  }

  setPartidas(partidas: Partidas | undefined) {
    this.partidas = partidas;
  }
}
