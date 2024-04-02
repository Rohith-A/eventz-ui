import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { categoryloader, fetchTodayWeatherData, fetchWeatherData } from "../actions/actions";

const WeatherDisplay = () => {
    const [city,setCity] = useState('Dublin');
    const weatherToday  = useSelector((state) => state.weatherToday)
    const weatherData  = useSelector((state) => state.weatherData)
    const [allWeatherData, ] = useState((weatherToday&& weatherData) && [weatherToday, ...weatherData]);
    const showCategoryLoader = useSelector((state) => state.categoryLoader)
   const dispatch = useDispatch();
    const getTodayWeather = () => {
        dispatch(fetchTodayWeatherData({city }))
    }
    const getForecastWeather = () => {
        dispatch(fetchWeatherData({city }))
    }
    useEffect(() => {
        getForecastWeather();
        getTodayWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const searchCityData = () => {
        dispatch(categoryloader(true));
        dispatch(fetchWeatherData({city }))
        dispatch(fetchTodayWeatherData({city }))
    }
    const weatherDisplay = (weather) => {
        if(weather) {
        return (<Grid item><Card raised>
            <CardActionArea>
              <CardMedia
              sx={{ width: '230px', height: '200px', background: '#4e647557' }}
                component="img"
                image={`https://openweathermap.org/img/wn/${weather.weather.icon}@4x.png`}
              />
              <CardContent sx={{ width: '230px' }}>
                <Typography gutterBottom variant="h5" component="div">
                {weather.weather.description}
                </Typography>
                <Typography variant="body2" fontWeight={600} color="text.secondary">
                 Date: {weather.dt_txt || new Date().toDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Temp: {weather.temp}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Low: {weather.temp_min}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 High: {weather.temp_max}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Wind speed: {weather.windSpeed}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Grid>
          )
        }
    }
    return(
        <React.Fragment>
       <Grid container ml={5} spacing={3} rowSpacing={5} columns={{xs:1, sm:1, md:5}}>
       
              <Grid item  xs={2} sm={2} md={4.5}>
                <TextField
                  required
                  type='text'
                  fullWidth
                  value={city}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                      <Button variant="contained"
                      onClick={searchCityData}
                      >
                      Search
                      </Button>
                      </InputAdornment>
                    ),
                  }}
                  onChange={e =>
                    setCity(e.target.value
                    )
                  }
                  label='Required'
                />
              </Grid>
              {showCategoryLoader ? (<Box sx={{width: '100%', m: 2, mt:35}}><CircularProgress /></Box>) : (<>
                {allWeatherData?.sort( (a,b) => a.dt_txt > b.dt_txt ? 1 : -1 ).map((v) => (weatherDisplay(v)))}
                </>)}
       
       </Grid>
        </React.Fragment>
    )
}

export default WeatherDisplay;