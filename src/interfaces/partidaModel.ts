import { Endereco } from "./enderecoModel";
import { Equipe } from "./equipeInterface";

export interface Partida {
    idAmistoso: number;
    dataPartida: string;
    endereco: Endereco;
    equipeCasa: Equipe;
    equipeVisitante: Equipe;
}
