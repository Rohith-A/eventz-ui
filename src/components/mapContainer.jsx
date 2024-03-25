// App.js

import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Button, Modal, Form, Card, CardHeader } from 'react-bootstrap'
import 'leaflet/dist/leaflet.css'
import '../App.css'
import ImageUploader from './uploadImage'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { ButtonBase, CardContent, Grid, IconButton, Paper } from '@mui/material'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../actions/actions'
import PopViewer from './popViewer'
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-routing-machine";

const MapContainerComponent = () => {
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newEvent, setNewEvent] = useState({
    name: '',
    location: { lat: 0, lng: 0 }
  })
  const dispatch = useDispatch()
  const [currentLocation, setCurrentLocation] = useState({})
  const [mockEvents, setMockEvents] = useState([
    // Add more events as needed
  ])
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  })
  L.Marker.prototype.options.icon = DefaultIcon
  const eventsData = useSelector((state) => state?.mapEvents)

  useEffect(() => {
    // Fetch events data from your backend or use mock data
    // // For simplicity, let's use mock data here
    // const mockEvents = [
    //   { id: 1, name: 'Event 1', location: { lat: 53.3498, lng: 6.2603 } },
    //   { id: 2, name: 'Event 2', location: { lat: 34.0522, lng: -118.2437 } }
    //   // Add more events as needed
    // ]

    setEvents(mockEvents)
  }, [])

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleAddEvent = () => {
    // Implement logic to send new event data to your backend
    // For simplicity, let's just add it to the state for now
    setEvents([...events, { ...newEvent, id: events.length + 1 }])
    handleCloseModal()
  }

  const handleMapClick = e => {
    setNewEvent({
      ...newEvent,
      location: { lat: e.latlng.lat, lng: e.latlng.lng }
    })
    handleShowModal()
  }

  useEffect(() => {
    dispatch(fetchEvents())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(eventsData?.length) {
      const loc = navigator.geolocation
    loc.getCurrentPosition(e => {
      setCurrentLocation(e.coords)
      setMockEvents([
        ...mockEvents,
        {
          id: mockEvents.length + 1,
          name: 'Current location',
          location: { lat: e?.coords?.latitude, lng: e?.coords?.longitude }
        },
        ...eventsData
      ])
    })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsData])
  return (
    <React.Fragment>
      <Card sx={{ width: '100%' }} raised={'true'}>
        <CardHeader title='Create Task'></CardHeader>
        <CardContent>
          <Grid
            container
            spacing={{ xs: 1, md: 5 }}
            columns={{ xs: 1, sm: 1, md: 1 }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <Paper elevation={3} />
              {currentLocation?.latitude && (
                <MapContainer
                  center={[
                    currentLocation?.latitude || 37.7749,
                    currentLocation?.longitude || -122.4194
                  ]}
                  zoom={100}
                  style={{ height: '750px' }}
                  onClick={handleMapClick}
                >
                  <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {mockEvents.map(event => (
                    <Marker
                      key={event.id}
                      interactive
                      position={[event.location.lat, event.location.lng]}
                    >
                      <Popup style={{
                        width: '500px'
                      }}>
                        <PopViewer event={event}/>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId='eventName'>
                      <Form.Label>Event Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter event name'
                        value={newEvent.name}
                        onChange={e =>
                          setNewEvent({ ...newEvent, name: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={handleCloseModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Grid>
          </Grid>
          <ButtonBase color='secondary' onClick={() => setShowModal(true)}>
            Add Event
          </ButtonBase>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default MapContainerComponent
