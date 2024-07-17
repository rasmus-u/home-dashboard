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
      const weather = await getWeatherForecast(area, duration, step)
      console.log('weather', weather)
      dispatch(updateWeather(weather))
    } catch (error) {
      console.error(error)
    }
  }
}

export default weatherSlice.reducer