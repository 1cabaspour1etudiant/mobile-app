import { ForgottenPasswordState } from '../../types';
import { FORGOT_PASSWORD_SET_EMAIL,
    FORGOT_PASSWORD_SET_NEW_PASSWORD,
    FORGOT_PASSWORD_SET_VERIFICATION_CODE
} from './action';

const initialState: ForgottenPasswordState = {
    email: '',
    code: 0,
    password: '',
};


export default function(state = initialState, action: any) {
    switch(action.type) {
        case FORGOT_PASSWORD_SET_EMAIL:
            return {...state, email: action.value};

        case FORGOT_PASSWORD_SET_VERIFICATION_CODE:
            return {...state, code: action.value};

        case FORGOT_PASSWORD_SET_NEW_PASSWORD:
            return {...state, password: action.value};

        default:
            return state;
    }
}
