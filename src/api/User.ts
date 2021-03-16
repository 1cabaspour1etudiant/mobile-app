import { API_URL } from '@env';
import { checkError, jsonMapper } from './utils';


export function getUserEmailIsAvailable(email: string): Promise<boolean> {
    const params = new URLSearchParams({ email });
    const url = `${API_URL}/user/emailIsAvailable?${params}`;

    const options = {
        method: 'GET',
    };

    return fetch(url, options)
        .then(checkError)
        .then(jsonMapper);
}