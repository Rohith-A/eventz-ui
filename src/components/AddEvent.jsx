import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const AddEvent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [eventDetails, seteventDetails] = useState({
        eventName: '',
        text: ''
    })
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const convertImage = async () => {
        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Data = reader.result.replace(/^data:image\/\w+;base64,/, '');
                return base64Data
            };
            reader.readAsDataURL(image);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    };

    const createNewEvent = () => {
        
    };

    const [error, setError] = useState({});

    const validate = () => {
        const errObj = {}
        if (!eventDetails.userName) {
            errObj.userName = true;
        }
        if (!eventDetails.text) {
            errObj.text = true;
        }
        setError(errObj);
        return errObj;
    };

    return (
        <>
            <Card raised>
                <CardHeader
                    title="Add New Event"
                >
                </CardHeader>
                <CardContent>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1
                            },
                        }}
                    >        <Grid container spacing={2} >
                            <Paper elevation={3} />
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom>
                                    Event Name:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    {...(error.fullName && ({
                                        error,
                                        helperText: "Please fill this field"
                                    }))}
                                    value={eventDetails.eventName}
                                    onChange={(e) => seteventDetails({ ...eventDetails, eventName: e.target.value })}
                                    label="Required"
                                />
                            </Grid>


                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom >
                                    Event Details:
                                </Typography>        </Grid>
                            <Grid item  xs={12} sm={12} md={6}>
                                <TextField
                                    required
                                    type='text'
                                    {...(error.text && ({
                                        error,
                                        helperText: "Please fill this field"
                                    }))}
                                    value={eventDetails.eventDesc}
                                    onChange={(e) => seteventDetails({ ...eventDetails, eventDesc: e.target.value })}
                                    fullWidth
                                    label="Required"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom >
                                    Event Date:
                                </Typography>        </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    required
                                    type='text'
                                    {...(error.text && ({
                                        error,
                                        helperText: "Please fill this field"
                                    }))}
                                    value={eventDetails.eventDateTime}
                                    onChange={(e) => seteventDetails({ ...eventDetails, eventDateTime: e.target.value })}
                                    fullWidth
                                    label="Required"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom >
                                EIR Code:
                            </Typography>        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                required
                                type='text'
                                {...(error.text && ({
                                    error,
                                    helperText: "Please fill this field"
                                }))}
                                value={eventDetails.eventVenue}
                                onChange={(e) => seteventDetails({ ...eventDetails, eventVenue: e.target.value })}
                                fullWidth
                                label="Required"
                            />
                        </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom >
                                Full Address:
                            </Typography>        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                disabled
                                type='text'
                                {...(error.text && ({
                                    error,
                                    helperText: "Please fill this field"
                                }))}
                                value={eventDetails.text}
                                onChange={(e) => seteventDetails({ ...eventDetails, text: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom >
                                Seats Available:
                            </Typography>        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                required
                                type='number'
                                {...(error.text && ({
                                    error,
                                    helperText: "Please fill this field"
                                }))}
                                value={eventDetails.text}
                                onChange={(e) => seteventDetails({ ...eventDetails, text: e.target.value })}
                                fullWidth
                                label="Required"
                            />
                        </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="button" display="block" sx={{ margin: '10px 10px 15px 50px' }} gutterBottom >
                                Display Image:
                            </Typography>        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                        <TextField fullWidth type='file' onChange={(e) => seteventDetails({ ...eventDetails, imageData: e.target.files[0] })} />
                        </Grid>
                        </Grid>
                    </Box>
                    <Grid item xs={12} sm={12} md={6}>
                    <Button variant="contained"  sx={{ padding:1, mt: 5, mb: 5, width: '50%', background: 'color(rec2020 0.32 0.43 0.62)', }}
                        // onClick={}
                    >Add Event</Button>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default AddEvent;