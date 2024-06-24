import { Modalidade } from "./modalidadesInterface"

export interface Equipe {
    id: string
    nome: string
    imagem: string
    modalidade: Modalidade
    atletica: number
    usuario: string
}

export function mapEquipe(equipe: any): Equipe {
    return {
        id: equipe.id,
        nome: equipe.nome,
        imagem: equipe.imagem,
        modalidade: equipe.modalidade,
        atletica: equipe.atletica,
        usuario: equipe.usuario
    }
}