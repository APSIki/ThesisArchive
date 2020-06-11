import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authorization: "1",
    subjectMatters: [
        {
            "id": "1",
            "name": "teleinformatyka"
        },
        {
            "id": "2",
            "name": "dorożkarstwo"
        },
        {
            "id": "3",
            "name": "systemy wbudowane"
        },
        {
            "id": "4",
            "name": "systemy operacyjne"
        }
    ],
    organizationalUnits: [
        {
            "id": "1",
            "name": "Instytut Telekomunikacji"
        },
        {
            "id": "2",
            "name": "Instytut Informatyki"
        },
        {
            "id": "3",
            "name": "Instytut Radiokomunikacji i Mulitimediów"
        }
    ]
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