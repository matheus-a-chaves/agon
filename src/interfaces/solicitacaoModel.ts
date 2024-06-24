import { Endereco } from "./enderecoModel";
import { Equipe } from "./equipeInterface";
import { Modalidade } from './modalidadesInterface';

export interface Solicitacao {
    id: number;
    dataSolicitacao: string;
    status: string;
    endereco: Endereco;
    equipeCasa: Equipe;
    equipeVisitante: Equipe;
    modalidade: Modalidade;
}


