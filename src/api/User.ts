import { API_URL } from '@env';
import { UserRegister } from '../screens/Register/types';
import { checkError, getAccessToken, jsonMapper } from './utils';
import Store from '../../store';
import { actionSetToken } from '../screens/token.action';
import { GetsonsResponse, GetUserInfos, GodfatherInfos, UserSearchResponse } from './types';
import { UserInfos } from '../screens/types';

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

export async function getUserSearch(page = 0, pageSize = 20, abortController = new AbortController()):Promise<UserSearchResponse> {
    const accessToken = await getAccessToken();
    
    const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
    });
    const url = `${API_URL}/user/search?${params}`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    const { signal } = abortController;
    const options = {
        method: 'GET',
        headers,
        signal,
    };

    return fetch(url, options)
        .then(checkError)
        .then(jsonMapper);
}

export async function getUserProfilePicture(userId: number, abortController = new AbortController()) {
    const accessToken = await getAccessToken();
    const params = new URLSearchParams({ userId: userId.toString() });
    const url = `${API_URL}/user/profilePicture?${params}`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    const { signal } = abortController;
    const options = {
        method: 'GET',
        headers,
        signal,
    };

    return fetch(url, options)
        .then(checkError)
        .then((res) => res.text());
}

export async function getUserMeInfos(): Promise<UserInfos> {
    const accessToken = await getAccessToken();
    const url = `${API_URL}/user/me`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    const options = {
        method: 'GET',
        headers
    };

    return fetch(url, options)
        .then(checkError)
        .then(jsonMapper);
}

export async function getUserMeProfilePicture():Promise<string> {
    const accessToken = await getAccessToken();
    const url = `${API_URL}/user/me/profilePicture`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    const options = {
        method: 'GET',
        headers
    };

    return fetch(url, options)
        .then(checkError)
        .then((res) => res.text());
}

export async function getUserInfos(userId: number, abortController = new AbortController()):Promise<GetUserInfos> {
    const accessToken = await getAccessToken();
    const params = new URLSearchParams({ userId: userId.toString() });
    const url = `${API_URL}/user?${params}`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    const { signal } = abortController;
    const options = {
        method: 'GET',
        headers,
        signal,
    };

    return fetch(url, options)
        .then(checkError)
        .then(jsonMapper);
}

export async function getSponsorshipGodsonGodfather(abortController = new AbortController()):Promise<GodfatherInfos> {
    const accessToken = await getAccessToken();
    const url = `${API_URL}/sponsorship/godfather`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    const { signal } = abortController;
    const options = {
        method: 'GET',
        headers,
        signal,
    };

    return fetch(url, options)
        .then(checkError)
        .then(jsonMapper);
}

export async function getSponsorshipGodfatherGodsons(page = 0, pageSize = 20, abortController = new AbortController()):Promise<GetsonsResponse> {
    const accessToken = await getAccessToken();
    const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
    });

    const url = `${API_URL}/sponsorship/godsons?${params}`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    const { signal } = abortController;
    const options = {
        method: 'GET',
        headers,
        signal,
    };

    return fetch(url, options)
        .then(checkError)
        .then(jsonMapper);
}
