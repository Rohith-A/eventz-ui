export const parseWeatherData = (payload) => {
    const data = {
        weather: payload.weather[0],
        temp: payload.main.temp,
        temp_min: payload.main.temp_min,
        temp_max: payload.main.temp_max,
        windSpeed: payload.wind.speed
    }
    return data;
}