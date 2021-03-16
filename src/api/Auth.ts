import { API_URL } from '@env';
import { checkError, jsonMapper } from "./utils";

export function postLogin(email: string, password: string) {
    const url = `${API_URL}/auth/login`;
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password })
    };

    return fetch(url, options)
        .then(checkError)
        .then(jsonMapper)
        .then(({ access_token = '' }) => {
            return access_token;
        });
}
