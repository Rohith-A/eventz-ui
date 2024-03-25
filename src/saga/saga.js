import {
  put,
  call,
  // takeLatest,
  takeEvery
} from 'redux-saga/effects'

import * as actionTypes from '../actionTypes/actionTypes'

import { getAxios, postAxios } from '../api/api';

const apiHost = process.env.REACT_APP_LOCAL_API_HOST || 'http://localhost:3005/';
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
  const url = `${apiHost}authentication/login/`
  const data = action.payload.userDetails
  const resigstration = yield call(postAxios, url, data)
  yield put({ type: actionTypes.SIGN_UP, payload: resigstration })
  action.payload.navigate('/tasks')
}

function* getEvents() {
  const url = `${apiHost}events`
  const events = yield call(getAxios, url)
  yield put({ type: actionTypes.FETCH_EVENTS, payload: events })
}

function* addNewEvent(action) {
  const url = `${apiHost}events`
  const events = yield call(postAxios, url, action.payload)
  yield put({ type: actionTypes.ADD_NEW_EVENT, payload: events })
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.TEST_API, getTodos)
  // yield takeEvery(actionTypes.SIGN_UP_API, signUpUser)
  yield takeEvery(actionTypes.USERS_LIST_API, getUsersList)
  yield takeEvery(actionTypes.LOGIN, loginUser)
  yield takeEvery(actionTypes.REGISTRATION_API, registerUser)
  yield takeEvery(actionTypes.FETCH_EVENTS_API, getEvents)
  yield takeEvery(actionTypes.ADD_NEW_EVENT_API, addNewEvent)
}