import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetDirections, setProductForBuying } from '../actions/actions';

export default function PopViewer(props) {
    const {event} = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (<>
    {event.name==='Current location' ? (<Typography>{event.name}</Typography>) :
    (<Card sx={{ width: '300px' }}>
    <CardMedia
      sx={{ height: 140 }}
      image={`data:image/jpeg;base64,${event.image}`}
      title="green iguana"
    />
    <CardContent>
    <Grid container spacing={0}>
    <Grid item xs={6}>
    <Typography variant="body2" gutterBottom>
        Event Name:
    </Typography>
</Grid>
<Grid item xs={6}>
      <Typography gutterBottom variant="body2">
        {event.name}
      </Typography>
      </Grid>
      <Grid item xs={6}>
      <Typography variant="body2" gutterBottom>
        Event Details:
    </Typography>
      </Grid>
      <Grid item xs={6}>
      <Typography variant="body2" color="text.secondary">
        {event.eventDesc}
      </Typography>
      </Grid>
      <Grid item xs={6}>
      Date:
      </Grid>
      <Grid item xs={6}>
      <Typography variant="body2" color="text.secondary">
        {event.eventDateTime}
      </Typography>
      </Grid>
      <Grid item xs={6}>
      Venue
      </Grid>
      <Grid item xs={6}>
      <Typography variant="body2" color="text.secondary">
        {event.eventVenue}
      </Typography>
      </Grid>
      </Grid>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => {
        dispatch(setProductForBuying(event))
        navigate('/bookTickets')
      }}>Book tickets</Button>
      <Button size="small"
      onClick={() => {
        dispatch(resetDirections())
        dispatch({
          type: 'DIRECTIONS',
          payload: {
            DestinationLocaction: {
              "city": props.event.eventVenue,
              "city_ascii": props.event.eventVenue,
              "lat": props.event.location.lat,
              "lng": props.event.location.lng,
              "country": "Ireland",
              "population": "0",
              "id": "1643739158"
          },
            currentLocation: {
              "city": "Current Location",
              "city_ascii": "Current Location",
              "lat": props.currentLocation?.latitude,
              "lng": props.currentLocation?.longitude,
              "country": "Ireland",
              "population": "0",
              "id": "1643739159"
          }            
          }
        })
      }}
     
      >Get Directions</Button>
  
    </CardActions>
  </Card>)
  }
    </>
    
  );
}