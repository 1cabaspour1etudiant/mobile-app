import {
    PRIVATE_USER_SET_INFOS
} from './user.action';

const initialState = {
    infos: {
        firstname: '',
        lastname: '',
        tel: '',
        address: {
            address: '',
            city: '',
            zipCode: '',
        },
    },
};

export default function(state = initialState, action: any) {
    switch(action.type) {
        case PRIVATE_USER_SET_INFOS:
            return { ...state, infos:action.value };

        default:
            return state;
    }
}
