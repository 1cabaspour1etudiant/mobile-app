import { ForgottenPasswordState } from '../../types';
import { FORGOT_PASSWORD_SET_EMAIL } from './action';

const initialState: ForgottenPasswordState = {
    email: '',
    code: 0,
    password: '',
};


export default function(state = initialState, action: any) {
    switch(action.type) {
        case FORGOT_PASSWORD_SET_EMAIL:
            return {...state, email: action.value};

        default:
            return state;
    }
}
