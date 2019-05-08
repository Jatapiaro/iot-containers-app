import {
    SET_CONTAINERS, SET_CONTAINER
} from './../actions/ActionTypes';

const initialState = {
    containers: []
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_CONTAINERS:
            return {
                ...state,
                containers: action.containers
            };
        case SET_CONTAINER:
            return  {
                ...state,
                containers: [action.container].concat(state.containers)
            };
        default:
            return state;
    }

}

export default reducer;