export const REGISTER_SET_EMAIL = 'REGISTER_SET_EMAIL';
export const REGISTER_SET_PASSWORD = 'REGISTER_SET_PASSWORD';
export const REGISTER_SET_PHONE_NUMBER = 'REGISTER_SET_PHONE_NUMBER';
export const REGISTER_SET_FIRSTNAME = 'REGISTER_SET_FIRSTNAME';
export const REGISTER_SET_LASTNAME = 'REGISTER_SET_LASTNAME';
export const REGISTER_SET_ADDRESS = 'REGISTER_SET_ADDRESS';
export const REGISTER_SET_CITY = 'REGISTER_SET_CITY';
export const REGISTER_SET_ZIP_CODE = 'REGISTER_SET_ZIP_CODE';
export const REGISTER_SET_STATUS = 'REGISTER_SET_STATUS';

export function actionRegisterSetEmail(email: string) {
    return {
        type: REGISTER_SET_EMAIL,
        value: email,
    };
}

export function actionRegisterSetPassword(password: string) {
    return {
        type: REGISTER_SET_PASSWORD,
        value: password,
    };
}

export function actionRegisterSetPhoneNumber(phoneNumber: string) {
    return {
        type: REGISTER_SET_PHONE_NUMBER,
        value: phoneNumber,
    };
}

export function actionRegisterSetFirstname(firstname:  string) {
    return {
        type: REGISTER_SET_FIRSTNAME,
        value: firstname,
    };
}

export function actionRegisterSetLastname(name: string) {
    return {
        type: REGISTER_SET_LASTNAME,
        value: name,
    };
}

export function actionRegisterSetAddress(address: string) {
    return {
        type: REGISTER_SET_ADDRESS,
        value: address,
    };
}

export function actionRegisterSetCity(city: string) {
    return {
        type: REGISTER_SET_CITY,
        value: city,
    };
}

export function actionRegisterSetZipCode(zipCode: string) {
    return {
        type: REGISTER_SET_ZIP_CODE,
        value: zipCode,
    };
}

export function actionRegisterSetStatus(status: string) {
    return {
        type: REGISTER_SET_STATUS,
        value: status,
    };
}
