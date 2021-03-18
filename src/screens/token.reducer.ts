import AsyncStorage from '@react-native-community/async-storage';

import {
  TOKEN_SET_TOKEN,
} from './token.action';


import { PRIVATE_CLEAR } from './constant';
import { TokenState } from './types';

const initialState: TokenState = {
  accessToken: '',
  accessTokenExpirationDate: '',
};

export default (state = initialState, action: any): TokenState => {
  switch (action.type) {
    case TOKEN_SET_TOKEN: {
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
