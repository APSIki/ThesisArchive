import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authorization: "1"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS: {
            return {
                ...state,
                ...action.value
            }
        }
        case actionTypes.SET_AUTHORIZATION: {
            return {
                ...state,
                authorization: action.value
            }
        }
        default: {
            return state
        }
    }
}

export default reducer