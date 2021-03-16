export const REGISTER_SET_EMAIL = 'REGISTER_SET_EMAIL';
export const REGISTER_SET_PASSWORD = 'REGISTER_SET_PASSWORD';
export const REGISTER_SET_PHONE_NUMBER = 'REGISTER_SET_PHONE_NUMBER';
export const REGISTER_SET_FIRSTNAME = 'REGISTER_SET_FIRSTNAME';
export const REGISTER_SET_NAME = 'REGISTER_SET_NAME';
export const REGISTER_SET_ADRESS = 'REGISTER_SET_ADRESS';
export const REGISTER_SET_CITY = 'REGISTER_SET_CITY';
export const REGISTER_SET_ZIP_CODE = 'REGISTER_SET_ZIP_CODE';
export const REGISTER_SET_STATUS = 'REGISTER_SET_STATUS';
export const REGISTER_SET_ACTIVITY_AREA = 'REGISTER_SET_ACTIVITY_AREA';

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

export function actionRegisterSetName(name: string) {
    return {
        type: REGISTER_SET_NAME,
        value: name,
    };
}

export function actionRegisterSetAdress(adress: string) {
    return {
        type: REGISTER_SET_ADRESS,
        value: adress,
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

export function actionRegisterSetActivityArea(activityArea: string) {
    return {
        type: REGISTER_SET_ACTIVITY_AREA,
        value: activityArea,
    };
}
