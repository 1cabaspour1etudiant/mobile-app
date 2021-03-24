
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
};
