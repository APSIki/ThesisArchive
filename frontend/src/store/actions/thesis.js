import * as actionTypes from './actionTypes';

export const addThesis = (thesis) => {
    return {
        type: actionTypes.ADD_THESIS,
        thesis: thesis
    }
}

export const setCurrentThesis = (thesis) => {
    return {
        type: actionTypes.SET_CURRENT_THESIS,
        currentThesis: thesis
    }
}

export const getTheses = () => {
    return {
        type: actionTypes.GET_THESES
    }
}

export const setTheses = value => {
    return {
        type: actionTypes.SET_THESES,
        value
    }
}