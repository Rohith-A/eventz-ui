import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';

export default function PopViewer(props) {
    const {event} = props
  return (
    <Card sx={{ width: '300px' }}>
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
        <Button size="small">Book tickets</Button>
        <Button size="small">View Details</Button>
      </CardActions>
    </Card>
  );
}