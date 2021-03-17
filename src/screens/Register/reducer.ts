import {
    REGISTER_SET_EMAIL,
    REGISTER_SET_PASSWORD,
    REGISTER_SET_PHONE_NUMBER,
    REGISTER_SET_FIRSTNAME,
    REGISTER_SET_LASTNAME,
    REGISTER_SET_ADRESS,
    REGISTER_SET_CITY,
    REGISTER_SET_ZIP_CODE,
    REGISTER_SET_STATUS,
    REGISTER_SET_ACTIVITY_AREA,
} from './action';

import { activityAreaList, statusList } from './lists';
import { UserRegister } from './types';

const initialState: UserRegister = {
    email: '',
    password: '',
    phoneNumber: '',
    firstname: '',
    lastname:'',
    adress: '',
    city: '',
    zipCode: '',
    status: statusList[0],
    activityArea: activityAreaList[0],
};

export default function(state = initialState, action: any): UserRegister {
    switch(action.type) {
        case REGISTER_SET_EMAIL:
            return {...state, email: action.value};

        case REGISTER_SET_PASSWORD:
            return {...state, password: action.value};

        case REGISTER_SET_PHONE_NUMBER:
            return {...state, phoneNumber: action.value};

        case REGISTER_SET_FIRSTNAME:
            return {...state, firstname: action.value};

        case REGISTER_SET_LASTNAME:
            return {...state, lastname: action.value};

        case REGISTER_SET_ADRESS:
            return {...state, adress: action.value};

        case REGISTER_SET_CITY:
            return {...state, city: action.value};

        case REGISTER_SET_ZIP_CODE:
            return {...state, zipCode: action.value};

        case REGISTER_SET_STATUS:
            return {...state, status: action.value};

        case REGISTER_SET_ACTIVITY_AREA:
            return {...state, activityArea: action.value};

        default:
            return state;
    }
}