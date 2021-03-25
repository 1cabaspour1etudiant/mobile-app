export type UserSearch = {
    id: number;
    firstname: string;
    activityArea: string;
    distance: number;
    contacted: boolean;
};

export type UserSearchResponse = {
    page: number;
    lastPage: boolean;
    items: UserSearch[];
    pageSize: number;
}

export type Sponsorship = {
    sponsorshipId: number;
    godfatherId: number;
    godsonId: number;
    recipientId: number;
    emitterId: number;
    validated: boolean;
    date: Date;
};

export type AwaitingSponsorshipResponse = {
    page: number;
    lastPage: boolean;
    items: Sponsorship[];
    pageSize: number;
}

export type GetUserInfos = {
    distance: number;
    id: number;
    firstname: string;
    tel: string;
    status: string;
    activityArea: string;
};

export type GodfatherInfos = {
    userId: number;
    sponsorshipId: number;
    sponsorshipDate: Date;
    firstname: string;
    lastname: string;
    tel: string;
    address: string;
};
