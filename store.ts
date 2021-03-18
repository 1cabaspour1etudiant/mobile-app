import {
    createStore,
    combineReducers,
} from 'redux';

import login from './src/screens/Login/reducer';
import register from './src/screens/Register/reducer';
import token from './src/screens/token.reducer';

const rootReducer = combineReducers({
    login,
    register,
    token,
});

export default createStore(rootReducer);