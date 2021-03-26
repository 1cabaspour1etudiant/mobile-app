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

export type PrivateUserInfos = {
    firstname: string;
    lastname: string;
    tel: string;
    address: Address;
    status: UserStatus;
    validated: boolean;
};

export type UserState = {
    infos: PrivateUserInfos,
    profilePicture: string;
}

export type State = {
    user: UserState,
}
