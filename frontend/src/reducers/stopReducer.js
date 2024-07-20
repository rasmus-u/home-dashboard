import { createSlice } from "@reduxjs/toolkit";
import stopService from '../services/stops'

const stopSlice = createSlice({
  name: 'stops',
  initialState: [],
  reducers: {
    updateStops(state, action) {
      return action.payload
    },
    updateStop(state, action) {
      const newStop = action.payload
      return state.map(stop => stop ? stop.id !== newStop.id : newStop)
    },
    filterRoutes(state, action) {
      const timeNow = new Date()
      const secondsNow = timeNow.getHours() * 3600 + timeNow.getMinutes() * 60 + timeNow.getSeconds()
      return state.map(stop => {
        return {
          ...stop,
          routes: stop.routes.filter(route => route.arrival > secondsNow - 60)
        }
      })
    }
  }
})

export const { updateStops, filterRoutes } = stopSlice.actions

export const getStop = (id) => {
  return async dispatch => {
    const stop = await stopService.getStop(id)

    dispatch(updateStop(stop))
  }
}

export const getStops = (ids) => {
  return async dispatch => {
    const stops = await stopService.getMultipleStops(ids)

    dispatch(updateStops(stops))
  }
}

export default stopSlice.reducer