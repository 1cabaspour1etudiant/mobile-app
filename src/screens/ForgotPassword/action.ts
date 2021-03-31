export const FORGOT_PASSWORD_SET_EMAIL = 'FORGOT_PASSWORD_SET_EMAIL';

export function actionForgotPasswordSetEmail(email: string) {
    return {
        type: FORGOT_PASSWORD_SET_EMAIL,
        value: email,
    };
}
