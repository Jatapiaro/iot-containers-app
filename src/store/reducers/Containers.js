import {
    SET_CONTAINERS, SET_CONTAINER, UPDATE_CONTAINER
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
        case UPDATE_CONTAINER:
            let containers = state.containers;
            for (let i = 0; i < containers.length; i++) {
                let container = containers[i];
                if (container.id === action.container.id) {
                    containers[i] = action.container;
                    break;
                }
            }
            return {
                ...state,
                containers: [].concat(containers) 
            }
        default:
            return state;
    }

}

export default reducer;