import { UserInfos } from "../../types";

export const PRIVATE_USER_SET_INFOS = 'PRIVATE_USER_SET_INFOS';
export const PRIVATE_USER_SET_PROFILE_PICTURE = 'PRIVATE_USER_SET_PROFILE_PICTURE';
export const PRIVATE_USER_SET_HAS_GODFATHER = 'PRIVATE_USER_SET_HAS_GODFATHER';

export const PRIVATE_USER_REFRESH_SEARCH_TAB = 'PRIVATE_USER_REFRESH_SEARCH_TAB';
export const PRIVATE_USER_REFRESH_GODFATHER_TAB = 'PRIVATE_USER_REFRESH_GODFATHER_TAB';
export const PRIVATE_USER_REFRESH_GODSON_TAB = 'PRIVATE_USER_REFRESH_GODSON_TAB';
export const PRIVATE_USER_REFRESH_REQUEST_TAB = 'PRIVATE_USER_REFRESH_REQUEST_TAB';

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

export function actionPrivateUserSetHasGodfather(hasGodfather: boolean) {
    return {
        type: PRIVATE_USER_SET_HAS_GODFATHER,
        value: hasGodfather,
    };
}

export function actionPrivateUserRefreshSearchTab() {
    return {
        type: PRIVATE_USER_REFRESH_SEARCH_TAB,
    };
}

export function actionPrivateUserRefreshGodfatherTab() {
    return {
        type: PRIVATE_USER_REFRESH_GODFATHER_TAB,
    };
}

export function actionPrivateUserRefreshGodsonTab() {
    return {
        type: PRIVATE_USER_REFRESH_GODSON_TAB,
    };
}

export function actionPrivateUserRefreshRequestTab() {
    return {
        type: PRIVATE_USER_REFRESH_REQUEST_TAB,
    };
}
