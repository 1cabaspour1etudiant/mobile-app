export const LOGIN_SET_EMAIL = 'LOGIN_SET_EMAIL';
export const LOGIN_SET_PASSWORD = 'LOGIN_SET_PASSWORD';
export const LOGIN_CLEAR = 'LOGIN_CLEAR';

export function actionLoginSetEmail(email:string) {
    return {
        type: LOGIN_SET_EMAIL,
        value: email,
    };
}

export function actionLoginSetPassword(password:string) {
    return {
        type: LOGIN_SET_PASSWORD,
        value: password,
    };
}

export function actionClearLogin() {
    return {
        type: LOGIN_CLEAR
    };
}
