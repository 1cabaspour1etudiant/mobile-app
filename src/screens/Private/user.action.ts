import { UserInfos } from "../../types";

export const PRIVATE_USER_SET_INFOS = 'PRIVATE_USER_SET_INFOS';
export const PRIVATE_USER_SET_PROFILE_PICTURE = 'PRIVATE_USER_SET_PROFILE_PICTURE';

export function actionPrivateUserSetInfos(infos: UserInfos) {
    return {
        type: PRIVATE_USER_SET_INFOS,
        value: infos,
    };
}

export function actionPrivateUserSetProfilePicture(profilePicture: string) {
    return {
        type: PRIVATE_USER_SET_PROFILE_PICTURE,
        value: profilePicture,
    };
}
