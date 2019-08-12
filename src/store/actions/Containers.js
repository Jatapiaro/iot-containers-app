import {
    SET_CONTAINERS,
    SET_CONTAINER,
    UPDATE_CONTAINER
} from './ActionTypes';

export const setContainers = (containers) => {
    return {
        type: SET_CONTAINERS,
        containers: containers
    }
}

export const setContainer = (container) => {
    return {
        type: SET_CONTAINER,
        container: container
    }
}

export const updateContainer = (container) => {
    return {
        type: UPDATE_CONTAINER,
        container: container
    }
}