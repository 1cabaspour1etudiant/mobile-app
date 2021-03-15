import {
    LOGIN_SET_EMAIL,
    LOGIN_SET_PASSWORD,
} from './action';

const initialState = {
    email: '',
    password: '',
};

export default (state = initialState, action: any) => {
    switch(action.type) {

        case LOGIN_SET_EMAIL:
            return {...state, email: action.value};

        case LOGIN_SET_PASSWORD:
            return {...state, password: action.value};

        default:
            return state;
    }
};
