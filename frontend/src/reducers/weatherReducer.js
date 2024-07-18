import { createSlice } from "@reduxjs/toolkit";
import { getWeatherForecast } from "../helpers/weather";

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: '',
    weatherData: {
      temperature: {
        values: [],
        unit: ''
      },
      windspeedms: {
        values: [],
        unit: ''
      },
      totalcloudcover: {
        values: [],
        unit: ''
      },
      precipitationamount: {
        values: [],
        unit: ''
      }
    }
  },
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

      const steps = weatherData.temperature.timeValuePairs
      const weatherDataTypes = Object.keys(weatherData)

      const weatherByTime = steps.map((timeSlot, index) => {
        const weatherMetrics = {
          time: timeSlot.time
        }
        for (const key in weatherDataTypes) {
          const weatherMetric = {
            value: weatherData[weatherDataTypes[key]].timeValuePairs[index].value,
            unit: forecastData.properties[weatherDataTypes[key]].unit
          }
          weatherMetrics[weatherDataTypes[key]] = weatherMetric
        }
        return weatherMetrics
      })

      const weather = {
        city,
        weatherByTime
      }
      dispatch(updateWeather(weather))
    } catch (error) {
      console.error(error)
    }
  }
}

export default weatherSlice.reducer