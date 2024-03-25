import { initialState } from "./initialState";
import * as actionTypes from '../actionTypes/actionTypes'


const initState = initialState


export const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        numOfItems: state.numOfItems + 1,
      };
    case actionTypes.USERS_LIST:
      return {
        ...state,
        usersList: action.payload,
      };

    case actionTypes.SIGN_UP:
      return {
        ...state,
        user: action.payload
      };
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
            mapEvents: action.payload.data.Items?.map((v) => ({
              // id: new Date()+''.split(' ').join(),
              ...v,
              name: v.eventName,
              image: v.imageData,
              location: { lat: v?.eventLat, lng: v?.eventLong
              }
          })),
            events: action.payload.data
        }
    default:
      return state;
  }
};
