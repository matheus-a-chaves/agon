import axios from 'axios';
import { environment } from '../../environment';
import { IFormAuto } from '../contexts/FormProvider';

const URL = `${environment.URL}/campeonatos`;

async function cadastro(usuario: IFormAuto) {
  try {
    let tipoUsuario: number = 0;
    let cpf = null
    let cnpj = null
    let cpfCnpj = usuario.cpfCnpj?.replace(/[^\d]+/g, '');

    if (usuario.cpfCnpj?.length === 11) {
      console.log('CPF')
      tipoUsuario = environment.PERFIL_JOGADOR;
      cpf = cpfCnpj
    } else if (usuario.cpfCnpj?.length === 14) {
      console.log('CNPJ')
      tipoUsuario = environment.PERFIL_ATLETICA;
      cnpj = cpfCnpj
    }

    const body = {
      nome: usuario.nomeCompleto,
      cpf: cpf,
      cnpj: cnpj,
      imagemPerfil: usuario.email,
      bairro: usuario.bairro,
      cep: usuario.cep,
      cidade: usuario.cidade,
      estado: usuario.estado,
      numero: usuario.numero,
      rua: usuario.rua,
      tipoUsuario: tipoUsuario,
    };
    console.log(body)
    const response = await axios.post(URL, body);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const UsuarioService = {
  cadastro,
};
