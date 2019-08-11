import {
    SET_AUTHORIZATION, REMOVE_AUTHORIZATION, SET_PROFILE
} from './../actions/ActionTypes';

const initialState = {
    authorization: null,
    authorized: false,
    profile: null,
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_AUTHORIZATION:
            return {
                ...state,
                authorization: action.authorization,
                authorized: true
            };
        case REMOVE_AUTHORIZATION:
            return  {
                ...state,
                authorization: null,
                authorized: false,
                profile: null
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: {
                    id: action.profile.id,
                    name: action.profile.name,
                    email: action.profile.email
                }
            }
        default:
            return state;
    }

}

export default reducer;

