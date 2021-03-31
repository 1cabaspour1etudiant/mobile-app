import { API_URL } from '@env';
import Store from '../../store';
import { checkError, jsonMapper } from "./utils";
import { actionSetToken } from '../screens/token.action';

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
        .then(({
            accessToken = '',
            accessTokenExpirationDate,
        }) => {
            Store.dispatch(actionSetToken(accessToken, accessTokenExpirationDate + ''));
        });
}

export function postPasswordRecoveryCode(email:string) {
    const url = `${API_URL}/auth/password/recoverycode`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({ email }),
    };

    return fetch(url, options)
        .then(checkError);
}


export function postPasswordRecover(email:string, code:number, password: string) {
    const url = `${API_URL}/auth/password/recover`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, code, password }),
    };

    return fetch(url, options)
        .then(checkError);
}
