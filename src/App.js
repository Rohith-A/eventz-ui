// import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import store from './store/store';
import Header from './components/header';
import SignUp from './components/Signup';
import Login from './components/Login';
import { Container } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskDetails from './components/TaskDetails';
import MapContainerComponent from './components/mapContainer';
import AddEvent from './components/AddEvent';

function App() {
  return (
    <Provider store={store}>
    
    <Header />
    <div className="App">
    <BrowserRouter>
    <Container maxWidth="lg" sx={{
      mt : 5,
      mb: 15,
      width: '100%',
      height: '90vh'
  }}>
        <Routes>
        <Route index path="/" element={<SignUp />} />  
        <Route index path="/login" element={<Login />} />  
        <Route index path="/tasks" element={<TaskDetails />} />  
        <Route index path="/mapView" element={<MapContainerComponent />} />  
        <Route index path="/addEvent" element={<AddEvent />} />  
        </Routes>
       
        </Container>
    
  
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
