import { UserInfos, UserStatus } from '../../types';
import {
    PRIVATE_USER_SET_INFOS,
    PRIVATE_USER_SET_PROFILE_PICTURE
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
}

const initialState = {
    infos: initialInfos,
    profilePicture: '',
};

export default function(state = initialState, action: any) {
    switch(action.type) {
        case PRIVATE_USER_SET_INFOS:
            return { ...state, infos:action.value };

        case PRIVATE_USER_SET_PROFILE_PICTURE:
            return { ...state, profilePicture: action.value };

        default:
            return state;
    }
}
