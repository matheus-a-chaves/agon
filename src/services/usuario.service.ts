import axios from 'axios';
import { environment } from '../../environment';
import { IFormAuto } from '../contexts/FormProvider';
import { formatDate } from '../screens/Utils';
import { AuthData } from '../contexts/Auth';
import { Alert } from 'react-native';

const URL = `${environment.URL}/usuarios`;

async function cadastro(usuario: IFormAuto) {
  try {
    let tipoUsuario: number = 0;
    let cpfCnpj = usuario.cpfCnpj?.replace(/[^\d]+/g, '');

    if (cpfCnpj?.length === 11) {
      tipoUsuario = environment.PERFIL_JOGADOR;
    } else if (cpfCnpj?.length === 14) {
      tipoUsuario = environment.PERFIL_ATLETICA;
    }

    const body = {
      login: usuario.email,
      password: usuario.senha,
      nome: usuario.nomeCompleto,
      docIdentificacao: cpfCnpj,
      dataNascimento: formatDate(usuario.dataNascimento),
      bairro: usuario.bairro,
      cep: usuario.cep,
      cidade: usuario.cidade,
      estado: usuario.estado,
      numero: usuario.numero,
      rua: usuario.rua,
      tipoUsuario: tipoUsuario,
    };
    const response = await axios.post(URL, body);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(usuario: AuthData, id: any): Promise<void> {
  try {

    const body = {
      nome: usuario.nome,
      dataNascimento: usuario.dataNascimento,
      bairro: usuario.bairro,
      cep: usuario.cep,
      cidade: usuario.cidade,
      estado: usuario.estado,
      numero: usuario.numero,
      rua: usuario.rua,
      imagemPerfil: usuario.imagemPerfil,
    };
    await axios.put(URL + `/${id}`, body);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findById(id: number): Promise<AuthData> {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await axios.get(URL + `/${id}`);
      const data: AuthData = response.data;
      if (!response.data) {
        reject(Alert.alert('Erro', 'Usuário ou senha incorretos'));
      } else {
        const usuario: AuthData = {
          nome: data.nome,
          dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : new Date(),
          imagemPerfil: data.imagemPerfil,
          bairro: data.bairro,
          cep: data.cep,
          cidade: data.cidade,
          estado: data.estado,
          numero: data.numero,
          rua: data.rua,
        };
        resolve(usuario);
      }
    } catch (error: Error | any) {
      reject(Alert.alert('Erro ao atualizar'));
    }
  });
}







export const UsuarioService = {
  cadastro,
  update,
  findById
};
