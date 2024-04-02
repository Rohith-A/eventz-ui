import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchEvents, setProductForBuying } from '../actions/actions'

const DisplayEvents = () => {
  const eventsData = useSelector(state => state?.mapEvents)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchEvents())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Grid
        container
        spacing={5}
        columns={ 10}
      >
        {eventsData?.map(event => (
          <Grid item spacing={5} xs={12} sm={12} md={3} height={{xs:555, sm:555, md:555}}>
            <Card sx={{ width: '300px', height: '100%' }} >
              <CardMedia
                sx={{ height: 150 }}
                image={`data:image/jpeg;base64,${event.image}`}
                title='green iguana'
              />
              <CardContent>
                <Grid container spacing={1.2} sx={{height: 285}}>
                  <Grid item xs={6}>
                    <Typography variant='body2' gutterBottom>
                      Event Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom variant='body2'>
                      {event.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' gutterBottom>
                      Event Details:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' color='text.secondary'>
                      {event.eventDesc}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                   Event Date:
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' color='text.secondary'>
                      {event.eventDateTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                  Event Venue
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' color='text.secondary'>
                      {event.eventVenue}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    Tickets Available
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' color='text.secondary'>
                      {event.seats}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  size='small'
                  fullWidth
                  sx={{float: 'right'}}
                  onClick={() => {
                    dispatch(setProductForBuying(event))
                    navigate('/bookTickets')
                  }}
                >
                  Book tickets
                </Button>
               
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default DisplayEvents
