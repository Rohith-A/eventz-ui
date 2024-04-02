/* eslint-disable react-hooks/exhaustive-deps */

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookTicket, setTicketCounter } from "../actions/actions";
import MenuDrawer from './MenuDrawer';
const PlaceBooking = (props) => {
    const [success, setSuccess] = useState(false);
    const ticketCounter = useSelector((state) => state.ticketCounter);
    const [orderID, setOrderID] = useState(false);
    const event = useSelector(state => state.eventForBooking)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ticketCounterRef = useRef(0);
    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: event.eventDesc,
                    name: event.eventName,
                    id: event.event_id,
                    amount: {
                        currency_code: "",
                        value: event?.ticketCost * ticketCounterRef.current,
                    },
                },
            ],
            application_context: {
                shipping_preference: "NO_SHIPPING"
            }
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
                const payload = {
                    event_id: event.event_id,
                    "tickets": Number(ticketCounterRef.current),
                    "userName": localStorage.userName
                   }
                   dispatch(bookTicket(payload));
                const cardOrder = [
                    {
                        name: details.purchase_units[0].description,
                        price: details.purchase_units[0].amount.value,
                        desc: details.purchase_units[0].description + 'Paid By Card',
                        id: Math.floor(Math.random() * 10000)
                    },
                    ...JSON.parse(localStorage.paypalOrder)
                ]
                localStorage.setItem('paypalOrder', JSON.stringify(cardOrder));
            setSuccess(true);
            navigate('/')
        });
    };
    //capture likely error
    const onError = (data, actions) => {
        alert("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [success]);

    return (<>
        <MenuDrawer />

        <Grid container rowSpacing={15} columnSpacing={5} columns={{ xs: 1, sm: 6, md: 12 }}>
            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || 'Aa4MYovYOFd5O59Ku1JuZkmTR5IoKU6GcVkQNlPI4y2vptTFOZi78txK0jFCudzPWinbRiX6cxgH2kCJ'}}>
                <Grid item xs={1} rowSpacing={15}  sm={1} md={6}>
                <Card sx={{ textAlign: 'left' }}>
                            <CardMedia
                              sx={{ height: 280 }}
                              image={`data:image/jpeg;base64,${event.image}`}
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
                                {event.name}
                              </Typography>
                              </Grid>
                              <Grid item xs={4}>
                              <Typography variant="body2" gutterBottom>
                                Event Details:
                            </Typography>
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                {event.eventDesc}
                              </Typography>
                              </Grid>
                              <Grid item xs={4}>
                              Event Date:
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                {event.eventDateTime}
                              </Typography>
                              </Grid>
                              <Grid item xs={4}>
                              Event Venue
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                {event.eventVenue}
                              </Typography>
                              </Grid>
                              <Grid item xs={4}>
                              Ticket Price
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                {event.ticketCost}
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
                                {event.ticketCost * ticketCounterRef.current}
                              </Typography>
                              </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                </Grid>

                <Grid item xs={1} sm={1} md={6}>
                    <Card sx={{ width: '100%', mt: 0, mb: 1, cursor: 'pointer' }} raised >
                        <CardActionArea>
                            <CardContent>
                                <PayPalButtons
                                    style={{ layout: "vertical", position: 'absolute', marginLeft: '20%', marginTop: '20px' }}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}
                                />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            </PayPalScriptProvider>
        </Grid>
        </>
    );
}

export default PlaceBooking
