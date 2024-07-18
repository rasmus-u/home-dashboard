import { createSlice } from "@reduxjs/toolkit";
import getWeatherForecast from "../helpers/getWeatherForecast";

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
  console.log('Getting weather forecast...')
  return async dispatch => {
    // const weather = [
    //   {
    //     "temperature": 10,
    //     "windspeedms": 5
    //   },
    //   {
    //     "temperature": 9,
    //     "windspeedms": 6
    //   },
    //   {
    //     "temperature": 8,
    //     "windspeedms": 7
    //   }
    // ]
    try {
      const forecastData = await getWeatherForecast(area, duration, step)
      console.log('full data', forecastData)
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
      console.log(locationData)
      dispatch(updateWeather(locationData))
    } catch (error) {
      console.error(error)
    }
  }
}

export default weatherSlice.reducer