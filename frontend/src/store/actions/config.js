import * as actionTypes from './actionTypes';

export const setUsers = users => {
    return {
        type: actionTypes.SET_USERS,
        value: users
    }
}

export const setAuthorization = authorization => {
    return {
        type: actionTypes.SET_AUTHORIZATION,
        value: authorization
    }
}

export const setStaffPersons = staffPersons => {
    return {
        type: actionTypes.SET_STAFF_PERSONS,
        value: staffPersons
    }
}