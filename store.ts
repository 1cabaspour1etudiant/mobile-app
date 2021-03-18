import {
    createStore,
    combineReducers,
} from 'redux';

import login from './src/screens/Login/reducer';
import register from './src/screens/Register/reducer';
import tokens from './src/screens/tokens.reducer';

const rootReducer = combineReducers({
    login,
    register,
    tokens,
});

export default createStore(rootReducer);