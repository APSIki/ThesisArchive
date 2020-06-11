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
    ],
    staffPersons: [
        {
            "id": "2",
            "name": "Wiesława Promotorska"
        },
        {
            "id": "3",
            "name": "Krzysztof Przewodniczącki"
        },
        {
            "id": "4",
            "name": "Krystyna Członkowska"
        },
        {
            "id": "5",
            "name": "Janusz Admiński"
        },
        {
            "id": "6",
            "name": "Monika Przykładowa"
        },
        {
            "id": "7",
            "name": "Wiesław Elektroniczny"
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
        case actionTypes.SET_STAFF_PERSONS: {
            return {
                ...state,
                staffPersons: action.value
            }
        }
        default: {
            return state
        }
    }
}

export default reducer