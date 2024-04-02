import { initialState } from './initialState'
import * as actionTypes from '../actionTypes/actionTypes'

const initState = initialState

export const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        userDetails: action.payload
      }
    case actionTypes.SIGN_UP:
      return {
        ...state,
        user: action.payload
      }
    case actionTypes.TEST:
      return {
        ...state,
        testData: action.payload
      }
    case actionTypes.UPLOAD_IMAGE:
      return {
        ...state,
        testData: action.payload
      }
    case actionTypes.FETCH_EVENTS:
      return {
        ...state,
        mapEvents: action.payload.data.Items?.map(v => ({
          // id: new Date()+''.split(' ').join(),
          ...v,
          name: v.eventName,
          image: v.imageData,
          location: { lat: v?.eventLat, lng: v?.eventLong }
        })),
        events: action.payload.data
      }

    case actionTypes.SET_PRODUCT_FOR_BUYING:
      return {
        ...state,
        eventForBooking: action.payload
      }
    case actionTypes.ORDERS_BY_ADDRESS:
      return {
        ...state,
        bookings: action.payload
      }
    case actionTypes.LOADER:
      return {
        ...state,
        showLoader: action.payload
      }
    case actionTypes.FETCH_BOOKINGS:
      return {
        ...state,
        orders: action.payload.data
      }
    case actionTypes.SET_TICKET_COUNTER:
      return {
        ...state,
        ticketCounter: action.payload
      }
    case actionTypes.DIRECTIONS:
      return {
        ...state,
        directions: action.payload
      }
    case actionTypes.RESET_DIRECTIONS:
      return {
        ...state,
        directions: {}
      }
    default:
      return state
  }
}
