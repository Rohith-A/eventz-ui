/* eslint-disable react-hooks/exhaustive-deps */

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookTicket, categoryloader, setTicketCounter } from "../actions/actions";
import MenuDrawer from './MenuDrawer';
const PlaceBooking = (props) => {
    // const [success, setSuccess] = useState(false);
    const ticketCounter = useSelector((state) => state.ticketCounter);
    const event = useSelector(state => state.eventForBooking)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ticketCounterRef = useRef(0);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const showCategoryLoader = useSelector((state) => state.categoryLoader)

    const palceBooking = () =>  {
        dispatch(categoryloader(true));
        const payload = {
            event_id: event.event_id,
            "tickets": Number(ticketCounterRef.current),
            "userName": localStorage.userName
           }
           dispatch(bookTicket({payload, navigate}));
           
    }

    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Basic validation
      if(!ticketCounter) {
        alert("Please add tickets required");
      }
      if (!cardNumber || !expiry || !cvv) {
        setError('Please fill in all fields');
        return;
      } else {
        palceBooking()
      }
  
    //   const cardDetails = { cardNumber, expiry, cvv };
    };

    return (<>
        <MenuDrawer />

        <Grid container rowSpacing={15} columnSpacing={5} columns={{ xs: 1, sm: 6, md: 12 }}>
                <Grid item xs={1} rowSpacing={15}  sm={1} md={6}>
                <Card sx={{ textAlign: 'left' }} raised>
                            <CardMedia
                              sx={{ height: 280 }}
                              image={`data:image/jpeg;base64,${event?.image}`}
                            />
                            <CardContent>
                            <Grid container spacing={3}>
                            <Grid item xs={4}>
                            <Typography variant="body2" gutterBottom>
                                Event Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                              <Typography gutterBottom variant="body2">
                                {event?.name}
                              </Typography>
                              </Grid>
                              <Grid item xs={4}>
                              <Typography variant="body2" gutterBottom>
                                Event Details:
                            </Typography>
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                {event?.eventDesc}
                              </Typography>
                              </Grid>
                              <Grid item xs={4}>
                              Event Date:
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                {event?.eventDateTime}
                              </Typography>
                              </Grid>
                              <Grid item xs={4}>
                              Event Venue
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                {event?.eventVenue}
                              </Typography>
                              </Grid>
                              <Grid item xs={4}>
                              Ticket Price
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                € {event?.ticketCost}
                              </Typography>
                              </Grid>
                              <Grid item xs={4} sx={{mt:2}}>
                              Number of Tickets
                              </Grid>
                              <Grid item xs={6} sx={{display: 'flex'}}>
                              <IconButton size="small" disabled={ticketCounter === 0} onClick={() => {
                                dispatch(setTicketCounter(ticketCounterRef.current - 1));
                                ticketCounterRef.current -= 1;
                            }}>
                              <RemoveCircleIcon color="primary" disabled={ticketCounter === 0}/>
                              </IconButton>
                              <Typography variant="body2" color="text.secondary" sx={{m:2}}>
                                {ticketCounterRef.current}
                              </Typography>
                              <IconButton size="small" disabled={ticketCounter === 0} onClick={() => {
                                dispatch(setTicketCounter(ticketCounterRef.current + 1));
                                ticketCounterRef.current += 1;
                            }}>
                              <AddCircleIcon color="primary" disabled={ticketCounter === 6}/>
                              </IconButton>
                              </Grid>
                              <Grid item xs={4}>
                              Total Price
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                              € {event?.ticketCost * ticketCounterRef.current}
                              </Typography>
                              </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                </Grid>

                <Grid item xs={1} sm={1} md={6}>
                {showCategoryLoader ? (<Box sx={{width: '100%', m: 2}}><CircularProgress /></Box>) :

                    (<Card sx={{ width: '100%', mt: 0, mb: 1, cursor: 'pointer' }} raised >
                            <CardContent>
                            <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Expiry Date"
            variant="outlined"
            fullWidth
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CVV"
            variant="outlined"
            fullWidth
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>

                            </CardContent>
                    </Card>)}
                </Grid>

        </Grid>
        </>
    );
}

export default PlaceBooking
