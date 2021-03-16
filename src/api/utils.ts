export const jsonMapper = (res: Response) => res.json();
export const checkError = (res: Response) => {
    if (res.status !== 200 && res.status !== 201) {
        throw res.status;
    }
    return res;
};
