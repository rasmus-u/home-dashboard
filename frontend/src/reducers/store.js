import bikeReducer from "./bikeReducer";
import { configureStore } from "@reduxjs/toolkit";
import stopReducer from "./stopReducer";

export const store = configureStore({
  reducer: {
    bikeStations: bikeReducer,
    stops: stopReducer
  }
})