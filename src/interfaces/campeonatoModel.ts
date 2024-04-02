import { Formato } from "./formatoModel";
import { Modalidade } from "./modalidadesInterface";
import { Partidas } from "./partidasInterface";

interface CampeonatoInterface {
    nome?: string;
    dataInicio?: Date;
    quantidadeEquipes?: number;
    formato?: Formato;
    modalidade?: Modalidade;
    imagem?: Uint8Array;
    regulamento?: Uint8Array;
    partidas?: Partidas;
}

export class Campeonato {
    imagem?: Uint8Array;
    nome?: string;
    regulamento?: Uint8Array;
    dataInicio?: Date;
    quantidadeEquipes?: number;
    formato?: Formato;
    modalidade?: Modalidade;
    partidas?: Partidas;

    constructor(campeonatoData: CampeonatoInterface) {
        this.nome = campeonatoData.nome;
        this.dataInicio = campeonatoData.dataInicio;
        this.quantidadeEquipes = campeonatoData.quantidadeEquipes;
        this.formato = campeonatoData.formato;
        this.modalidade = campeonatoData.modalidade;
        this.imagem = campeonatoData.imagem;
        this.regulamento = campeonatoData.regulamento;
        this.partidas = campeonatoData.partidas;
    }

    getImagem(): Uint8Array | undefined {
        return this.imagem;
    }

    setImagem(imagem: Uint8Array | undefined) {
        this.imagem = imagem;
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
