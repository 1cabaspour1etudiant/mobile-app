export const FORGOT_PASSWORD_SET_EMAIL = 'FORGOT_PASSWORD_SET_EMAIL';
export const FORGOT_PASSWORD_SET_VERIFICATION_CODE = 'FORGOT_PASSWORD_SET_VERIFICATION_CODE';
export const FORGOT_PASSWORD_SET_NEW_PASSWORD = 'FORGOT_PASSWORD_SET_NEW_PASSWORD';

export function actionForgotPasswordSetEmail(email: string) {
    return {
        type: FORGOT_PASSWORD_SET_EMAIL,
        value: email,
    };
}

export function actionForgotPasswordSetVerificationCode(code: string) {
    return {
        type: FORGOT_PASSWORD_SET_VERIFICATION_CODE,
        value: code,
    };
}

export function actionForgotPasswordSetNewPassword(password: string) {
    return {
        type: FORGOT_PASSWORD_SET_NEW_PASSWORD,
        value: password,
    };
}
