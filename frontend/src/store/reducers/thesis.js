import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    theses: [
        
    ],
    currentThesis: []
}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_THESIS:
            // return {
            //     ...state,
            //     currentThesis: [...state.currentThesis, action.currentThesis]
            // }
            return updateObject(state, {currentThesis: action.currentThesis});
        case actionTypes.ADD_THESIS:
            return {
                ...state,
                theses: [...state.theses, action.thesis]
            };
        case actionTypes.GET_THESES:
            return {
                ...state.theses
            }
        case actionTypes.SET_THESES: {
            return {
                ...state,
                ...action.value
            }
        }
        default: {
            return state
        }
    }
};

export default reducer;