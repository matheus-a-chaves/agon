import { Modalidade } from "./modalidadesInterface"

export interface Equipe {
    nome: string
    imagem: Uint8Array
    modalidade: Modalidade
    atletica: number
    usuario: string
}