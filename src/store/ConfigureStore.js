import { createStore, combineReducers } from 'redux';
import AuthorizationReducer from './reducers/Authorization';

const rootReducer = combineReducers({
    authorization: AuthorizationReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;