import bikeReducer from "./bikeReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    bikeStations: bikeReducer
  }
})