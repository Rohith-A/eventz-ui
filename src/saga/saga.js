import {
  call,
  delay,
  put,
  // takeLatest,
  takeEvery
} from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/actionTypes';
import { getAxios, postAxios } from '../api/api';

const apiHost = process.env.REACT_APP_API_HOST || 'http://evntz-node-api-ra-ie.ap-south-1.elasticbeanstalk.com/';
console.log(process.env)


function* registerUser(action) {
  try {
  const url = `${apiHost}authentication/registration`
  const data = action.payload.userDetails
  const resigstration = yield call(postAxios, url, data)
  yield put({ type: actionTypes.SIGN_UP, payload: resigstration })
  action.payload.navigate('/login')
  }catch(e) {
    alert('Server Error')
  }

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
  try {
  const url = `${apiHost}events`
  const events = yield call(getAxios, url)
  yield delay(1000);
  yield put({ type: actionTypes.CATEGORY_LOADER, payload: false });
  yield put({ type: actionTypes.FETCH_EVENTS, payload: events })
}catch(e) {
  alert('Server Error')
}
  
}

function* addNewEvent(action) {
  try{
  const url = `${apiHost}events`
  const events = yield call(postAxios, url, action.payload.eventData)
  yield delay(1000);
  yield put({ type: actionTypes.CATEGORY_LOADER, payload: false });
  action.payload.navigate('/events')
  yield put({ type: actionTypes.ADD_NEW_EVENT, payload: events })
}catch(e) {
  alert('Server Error')
}
}

function* bookTicketEvent(action) {
  try{
  const url = `${apiHost}booking`
  const events = yield call(postAxios, url, action.payload.payload)
  yield delay(1000);
  yield put({ type: actionTypes.CATEGORY_LOADER, payload: false });
  action.payload.navigate('/bookings')
  yield put({ type: actionTypes.BOOK_TICKET, payload: events })
}catch(e) {
  alert('Server Error')
}
}

function* fetchBookings(action) {
  try{
  const url = `${apiHost}booking/orders`
  const events = yield call(postAxios, url, action.payload)
  yield delay(1000);
  yield put({ type: actionTypes.CATEGORY_LOADER, payload: false });
  yield put({ type: actionTypes.FETCH_BOOKINGS, payload: events })
}catch(e) {
  alert('Server Error')
}
}

function* getWeatherData(action) {
  try{
  const url = `http://x22203389scapp-env.eba-z5az2ytx.ap-south-1.elasticbeanstalk.com/weather/forecast?city=${action.payload.city}`
  // const url = '../../src/components/weatherData.json'
  const weatherdata = yield call(getAxios, url)
  yield delay(1000);
  yield put({ type: actionTypes.CATEGORY_LOADER, payload: false });
  yield put({ type: actionTypes.FETCH_WEATHER, payload: weatherdata.data });
}catch(e) {
  alert('Server Error')
}
}
function* getTodayWeatherData(action) {
  try{
  const url = `http://x22203389scapp-env.eba-z5az2ytx.ap-south-1.elasticbeanstalk.com/weather/today?city=${action.payload.city}`
  const TodayWeather = yield call(getAxios, url)
  yield delay(1000);
  yield put({ type: actionTypes.CATEGORY_LOADER, payload: false });
  yield put({ type: actionTypes.FETCH_WEATHER_TODAY, payload: TodayWeather.data });
}catch(e) {
  alert('Server Error')
}
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.LOGIN_API, loginUser)
  yield takeEvery(actionTypes.REGISTRATION_API, registerUser)
  yield takeEvery(actionTypes.FETCH_EVENTS_API, getEvents)
  yield takeEvery(actionTypes.ADD_NEW_EVENT_API, addNewEvent)
  yield takeEvery(actionTypes.BOOK_TICKET_API, bookTicketEvent)
  yield takeEvery(actionTypes.FETCH_BOOKINGS_API, fetchBookings)
  yield takeEvery(actionTypes.FETCH_WEATHER_API, getWeatherData)
  yield takeEvery(actionTypes.FETCH_WEATHER_TODAY_API, getTodayWeatherData)
}