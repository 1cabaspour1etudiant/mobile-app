export enum UserStatus {
    ADMIN = 'admin',
    GODSON = 'godson',
    GODFATHER = 'godfather'
};

export type Address = {
    address: string;
    city: string;
    zipCode: string;
};

export type UserInfos = {
    userId: number;
    firstname: string;
    lastname: string;
    tel: string;
    address: Address;
    status: UserStatus;
    validated: boolean;
    email: string;
};

export type UserState = {
    infos: UserInfos,
    profilePicture: string;
    hasGodfather: boolean;
}

export interface TokenState {
    accessToken: string;
    accessTokenExpirationDate: string;
}

export type State = {
    user: UserState,
}
