import { Box, Card, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../actions/actions";
import MenuDrawer from "./MenuDrawer";
import { useNavigate } from "react-router-dom";



const Bookings = () => {
    const bookings = useSelector((state) => state.orders)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchBookings({userName: localStorage.userName}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
    <MenuDrawer />
        <Grid container spacing={5} columns={{xs:1, sm:1, md:2}}>
        {(bookings && bookings?.length) ? bookings?.map((booking) => (
              <>
              <Grid item xs={1} sm={1} md={1} height={{xs:300, sm:300, md:250}}>
              <Card sx={{ display: 'flex', height: '100%' }} raised>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
            {booking.event.eventName}
            </Typography>
            
            <Grid item xs={12} sm={12} md={4}>
            <Typography variant="body2" gutterBottom>
                Event Details:   {booking.event.eventDesc}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
        <Typography variant="body2" gutterBottom>
            Event Date:   {booking.event.eventDateTime}
        </Typography>
    </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom variant="body2">
                Event Venue: {booking.event.eventVenue}
              </Typography>
              </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom variant="body2">
                Tickets: {booking.booking.tickets}
              </Typography>
              </Grid>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: '40%' }}
          image={`data:image/jpeg;base64,${booking.event.imageData}`}
                    
          
        alt="Live from space album cover"
        />
      </Card>

          </Grid>
          </>
        ))
        : <>
        <Card sx={{ width: '100%', mt: 30 }}>
        <Typography component="div" variant="h5" sx={{m: 10}}>
        Thank you for visiting! Currently, there are no bookings. Please visit 
        <Link
        variant='contained'
        
        sx={{
          cursor: 'pointer',
          m: 2
        }}
        onClick={() => navigate('/')}
      >
        Events 
      </Link>
       page.
        </Typography>
           
          </Card>
        
        </>}
        </Grid>
        </>
    )
}

export default Bookings;