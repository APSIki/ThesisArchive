import { SET_CURRENT_THESIS } from "../actions/actions";

export default function currentThesis(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_THESIS: {
            return {
                ...state,
                ...action.value
            }
        }
        default: 
            return state;
    }
}