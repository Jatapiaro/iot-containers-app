import {
    SET_CONTAINERS, SET_CONTAINER, UPDATE_CONTAINER, DELETE_CONTAINER, SET_CONTAINER_MEASURES
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
        case DELETE_CONTAINER:
            let conts = state.containers;
            let index = -1;
            for (let i = 0; i < conts.length; i++) {
                let container = conts[i];
                if (container.id === action.container.id) {
                    index = i;
                    break;
                }
            }
            conts.splice(index, 1);
            return {
                ...state,
                containers: conts
            }
        case SET_CONTAINER_MEASURES:
            let containrs = state.containers;
            for (let i = 0; i < containrs.length; i++) {
                let container = containrs[i];
                if (container.id === action.container.id) {
                    container.measures = [].concat(action.measures)
                    break;
                }
            }
            return {
                ...state,
                containers: containrs
            }
        default:
            return state;
    }

}

export default reducer;