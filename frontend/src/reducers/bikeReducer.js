import { createSlice } from '@reduxjs/toolkit'
import bikeService from '../services/bikes'

const bikeSlice = createSlice({
  name: 'bikeStations',
  initialState: [],
  reducers: {
    updateStations(state, action) {
      return action.payload
    }
  }
})

export const { updateStations } = bikeSlice.actions

export const getStations = (ids) => {
  return async dispatch => {
    const stations = await bikeService.getMultipleStations(ids)
    dispatch(updateStations(stations))
  }
}

export default bikeSlice.reducer