import Store from '../../store';

export const jsonMapper = (res: Response) => res.json();
export const checkError = async (res: Response) => {
    if (res.status !== 200 && res.status !== 201) {
        let json;
        try {
            json = await res.json();
        } catch(e) {
            throw new Error(`No json error with code ${res.status}`);
        }
        throw json;
    }
    return res;
};

export async function getAccessToken():Promise<string> {
    const { token: { accessToken, accessTokenExpirationDate } } = Store.getState();

    //TODO check the token and refresh it if possible

    return accessToken;
}
