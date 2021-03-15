import {
    createStore,
    combineReducers,
} from 'redux';

import login from './screens/Login/reducer';


const rootReducer = combineReducers({
    login
});

export default createStore(rootReducer);