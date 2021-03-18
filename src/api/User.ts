import { API_URL } from '@env';
import { UserRegister } from '../screens/Register/types';
import { checkError, getAccessToken, jsonMapper } from './utils';
import Store from '../../store';
import { actionSetToken } from '../screens/token.action';

export function getUserEmailIsAvailable(email: string): Promise<boolean> {
    const params = new URLSearchParams({ email });
    const url = `${API_URL}/user/emailIsAvailable?${params}`;

    const options: RequestInit = {
        method: 'GET',
    };
 
    return fetch(url, options)
        .then(checkError)
        .then(jsonMapper);
}

export function postUser(user: UserRegister) {
    const url = `${API_URL}/user`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(user),
        headers,
    };

    return fetch(url, options)
        .then(checkError)
        .then(jsonMapper)
        .then(({ accessToken, accessTokenExpirationDate }) => {
            Store.dispatch(actionSetToken(accessToken, accessTokenExpirationDate + ''));
        });
}

export async function putUserMePicture(imageUri: string) {
    const accessToken = await getAccessToken();
    const url = `${API_URL}/user/me/profilePicture`;
    const headers = new Headers();

    headers.append('Authorization', `Bearer ${accessToken}`);
    headers.append('Content-Type', 'multipart/form-data');

    const formData = new FormData();
    const fileDesc = {
        uri: imageUri,
        type: 'image/jpg',
        name: 'profilePicture.jpg',
    };

    formData.append('file', fileDesc as any);

    const options: RequestInit = {
        method: 'PUT',
        body: formData,
        headers,
    };

    return fetch(url, options)
        .then(checkError);
}
