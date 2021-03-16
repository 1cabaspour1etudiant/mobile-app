import {
    createStore,
    combineReducers,
} from 'redux';

import login from './src/screens/Login/reducer';
import register from './src/screens/Register/reducer';

const rootReducer = combineReducers({
    login,
    register,
});

export default createStore(rootReducer);