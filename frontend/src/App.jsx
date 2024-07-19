import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStations } from "./reducers/bikeReducer"
import BikeWidget from "./components/BikeWidget"
import { getStops } from "./reducers/stopReducer"
import StopHolder from "./components/StopHolder"
import { updateTime } from "./reducers/timeReducer"
import ClockWidget from "./components/ClockWidget"
import { getWeather } from "./reducers/weatherReducer"
import WeatherWidget from "./components/WeatherWidget"

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
    dispatch(getWeather('Helsinki', 12, 1))
  }, [])

  return (
    <div className="flex flex-col bg-black p-2 gap-2 max-h-screen">
      <main className="flex flex-row justify-end h-full gap-2">
        <div className="flex flex-col w-full gap-2">
          <ClockWidget />
          <StopHolder />
        </div>
        <div className="w-fit">
          <WeatherWidget />
        </div>
      </main>
      <footer>
        <BikeWidget />
      </footer>
    </div>

  )
}

export default App
