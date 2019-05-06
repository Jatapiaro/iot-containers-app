import {
    SET_AUTHORIZATION, REMOVE_AUTHORIZATION
} from './../actions/ActionTypes';

const initialState = {
    authorization: null
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_AUTHORIZATION:
            return {
                ...state,
                authorization: action.authorization
            };
        case REMOVE_AUTHORIZATION:
            return  {
                ...state,
                authorization: null
            };
        default:
            return state;
    }

}

export default reducer;

