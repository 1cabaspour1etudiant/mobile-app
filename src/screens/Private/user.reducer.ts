import { UserInfos, UserState, UserStatus } from '../../types';
import {
    PRIVATE_USER_SET_INFOS,
    PRIVATE_USER_SET_PROFILE_PICTURE,
    PRIVATE_USER_SET_HAS_GODFATHER,
    PRIVATE_USER_REFRESH_SEARCH_TAB,
    PRIVATE_USER_REFRESH_GODFATHER_TAB,
    PRIVATE_USER_REFRESH_REQUEST_TAB,
} from './user.action';

const initialInfos:UserInfos = {
    userId: 0,
    firstname: '',
    lastname: '',
    tel: '',
    address: {
        address: '',
        city: '',
        zipCode: '',
    },
    status: UserStatus.GODSON,
    validated: false,
    email: '',
}

const initialState:UserState = {
    infos: initialInfos,
    profilePicture: '',
    hasGodfather: false,
    requestTabRefreshIndex: 0,
    godfatherTabRefreshIndex: 0,
    searchTabRefreshIndex: 0,
};

export default function(state = initialState, action: any) {
    switch(action.type) {
        case PRIVATE_USER_SET_INFOS:
            return { ...state, infos:action.value };

        case PRIVATE_USER_SET_PROFILE_PICTURE:
            return { ...state, profilePicture: action.value };

        case PRIVATE_USER_SET_HAS_GODFATHER:
            return { ...state, hasGodfather: action.value};

        case PRIVATE_USER_REFRESH_SEARCH_TAB:
            return { ...state, searchTabRefreshIndex: state.searchTabRefreshIndex + 1};

        case PRIVATE_USER_REFRESH_GODFATHER_TAB:
            return { ...state, godfatherTabRefreshIndex: state.godfatherTabRefreshIndex + 1};

        case PRIVATE_USER_REFRESH_REQUEST_TAB:
            return { ...state, requestTabRefreshIndex: state.requestTabRefreshIndex + 1};

        default:
            return state;
    }
}
