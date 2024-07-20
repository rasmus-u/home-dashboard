import { createSlice } from "@reduxjs/toolkit";
import { getWeatherForecast } from "../helpers/weather";

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: 'Helsinki',
    byTime: [{
      time: (new Date()).getTime(),
      temperature: {
        value: 0,
        unit: ''
      },
      windspeedms: {
        value: 0,
        unit: ''
      },
      totalcloudcover: {
        value: 0,
        unit: ''
      },
      precipitationamount: {
        value: 0,
        unit: ''
      }
    }]
  },
  reducers: {
    updateWeather(state, action) {
      return action.payload
    }
  }
})

export const { updateWeather } = weatherSlice.actions

export const getWeather = (area, duration_hours, step_hours) => {
  const duration = 60 * 60 * 1000 * duration_hours
  const step = step_hours * 60 * 60 * 1000
  return async dispatch => {
    try {
      const forecastData = await getWeatherForecast(area, duration, step)
      const weatherData = forecastData.locations[0].data
      const city = forecastData.locations[0].info.name

      const steps = weatherData.temperature.timeValuePairs
      const weatherDataTypes = Object.keys(weatherData)

      const byTime = steps.map((timeSlot, index) => {
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
        byTime
      }
      dispatch(updateWeather(weather))
    } catch (error) {
      console.error(error)
    }
  }
}

export default weatherSlice.reducer