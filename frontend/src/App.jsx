import { useEffect } from "react"
import { useDispatch } from "react-redux"
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

  useEffect(() => {
    dispatch(getStations(stationIds))
    dispatch(getStops(stopIds))
    dispatch(getWeather('Helsinki', 12, 1))
  }, [])

  return (
    <div className="flex flex-col bg-black p-2 gap-2 h-screen">
      <main className="flex flex-row h-full gap-2 flex-grow">
        <div className="flex flex-col w-full gap-2">
          <ClockWidget />
          <StopHolder />
        </div>
        <div className="w-fit h-full flex-grow">
          <WeatherWidget />
        </div>
      </main>
      <footer className="h-auto">
        <BikeWidget />
      </footer>
    </div>

  )
}

export default App