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

  // useEffect(() => {
  //   dispatch(getStations(stationIds))
  //   dispatch(getStops(stopIds))
  //   dispatch(getWeather('Helsinki', 12, 1))
  // }, [])

  // // Update the time every 10 seconds (we are only displaying minutes anyways)
  // setInterval(() => {
  //   dispatch(updateTime())
  // }, 10000)

  useEffect(() => {
    console.log('Updated stations')
    dispatch(getStations(stationIds));
    const stationInterval = setInterval(() => {
      dispatch(getStations(stationIds));
    }, 3 * 60 * 1000); // 3 minutes

    return () => clearInterval(stationInterval);
  }, [dispatch, stationIds]);

  useEffect(() => {
    console.log('Updated stops')
    dispatch(getStops(stopIds));
    const stopInterval = setInterval(() => {
      dispatch(getStops(stopIds));
    }, 7 * 60 * 1000); // 7 minutes

    return () => clearInterval(stopInterval);
  }, [dispatch, stopIds]);

  useEffect(() => {
    console.log('Updated weather')
    dispatch(getWeather('Helsinki', 12, 1));
    const weatherInterval = setInterval(() => {
      dispatch(getWeather('Helsinki', 12, 1));
    }, 4 * 3600 * 1000); // 4 hour

    return () => clearInterval(weatherInterval);
  }, [dispatch]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(updateTime());
    }, 10000); // 10 seconds

    return () => clearInterval(timeInterval);
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-background p-2 gap-2 h-screen">
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