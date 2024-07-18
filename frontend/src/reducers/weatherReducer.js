import { createSlice } from "@reduxjs/toolkit";
import { getWeatherForecast } from "../helpers/weather";

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {},
  reducers: {
    updateWeather(state, action) {
      return action.payload
    }
  }
})

export const { updateWeather } = weatherSlice.actions

export const getWeather = (area, duration, step) => {
  return async dispatch => {
    try {
      const forecastData = await getWeatherForecast(area, duration, step)
      const weatherData = forecastData.locations[0].data
      const city = forecastData.locations[0].info.name
      for (const key in weatherData) {
        if (weatherData.hasOwnProperty(key)) {
          const weatherMetric = {
            values: weatherData[key].timeValuePairs,
            unit: forecastData.properties[key].unit
          }
          weatherData[key] = weatherMetric
        }
      }
      const weather = {
        city,
        weatherData
      }

      dispatch(updateWeather(weather))
    } catch (error) {
      console.error(error)
    }
  }
}

export default weatherSlice.reducer