import * as actionTypes from "../actionTypes/actionTypes";

const action = (type, payload) => {
    return {
        type,
        payload
    }
}

export const getUsers = () => {
    return action(actionTypes.USERS_LIST_API)
};

export const signUp = (payload) => {
    return action(actionTypes.REGISTRATION_API, payload)
};

export const login = (payload) => {
    return action(actionTypes.LOGIN, payload)
}

export const test = (payload) => {
    return action(actionTypes.TEST, payload)
}

export const uploadImage = (payload) => {
    return action(actionTypes.UPLOAD_IMAGE_API, payload)
}
export const fetchEvents = (payload) => {
    return action(actionTypes.FETCH_EVENTS_API, payload)
}

export const addNewEvent = (payload) => {
    return action(actionTypes.ADD_NEW_EVENT_API, payload)
}