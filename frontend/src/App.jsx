import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getStations } from "./reducers/bikeReducer"
import BikeWidget from "./components/BikeWidget"
import { filterRoutes, getStops } from "./reducers/stopReducer"
import StopHolder from "./components/StopHolder"
import { updateTime } from "./reducers/timeReducer"
import ClockWidget from "./components/ClockWidget"
import { filterWeather, getWeather } from "./reducers/weatherReducer"
import WeatherWidget from "./components/WeatherWidget"
import { useState } from "react"

const App = () => {
  const dispatch = useDispatch()
  const [counter, setCounter] = useState(0)

  const stationIds = ['033', '070', '162']
  const stopIds = ['HSL:1130439', 'HSL:1040602']

  // Hanken: HSL:1130439 
  // Arkadiankatu: HSL:1130125
  // Kamppi subway: HSL:1040602

  useEffect(() => {
    dispatch(updateTime());
    dispatch(getStations(stationIds));
    dispatch(getStops(stopIds));
    dispatch(getWeather('Helsinki', 12, 1))

    const updateInterval = setInterval(() => {
      setCounter((newCounter) => {
        const updatedCounter = newCounter + 1;
        dispatch(updateTime());
        dispatch(filterRoutes());
        dispatch(filterWeather())

        if (updatedCounter % (3 * 6) === 0) { // 3 minutes
          dispatch(getStations(stationIds));
        }
        if (updatedCounter % (4 * 6) === 0) { // 4 minutes
          dispatch(getStops(stopIds));
        }
        if (updatedCounter % (20 * 6) === 0) { // 20 minutes
          dispatch(getWeather('Helsinki', 12, 1));
        }
        if (updatedCounter > 100 * 6) { // 100 minutes
          return 0; // Reset counter
        }
        return updatedCounter; // Return the updated counter value
      });
    }, 10 * 1000); // 10 seconds

    return () => {
      clearInterval(updateInterval)
      setCounter(0)
    };
  }, []);

  return (
    <div className="flex flex-col bg-background p-4 gap-4 h-screen w-screen">
      <main className="flex flex-row h-full gap-4 flex-grow">
        <div className="flex flex-col w-full gap-4">
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