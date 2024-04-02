import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoryloader, fetchEvents, setProductForBuying } from '../actions/actions'

const DisplayEvents = () => {
  const eventsData = useSelector(state => state?.mapEvents)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showCategoryLoader = useSelector((state) => state.categoryLoader)
  useEffect(() => {
    dispatch(categoryloader(true));
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
      {showCategoryLoader ? (<Box sx={{width: '100%', m: 2, mt:30}}><CircularProgress /></Box>) : (<>

        {eventsData?.map(event => (
          <Grid key={event.event_id} item md={3} height={{xs:555, sm:555, md:555}}>
            <Card key={event.event_id} sx={{ width: '300px', height: '100%' }} raised>
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
        </>)}
      </Grid>
    </>
  )
}

export default DisplayEvents
