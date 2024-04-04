import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryloader, fetchBookings } from "../actions/actions";
import MenuDrawer from "./MenuDrawer";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "./MoveToTop";



const Bookings = () => {
    const bookings = useSelector((state) => state.orders)
    const showCategoryLoader = useSelector((state) => state.categoryLoader)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(categoryloader(true));
        dispatch(fetchBookings({userName: localStorage.userName}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
    <MenuDrawer />
    
        <Grid container spacing={5} columns={{xs:1, sm:1, md:2}}>
        {showCategoryLoader ? (<Box sx={{width: '100%', m: 2, mt:35}}><CircularProgress /></Box>) : (<>

        {(bookings && bookings?.length) ? bookings?.map((booking) => (
              <>
              <Grid key={booking?.event?.event_id+Math.random()} item xs={1} sm={1} md={1} height={{xs:450, sm:450, md:500}}>
              <Card key={booking?.event?.event_id} sx={{ height: '100%' }} raised>
              <CardMedia
        key={booking?.event?.event_id+Math.random()}
          component="img"
          sx={{ width: '100%' }}
          image={`data:image/jpeg;base64,${booking?.event?.imageData}`}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent key={booking?.event?.event_id+Math.random()} sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
            {booking?.event?.eventName}
            </Typography>
            
            <Grid item xs={12} sm={12} md={4}>
            <Typography variant="body2" gutterBottom>
                Event Details:   {booking?.event?.eventDesc}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
        <Typography variant="body2" gutterBottom>
            Event Date:   {booking?.event?.eventDateTime}
        </Typography>
    </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom variant="body2">
                Event Venue: {booking?.event?.eventVenue}
              </Typography>
              </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom variant="body2">
                Tickets: {booking?.booking?.tickets}
              </Typography>
              </Grid>
          </CardContent>
        </Box>
        
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
        </>
        )}
        </Grid>
        <ScrollToTopButton />

        </>
    )
}

export default Bookings;