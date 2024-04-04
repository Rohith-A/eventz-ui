import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    TextField,
    Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewEvent, categoryloader } from '../actions/actions'
import MenuDrawer from './MenuDrawer'
import ScrollToTopButton from './MoveToTop'

const AddEvent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [eventDetails, seteventDetails] = useState({
    eventName: ''
  })
  const [image, setImage] = useState(null)
  const handleImageChange = event => {
    setImage(event.target.files[0])
  }

  const handleUpload = async () => {
    if(!Object.keys(validate()).length) {
      dispatch(categoryloader(true));
    try {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Data = reader.result.replace(/^data:image\/\w+;base64,/, '');
            const eventData = eventDetails;
            eventData.imageData = base64Data;
            seteventDetails({...eventDetails, imageData: base64Data})
            dispatch(addNewEvent({eventData, navigate}))
        };
        reader.readAsDataURL(image);
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
    }
  }
};

  const createNewEvent = async () => {
    
      await handleUpload()
 
  }

  const [error, setError] = useState({})

  const validate = () => {
    const errObj = {}
    if(!eventDetails.eventName) errObj.eventName = true
    if(!eventDetails.eventDesc) errObj.eventDesc = true
    if(!eventDetails.eventDateTime) errObj.eventDateTime = true
    if(!eventDetails.eirCode) errObj.eirCode = true
    if(!eventDetails.eventVenue) errObj.eventVenue = true
    if(!eventDetails.seats) errObj.seats = true
    if(!eventDetails.ticketCost) errObj.ticketCost = true
    if(!image) errObj.imageData = true
    setError(errObj)
    return errObj
  }
  const showCategoryLoader = useSelector((state) => state.categoryLoader)

  return (
    <>
    <MenuDrawer />
    
      <Card raised>
        <CardHeader title='Add New Event'></CardHeader>
        {showCategoryLoader ? (<Box sx={{width: '100%', m: 2, mt:20, mb: 15}}><CircularProgress /></Box>) : (<>

        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1
              }
            }}
          >
            {' '}
            <Grid container spacing={2}>
              <Paper elevation={3} />
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='button'
                  display='block'
                  sx={{ margin: '10px 10px 15px 50px' }}
                  gutterBottom
                >
                  Event Name:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  fullWidth
                  {...(error.eventName && {
                    error,
                    helperText: 'Please fill this field'
                  })}
                  value={eventDetails.eventName}
                  onChange={e =>
                    seteventDetails({
                      ...eventDetails,
                      eventName: e.target.value
                    })
                  }
                  label='Required'
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='button'
                  display='block'
                  sx={{ margin: '10px 10px 15px 50px' }}
                  gutterBottom
                >
                  Event Details:
                </Typography>{' '}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  type='text'
                  {...(error.eventDesc && {
                    error,
                    helperText: 'Please fill this field'
                  })}
                  value={eventDetails.eventDesc}
                  onChange={e =>
                    seteventDetails({
                      ...eventDetails,
                      eventDesc: e.target.value
                    })
                  }
                  fullWidth
                  label='Required'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='button'
                  display='block'
                  sx={{ margin: '10px 10px 15px 50px' }}
                  gutterBottom
                >
                  Event Date:
                </Typography>{' '}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  type='text'
                  {...(error.eventDateTime && {
                    error,
                    helperText: 'Please fill this field'
                  })}
                  value={eventDetails.eventDateTime}
                  onChange={e =>
                    seteventDetails({
                      ...eventDetails,
                      eventDateTime: e.target.value
                    })
                  }
                  fullWidth
                  label='Required'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='button'
                  display='block'
                  sx={{ margin: '10px 10px 15px 50px' }}
                  gutterBottom
                >
                  EIR Code:
                </Typography>{' '}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  type='text'
                  {...(error.eirCode && {
                    error,
                    helperText: 'Please fill this field'
                  })}
                  value={eventDetails.eirCode}
                  onChange={e => {
                    seteventDetails({
                      ...eventDetails,
                      eirCode: e.target.value
                    })
                  }}
                  fullWidth
                  label='Required'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='button'
                  display='block'
                  sx={{ margin: '10px 10px 15px 50px' }}
                  gutterBottom
                >
                  Full Address:
                </Typography>{' '}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  type='text'
                  {...(error.eventVenue && {
                    error,
                    helperText: 'Please fill this field'
                  })}
                  required
                  value={eventDetails.eventVenue}
                  label='Required'
                  onChange={e =>
                    seteventDetails({ ...eventDetails, eventVenue: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='button'
                  display='block'
                  sx={{ margin: '10px 10px 15px 50px' }}
                  gutterBottom
                >
                  Seats Available:
                </Typography>{' '}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  type='number'
                  {...(error.seats && {
                    error,
                    helperText: 'Please fill this field'
                  })}
                  value={eventDetails.seats}
                  onChange={e =>
                    seteventDetails({ ...eventDetails, seats: e.target.value })
                  }
                  fullWidth
                  label='Required'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='button'
                  display='block'
                  sx={{ margin: '10px 10px 15px 50px' }}
                  gutterBottom
                >
                  Ticket Cost:
                </Typography>{' '}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  type='number'
                  {...(error.ticketCost && {
                    error,
                    helperText: 'Please fill this field'
                  })}
                  value={eventDetails.ticketCost}
                  onChange={e =>
                    seteventDetails({ ...eventDetails, ticketCost: e.target.value })
                  }
                  fullWidth
                  label='Required'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='button'
                  display='block'
                  sx={{ margin: '10px 10px 15px 50px' }}
                  gutterBottom
                >
                  Display Image:
                </Typography>{' '}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth
                  type='file'
                  {...(error.imageData && {
                    error,
                    helperText: 'Please upload the image'
                  })}
                  onChange={e =>
                    handleImageChange(e)
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} sm={12} md={6}>
            <Button
              variant='contained'
              sx={{
                padding: 1,
                mt: 5,
                mb: 5,
                width: '50%',
                background: 'color(rec2020 0.32 0.43 0.62)'
              }}
              onClick={() => createNewEvent()}
            >
              Add Event
            </Button>
          </Grid>
        </CardContent>
        </>)}
      </Card>
      <ScrollToTopButton />
    </>
  )
}

export default AddEvent
