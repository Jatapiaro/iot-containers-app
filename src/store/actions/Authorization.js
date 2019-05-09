import {
    SET_AUTHORIZATION,
    REMOVE_AUTHORIZATION,
    SET_PROFILE
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

export const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        profile: profile
    }
}
