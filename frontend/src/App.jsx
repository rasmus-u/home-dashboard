import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStations } from "./reducers/bikeReducer"
import BikeWidget from "./components/BikeWidget"
import { getStops } from "./reducers/stopReducer"
import StopWidget from "./components/StopWidget"
import { updateTime } from "./reducers/timeReducer"
import ClockWidget from "./components/ClockWidget"
import { getWeather } from "./reducers/weatherReducer"

const App = () => {
  const dispatch = useDispatch()

  const stationIds = ['033', '070', '162']
  const stopIds = ['HSL:1130439', 'HSL:1130125']

  // Update the time every 10 seconds (we are only displaying minutes anyways)
  setInterval(() => dispatch(updateTime()), 10000)

  const stops = useSelector(state => state.stops)

  useEffect(() => {
    dispatch(getStations(stationIds))
    dispatch(getStops(stopIds))
    dispatch(getWeather('Helsinki', 60 * 60 * 1000 * 4, 60 * 60 * 1000))
  }, [])

  return (
    <>
      <ClockWidget />
      {stops.map(stop =>
        <StopWidget stop={stop} />
      )}
      <BikeWidget />
    </>

  )
}

export default App
