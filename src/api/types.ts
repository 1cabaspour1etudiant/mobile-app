export type UserSearch = {
    id: number;
    firstname: string;
    distance: number;
    address: string;
};

export type UserSearchResponse = {
    page: number;
    lastPage: boolean;
    items: UserSearch[];
    pageSize: number;
}
