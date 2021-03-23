export type UserSearch = {
    id: number;
    firstname: string;
    activityArea: string;
    distance: number;
};

export type UserSearchResponse = {
    page: number;
    lastPage: boolean;
    items: UserSearch[];
    pageSize: number;
}
