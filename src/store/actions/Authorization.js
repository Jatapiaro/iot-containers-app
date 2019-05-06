import {
    SET_AUTHORIZATION,
    REMOVE_AUTHORIZATION
} from './ActionTypes';

export const setAuthorization = (authorization) => {
    return {
        type: SET_AUTHORIZATION,
        authorization: authorization
    }
}

export const removeAuthorization = () => {
    return {
        type: REMOVE_AUTHORIZATION
    }
}