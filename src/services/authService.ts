import { AuthData } from "../contexts/Auth";

async function signIn(email: string, password: string): Promise<AuthData> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password === '123456') {
                resolve({
                    token: 'fake-token',
                    email: 'atletica@gmail.com',
                    name: 'Kraken Esports',
                    tipoPerfil: 1,
                });
            } else if (password === '1234') {
                resolve({
                    token: 'fake-token-5',
                    email: 'jogador@gmail.com',
                    name: 'Matheus Chaves',
                    tipoPerfil: 2,
                });
            } else {
                reject(new Error('usuario ou senha inválidos'));
            }
        }, 500);
    });
}

export const authService = { signIn }