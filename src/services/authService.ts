import axios from "axios";
import { AuthData } from "../contexts/Auth";
import { Alert } from "react-native";
import { environment } from "../../environment";
import { Membro } from '../interfaces/membrosModel';
import { MembroService } from "./membro.service";

const URL = `http://localhost:9090/auth/login`;

async function signIn(email: string, password: string): Promise<AuthData> {
    return new Promise(async (resolve, reject) => {
        try {
            const body = {
                login: email,
                password: password
            }

            const response = await axios.post(URL, body);
            const data: AuthData = response.data;
            if (!response.data) {
                reject(Alert.alert('Erro', 'Usuário ou senha incorretos'));
            } else {
                const usuario: AuthData = {
                    token: 'fake-token-' + data.id,
                    email: email,
                    id: data.id,
                    nome: data.nome,
                    dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : new Date(),
                    cpf: data.cpf || null,
                    cnpj: data.cnpj || null,
                    imagemPerfil: data.imagemPerfil,
                    bairro: data.bairro,
                    cep: data.cep,
                    cidade: data.cidade,
                    estado: data.estado,
                    numero: data.numero,
                    rua: data.rua,
                    tipoUsuario: data.tipoUsuario
                };
                if (usuario.tipoUsuario === environment.PERFIL_JOGADOR) {
                    const membro: Membro = await MembroService.bsucarPorJogador(usuario.id);
                    if (membro !== null) {
                        usuario.idJogador = membro.idAtletica;
                    }
                }
                resolve(usuario);
            }
        } catch (error: Error | any) {
            error.response ? reject(Alert.alert('Erro', error.response.data.message)) : reject(Alert.alert('Erro', 'Erro ao realizar login'));
        }
    });
}

export const authService = { signIn }