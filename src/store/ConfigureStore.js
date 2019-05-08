import { createStore, combineReducers } from 'redux';
import AuthorizationReducer from './reducers/Authorization';
import ContainersReducer from './reducers/Containers';

const rootReducer = combineReducers({
    authorization: AuthorizationReducer,
    containers: ContainersReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;