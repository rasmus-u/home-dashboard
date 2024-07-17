import bikeReducer from "./bikeReducer";
import { configureStore } from "@reduxjs/toolkit";
import stopReducer from "./stopReducer";
import timeReducer from "./timeReducer";
import weatherReducer from "./weatherReducer";

export const store = configureStore({
  reducer: {
    bikeStations: bikeReducer,
    stops: stopReducer,
    time: timeReducer,
    weather: weatherReducer
  }
})