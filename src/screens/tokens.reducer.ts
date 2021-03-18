import AsyncStorage from '@react-native-community/async-storage';

import {
  TOKENS_SET_TOKENS,
} from './tokens.action';


import { PRIVATE_CLEAR } from './constant';

const initialState = {
  accessToken: '',
  accessTokenExpirationDate: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case TOKENS_SET_TOKENS: {
        const {
            accessToken,
            accessTokenExpirationDate,
        } = action.value;

        AsyncStorage.setItem('accessToken', accessToken)
            .catch(console.log);

        AsyncStorage.setItem('accessTokenExpirationDate', accessTokenExpirationDate)
            .catch(console.log);

      return { ...state, ...action.value };
    }

    case PRIVATE_CLEAR:
        AsyncStorage.removeItem('accessToken')
            .catch(console.log);

        AsyncStorage.removeItem('accessTokenExpirationDate')
            .catch(console.log);

      return { ...initialState };

    default:
      return state;
  }
};
