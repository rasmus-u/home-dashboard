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
      const locationData = forecastData.locations[0].data
      for (const key in locationData) {
        if (locationData.hasOwnProperty(key)) {
          const weatherMetric = {
            values: locationData[key].timeValuePairs,
            unit: forecastData.properties[key].unit
          }
          locationData[key] = weatherMetric
        }
      }
      dispatch(updateWeather(locationData))
    } catch (error) {
      console.error(error)
    }
  }
}

export default weatherSlice.reducer