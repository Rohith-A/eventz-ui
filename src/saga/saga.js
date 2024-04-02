import {
  put,
  call,
  // takeLatest,
  takeEvery
} from 'redux-saga/effects'

import * as actionTypes from '../actionTypes/actionTypes'

import { getAxios, postAxios } from '../api/api';

const apiHost = process.env.REACT_APP_API_HOST || 'http://evntz-node-api-ra-ie.ap-south-1.elasticbeanstalk.com/';
console.log(process.env)
function* getUsersList() {
  const url = `${apiHost}authentication/users`
  const userslist = yield call(getAxios, url)
  yield put({ type: actionTypes.USERS_LIST, payload: userslist })
}

function* getTodos() {
  const url = `${apiHost}harrypotter/characters`
  const todos = yield call(getAxios, url)
  yield put({ type: actionTypes.TEST, payload: todos })
}

// function* signUpUser(action) {
//   const url = `${apiHost}authentication/registration`
//   const resigstration = yield call(postAxios, url)
//   yield put({ type: actionTypes.SIGN_UP, payload: resigstration })
//   action.payload.navigate('/tasks')

// }
function* registerUser(action) {
  const url = `${apiHost}authentication/registration`
  const data = action.payload.userDetails
  const resigstration = yield call(postAxios, url, data)
  yield put({ type: actionTypes.SIGN_UP, payload: resigstration })
  action.payload.navigate('/login')

}
function* loginUser(action) {
  try {
  const url = `${apiHost}authentication/login/`
  const data = action.payload.userDetails
  const userDetails = yield call(postAxios, url, data)
  localStorage.setItem('sessionId', userDetails.data.userDetails.sessionId)
  localStorage.setItem('userName', userDetails.data.userDetails.userName)
  localStorage.setItem('organiser', userDetails.data.userDetails.organiser)
  yield put({ type: actionTypes.LOGIN, payload: userDetails.data.userDetails })
  action.payload.navigate('/events')
  } catch(e) {
    alert('Invalid Credentials')
  }
}

function* getEvents() {
  const url = `${apiHost}events`
  const events = yield call(getAxios, url)
  yield put({ type: actionTypes.FETCH_EVENTS, payload: events })
}

function* addNewEvent(action) {
  const url = `${apiHost}events`
  const events = yield call(postAxios, url, action.payload.eventData)
  action.payload.navigate('/events')
  yield put({ type: actionTypes.ADD_NEW_EVENT, payload: events })
}
function* bookTicketEvent(action) {
  const url = `${apiHost}booking`
  const events = yield call(postAxios, url, action.payload)
  yield put({ type: actionTypes.BOOK_TICKET, payload: events })
}
function* fetchBookings(action) {
  const url = `${apiHost}booking/orders`
  const events = yield call(postAxios, url, action.payload)
  yield put({ type: actionTypes.FETCH_BOOKINGS, payload: events })
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.TEST_API, getTodos)
  // yield takeEvery(actionTypes.SIGN_UP_API, signUpUser)
  yield takeEvery(actionTypes.USERS_LIST_API, getUsersList)
  yield takeEvery(actionTypes.LOGIN_API, loginUser)
  yield takeEvery(actionTypes.REGISTRATION_API, registerUser)
  yield takeEvery(actionTypes.FETCH_EVENTS_API, getEvents)
  yield takeEvery(actionTypes.ADD_NEW_EVENT_API, addNewEvent)
  yield takeEvery(actionTypes.BOOK_TICKET_API, bookTicketEvent)
  yield takeEvery(actionTypes.FETCH_BOOKINGS_API, fetchBookings)
}