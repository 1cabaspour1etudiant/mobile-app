import {
    createStore,
    combineReducers,
} from 'redux';

import login from './src/screens/Login/reducer';
import register from './src/screens/Register/reducer';
import token from './src/screens/token.reducer';
import user from './src/screens/Private/user.reducer';

const rootReducer = combineReducers({
    login,
    register,
    token,
    user,
});

export default createStore(rootReducer);