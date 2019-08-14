import {
    SET_CONTAINERS,
    SET_CONTAINER,
    UPDATE_CONTAINER,
    DELETE_CONTAINER,
    SET_CONTAINER_MEASURES
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

export const deleteContainer = (container) => {
    return {
        type: DELETE_CONTAINER,
        container: container
    }
}

export const setContainerMeasures = (container, measures) => {
    return {
        type: SET_CONTAINER_MEASURES,
        container: container,
        measures: measures
    }
}
