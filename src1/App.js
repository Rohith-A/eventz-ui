// App.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { Button, Modal, Form } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import './App.css';
import ImageUploader from './components/uploadImage';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton } from '@mui/material';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-routing-machine";

const App = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', location: { lat: 0, lng: 0 } });
  const [currentLocation, setCurrentLocation] = useState({});
  const [mockEvents, setMockEvents] = useState([
    { id: 1, name: 'Event 1', location: { lat: 53.3498, lng: 6.2603 } },
    { id: 2, name: 'Event 2', location: { lat: 34.0522, lng: -118.2437 } },
    // Add more events as needed
  ])
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
  useEffect(() => {
    // Fetch events data from your backend or use mock data
    // For simplicity, let's use mock data here
    const mockEvents = [
      { id: 1, name: 'Event 1', location: { lat: 53.3498, lng: 6.2603 } },
      { id: 2, name: 'Event 2', location: { lat: 34.0522, lng: -118.2437 } },
      // Add more events as needed
    ];

    setEvents(mockEvents);
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddEvent = () => {
    // Implement logic to send new event data to your backend
    // For simplicity, let's just add it to the state for now
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    handleCloseModal();
  };

  const handleMapClick = (e) => {
    setNewEvent({ ...newEvent, location: { lat: e.latlng.lat, lng: e.latlng.lng } });
    handleShowModal();
  };
  useEffect(() => {
    const loc = navigator.geolocation;
    loc.getCurrentPosition((e) => {
      setCurrentLocation(e.coords);
      setMockEvents([...mockEvents, { id: mockEvents.length+1, name: 'Current location', location: 
      { lat: e?.coords?.latitude, lng: e?.coords?.longitude } }]
      )
    })
  }, [])
 
  return (
    <div className="app">
      {currentLocation?.latitude && (<MapContainer BaseLayer center={[currentLocation?.latitude || 37.7749, currentLocation?.longitude || -122.4194]} zoom={100} style={{ height: '400px', width: '100%' }} onClick={handleMapClick}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mockEvents.map((event) => (
          <Marker key={event.id} interactive position={[event.location.lat, event.location.lng]}>
          
          <Popup keepInView>{event.name}
          <IconButton aria-label="delete">
  <LocationOnIcon />
</IconButton>
          </Popup>

            
          </Marker>
        ))}
      </MapContainer>)}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
      <ImageUploader />
    </div>
  );
};

export default App;
