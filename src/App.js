// import logo from './logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddEvent from './components/AddEvent';
import Bookings from './components/Bookings';
import EventView from './components/EventViews';
import Login from './components/Login';
import PlaceBooking from './components/PlaceBooking';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/Signup';
import Header from './components/header';
import MapContainerComponent from './components/mapContainer';
import store from './store/store';

function App() {
  
  return (
    <React.StrictMode>
    <Provider store={store}>
    
    <div className="App">
    <BrowserRouter>
    <Header />

    <Container maxWidth="lg" sx={{
      mt : 5,
      mb: 15,
      width: '100%',
      backgroundColour: 'none'
  }}>
        <Routes>
        <Route index path="/signUp" element={<SignUp />} />  
        <Route index path="/login" element={<Login />} />  
        <Route index path="/mapView" element={<PrivateRoute Component={MapContainerComponent} />} />  
        <Route index path="/" element={<PrivateRoute Component={EventView} />} />  
        <Route index path="/addEvent" element={<PrivateRoute Component={AddEvent} />} />  
        <Route index path="/events" element={<PrivateRoute Component={EventView} />} />  
        <Route index path="/bookTickets" element={<PrivateRoute Component={PlaceBooking} />} />  
        <Route index path="/bookings" element={<PrivateRoute Component={Bookings} />} />  
        </Routes>
        </Container>
      </BrowserRouter>
    </div>
    </Provider>
    </React.StrictMode>
  );
}

export default App;
