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
    return action(actionTypes.LOGIN_API, payload)
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

export const setProductForBuying = (payload) => {
    return action(actionTypes.SET_PRODUCT_FOR_BUYING, payload)
}
export const ordersByAddressData = (payload) => {
    return action(actionTypes.ORDERS_BY_ADDRESS_API, payload)
}
export const showLoader = (payload) => {
    return action(actionTypes.LOADER, payload)
}
export const bookTicket = (payload) => {
    return action(actionTypes.BOOK_TICKET_API, payload)
}
export const fetchBookings = (payload) => {
    return action(actionTypes.FETCH_BOOKINGS_API, payload)
}
export const setTicketCounter = (payload) => {
    return action(actionTypes.SET_TICKET_COUNTER, payload)
}
export const resetDirections = (payload) => {
    return action(actionTypes.RESET_DIRECTIONS, payload)
}
export const categoryloader = (payload) => {
    return action(actionTypes.CATEGORY_LOADER, payload)
}
export const fetchWeatherData = (payload) => {
    return action(actionTypes.FETCH_WEATHER_API, payload)
}
export const fetchTodayWeatherData = (payload) => {
    return action(actionTypes.FETCH_WEATHER_TODAY_API, payload)
}