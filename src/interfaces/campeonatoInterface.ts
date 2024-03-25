import { Formato } from "./formatoInterface"
import { Modalidade } from "./modalidadesInterface"
import { Partidas } from "./partidasInterface"

export interface Campeonato{
    imagem: Uint8Array
    nome: string
    regulamento: Uint8Array
    dataInicio: Date
    quantidadeEquipes: number
    formato: Formato
    modalidade: Modalidade
    partidas: Partidas
}