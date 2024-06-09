import { AuthData } from "../contexts/Auth";

async function signIn(email: string, password: string): Promise<AuthData> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password === '123456') {
                resolve({
                    token: 'fake-token',
                    email: 'matheus@gmail.com',
                    name: 'Matheus Chaves',
                });
            } else {
                reject(new Error('usuario ou senha inválidos'));
            }
        }, 500);
    });
}

export const authService = { signIn }