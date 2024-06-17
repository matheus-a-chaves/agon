import axios from "axios";
import { AuthData } from "../contexts/Auth";
import { Alert } from "react-native";

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
                resolve(usuario);
            }
        } catch (error: Error | any) {
            error.response ? reject(Alert.alert('Erro', error.response.data.message)) : reject(Alert.alert('Erro', 'Erro ao realizar login'));
        }
    });
}

export const authService = { signIn }