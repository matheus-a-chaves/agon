export interface Endereco {
    cep: string;
    rua: string;
    numero: number;
    bairro: null | string;
    cidade: string;
    estado: string;
}


export function mapEndereco(endereco: any): Endereco {
    return {
        cep: endereco.cep,
        rua: endereco.rua,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado
    }
}