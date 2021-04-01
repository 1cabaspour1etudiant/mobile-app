import {
    REGISTER_SET_EMAIL,
    REGISTER_SET_PASSWORD,
    REGISTER_SET_PHONE_NUMBER,
    REGISTER_SET_FIRSTNAME,
    REGISTER_SET_LASTNAME,
    REGISTER_SET_ADDRESS,
    REGISTER_SET_CITY,
    REGISTER_SET_ZIP_CODE,
    REGISTER_SET_STATUS,
} from './action';

import { statusList } from './lists';
import { UserRegister } from '../../types';

const initialState: UserRegister = {
    email: '',
    password: '',
    tel: '',
    firstname: '',
    lastname:'',
    address: '',
    city: '',
    zipCode: '',
    status: statusList[0],
};

export default function(state = initialState, action: any): UserRegister {
    switch(action.type) {
        case REGISTER_SET_EMAIL:
            return {...state, email: action.value};

        case REGISTER_SET_PASSWORD:
            return {...state, password: action.value};

        case REGISTER_SET_PHONE_NUMBER:
            return {...state, tel: action.value};

        case REGISTER_SET_FIRSTNAME:
            return {...state, firstname: action.value};

        case REGISTER_SET_LASTNAME:
            return {...state, lastname: action.value};

        case REGISTER_SET_ADDRESS:
            return {...state, address: action.value};

        case REGISTER_SET_CITY:
            return {...state, city: action.value};

        case REGISTER_SET_ZIP_CODE:
            return {...state, zipCode: action.value};

        case REGISTER_SET_STATUS:
            return {...state, status: action.value};

        default:
            return state;
    }
}