import { API_URL } from "@env";
import { AwaitingSponsorshipResponse } from "./types";
import { checkError, getAccessToken, jsonMapper } from "./utils";

export async function getSponsorshipRequests(
    page = 0,
    pageSize = 20,
    type = 'received',
    abortController = new AbortController(),
): Promise<AwaitingSponsorshipResponse> {
    const accessToken = await getAccessToken();
    const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        type,
    });
    const url = `${API_URL}/sponsorship/requests?${params}`;
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

export async function putSponsorshipAccept(sponsorshipId: number) {
    const accessToken = await getAccessToken();
    const url = `${API_URL}/sponsorship/accept`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    const options = {
        method: 'GET',
        headers,
        body: JSON.stringify({ sponsorshipId }),
    };

    return fetch(url, options)
        .then(checkError);
}
