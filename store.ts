import {
    createStore,
    combineReducers,
} from 'redux';

import login from './src/screens/Login/reducer';


const rootReducer = combineReducers({
    login
});

export default createStore(rootReducer);