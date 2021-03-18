import { API_URL } from '@env';
import Store from '../../store';
import { checkError, jsonMapper } from "./utils";
import { actionSetTokens } from '../screens/tokens.action';

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
            Store.dispatch(actionSetTokens(accessToken, accessTokenExpirationDate));
        });
}
