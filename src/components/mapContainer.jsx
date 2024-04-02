/* eslint-disable react-hooks/exhaustive-deps */
// App.js

import { CardContent, Grid, Paper } from '@mui/material'
// import {makeStyles} from '@mui/styles'
import L from 'leaflet'
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { Card, CardHeader } from 'react-bootstrap'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import '../App.css'
import { fetchEvents, resetDirections } from '../actions/actions'
import Routing from './Routing'
import PopViewer from './popViewer'




const MapContainerComponent = () => {
  const [sourceCity, setSourceCity] = useState({});
  const [destinationCity, setDestinationCity] = useState({});
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
  // L.Marker.prototype.options.icon = MyLocationIcon
  const eventsData = useSelector((state) => state?.mapEvents)
  const directions = useSelector((state) => state?.directions)

  useEffect(() => {
    setDestinationCity(directions?.DestinationLocaction || null);
  setSourceCity(directions?.currentLocation || null);
  }, [directions])

  const handleMapClick = e => {
    setNewEvent({
      ...newEvent,
      location: { lat: e.latlng.lat, lng: e.latlng.lng }
    })
  }

  useEffect(() => {
    dispatch(fetchEvents())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(eventsData?.length) {
      fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    const { latitude, longitude } = data;
    setCurrentLocation({ latitude, longitude })
    setMockEvents([
      ...mockEvents,
      {
        id: mockEvents.length + 1,
        name: 'Current location',
        location: { lat: latitude, lng: longitude }
      },
      ...eventsData
    ])
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  })
  .catch(error => {
    console.error('Error fetching location:', error);
  });
    //   const loc = navigator.geolocation
    // loc.getCurrentPosition(e => {
      
    //   setCurrentLocation(e.coords)
    //   setMockEvents([
    //     ...mockEvents,
    //     {
    //       id: mockEvents.length + 1,
    //       name: 'Current location',
    //       location: { lat: e?.coords?.latitude, lng: e?.coords?.longitude }
    //     },
    //     ...eventsData
    //   ])
    // })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsData])

  const currentLoc = L.icon({
    iconUrl : 'https://img.icons8.com/office/40/marker.png',
    shadowUrl: iconShadow,
    iconSize: [50,40],
    iconRetinaUrl: 'https://img.icons8.com/office/40/marker.png'
  })
  useEffect(() => {
    return () => {
      dispatch(resetDirections())
    }
  },[])

  return (
    <React.Fragment>
    <div className="container">        
    </div>
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
                  zoom={20}
                  style={{ height: '750px' }}
                  onClick={handleMapClick}
                >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
              <Routing sourceCity={sourceCity || null} layer={TileLayer} destinationCity={destinationCity || null}/>
               {mockEvents.map(event => {
                return(
                  <Marker
                  markerColor={'red'}
                  icon={event.name==='Current location' ? currentLoc : DefaultIcon}
                      key={event.id}
                      interactive
                      position={[event.location.lat, event.location.lng]}
                    >
                      <Popup style={{
                        width: '500px'
                      }}>
                        <PopViewer event={event} currentLocation={currentLocation}/>
                      </Popup>
                    </Marker>
                )
               } 
                  )}
                </MapContainer>
                
              )}

            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default MapContainerComponent
