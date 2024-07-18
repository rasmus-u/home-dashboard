import { createSlice } from '@reduxjs/toolkit';

const timeSlice = createSlice({
  name: 'time',
  initialState: (new Date()).toISOString(),
  reducers: {
    updateTime(state, action) {
      return (new Date()).toISOString()
    }
  }
})

export const { updateTime } = timeSlice.actions
export default timeSlice.reducer