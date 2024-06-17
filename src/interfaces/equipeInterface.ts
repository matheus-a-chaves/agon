import { Modalidade } from "./modalidadesInterface"

export interface Equipe {
    id: string
    nome: string
    imagem: string
    modalidade: Modalidade
    atletica: number
    usuario: string
}