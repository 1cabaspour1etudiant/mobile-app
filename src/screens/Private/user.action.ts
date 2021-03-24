import { PrivateUserInfos } from "./types";

export const PRIVATE_USER_SET_INFOS = 'PRIVATE_USER_SET_INFOS';

export function actionPrivateUserSetInfos(infos: PrivateUserInfos) {
    return {
        type: PRIVATE_USER_SET_INFOS,
        value: infos,
    };
}
